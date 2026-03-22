"use client";
import { useState, useRef, useEffect, Suspense } from "react";
import Navbar from "../components/Navbar";
import SearchTicker from "../components/SearchTicker";
import InputBox from "../components/InputBox";
import PresentValueTable from "../components/PresentValueTable";
import ROICTable from "../components/ROICTable";
import EquityValue from "../components/EquityValue";
import MarketInsightPopoutPage from "../components/PopoutPage/MarketInsightPopoutPage";
import SaveValuationPopoutPage from "../components/PopoutPage/SaveValuationPopoutPage";
import DetailedWacc from "../components/WACC/DetailedWacc";
import ImpliedValue from "../components/ImpliedValue";
import Dropdown from "../components/DropDown";
import Image from "next/image";
import { encodeParams } from "../utils/helper";
import SaveValuationButton from "../components/SaveValuationButton";
import * as States from "../constants/states";
import { countries, industries } from "../constants/dropdown";
import { useMutation } from "@tanstack/react-query";
import Alert from "../components/Alert";
import PresentValuePopoutPage from "../components/PopoutPage/PresentValuePopoutPage";
import CurrencyConverterPopoutPage from "../components/PopoutPage/CurrencyConverterPopoutPage";
import * as FinCalc from "../utils/financialCalculations";
import * as queryFn from "../utils/queryAPIFunctions";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { useRouter, useSearchParams } from "next/navigation";
import StockInfo from "../components/StockInfo";
import MonteCarloPopoutPage from "../components/PopoutPage/MonteCarloPopoutPage";
import SensitivityAnalysisPopoutPage from "../components/PopoutPage/SensitivityAnalysisPopoutPage";
import AnalysisToolsCarousel from "../components/AnalysisToolsCarousel"; // Import the new carousel component
import FundamentalDataPopoutPage from "../components/PopoutPage/FundamentalDataPopoutPage";
import { saveValuationState, loadValuationState } from "../hooks/useValuationStateStorage";
import AssumptionOverrides from "../components/AssumptionOverrides";

interface InputField {
  id: string;
  label: string;
  question: string;
  value: number | string;
  unit: string;
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div>
          <Navbar />
          <div className="flex flex-col justify-center items-center h-screen">
            <Image src="/loading.svg" alt="Loading icon" height={400} width={400} className="object-contain mb-4" />
            <p className="font-semibold text-lg text-center mt-5">Loading...</p>
          </div>
        </div>
      }
    >
      <FCFFPageContent />
    </Suspense>
  );
}

function FCFFPageContent() {
  const searchParams = useSearchParams();
  const urlSymbol = searchParams.get("symbol") || "";
  const urlFresh = searchParams.get("fresh") === "1";
  const urlEditId = searchParams.get("editId") || "";

  const [symbol, setSymbol] = useState("");
  //This state is to capture symbol only when search button is pressed
  const [searchedSymbol, setSearchedSymbol] = useState("");
  const [symbolBtn, setSymbolBtn] = useState(false);
  const [showMoreInputs, setShowMoreInputs] = useState(false);
  const impliedSharePriceRef = useRef(0);
  const [countryOptions, setCountryOptions] = useState("United States");
  const [industryOptions, setIndustryOptions] = useState("Software (Internet)");
  const [syntheticRatingOptions, setSyntheticRatingOptions] = useState("Aaa/AAA");
  const [marketPopup, setMarketPopup] = useState(false);
  const [presentValuePopup, setPresentValuePopup] = useState(false);
  const [monteCarloPopup, setMonteCarloPopup] = useState(false);
  const [sensitivityPopup, setSensitivityPopup] = useState(false);
  const [currencyConverterPopup, setCurrencyConverterPopup] = useState(false);
  const [currencyConverted, setCurrencyConverted] = useState(false);
  const [fundamentalPopup, setFundamentalPopup] = useState(false);

  const [valuationModelLabel, setValuationModelLabel] = useState("");
  const [savePopup, setSavePopup] = useState(false);
  // Persisted save-popout state (survives open/close)
  const [saveDescription, setSaveDescription] = useState("");
  const [saveTags, setSaveTags] = useState<string[]>([]);
  const [saveGroupIds, setSaveGroupIds] = useState<Set<number>>(new Set());

  // Track whether user has manually edited sales to capital fields
  const [salesToCapManuallyEdited, setSalesToCapManuallyEdited] = useState({
    salesToCapYr1: false,
    salesToCapYr2to5: false,
    salesToCapYr6to10: false,
  });

  // Track whether user has manually edited roic terminal year field
  const [roicTerminalYearManuallyEdited, setRoicTerminalYearManuallyEdited] = useState(false);

  // Track whether user has manually edited initial WACC
  const [initialWaccManuallyEdited, setInitialWaccManuallyEdited] = useState(false);

  // Assumption override switches (all OFF by default)
  const [overrideTerminalWacc, setOverrideTerminalWacc] = useState(false);
  const [overrideTerminalRoic, setOverrideTerminalRoic] = useState(false);
  const [overrideRevGrowthPerpetuity, setOverrideRevGrowthPerpetuity] = useState(false);
  const [overrideTerminalRfr, setOverrideTerminalRfr] = useState(false);
  const [terminalWaccCustom, setTerminalWaccCustom] = useState(0);
  const [terminalRfrCustom, setTerminalRfrCustom] = useState(0);

  const { data: session, status } = useSession();
  const router = useRouter();

  const [inputs, setInputs] = useState(States.INPUT_FIELDS);
  const [fetchedInputs, setFetchedInputs] = useState<any>(States.FETCHED_INPUT_FIELDS);
  const [stockInfo, setStockInfo] = useState(States.STOCK_INFO);

  // State restoration tracking
  const restoredFromStorageRef = useRef(false);
  const [hasRestoredState, setHasRestoredState] = useState(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isTestTickerRef = useRef(false);
  // True after the initial TEST ERP fetch (for matureMarketErp) has fired;
  // subsequent country changes should do a full ERP update
  const testErpInitialFetchedRef = useRef(false);
  // Tracks the last symbol loaded by symbolBtn useEffect so the URL effect
  // doesn't trigger a redundant second load (which would reset initialWacc to 0)
  const loadedSymbolRef = useRef("");

  const getInputValue = (id: string, type: "inputs" | "fetchedInputs"): number => {
    const inputArray = type === "inputs" ? inputs : fetchedInputs;
    const input = inputArray.find((input: any) => input.id === id);
    return input ? input.value : 0;
  };

  const handleInputChange = (
    id: string,
    newValue: any,
    type: "inputs" | "fetchedInputs" | "stockInfo",
    isAutoFill: boolean = false,
  ): void => {
    let value = newValue === undefined ? 0 : newValue;
    // Convert value to string for trimming and validation
    const valueString = value.toString().trim();
    if (type === "inputs" || type === "fetchedInputs") {
      if (
        valueString.charAt(valueString.length - 1) === "." ||
        (valueString.charAt(0) === "-" && valueString.length === 1)
      ) {
        value = valueString;
      } else if (isNaN(value)) {
        value = 0;
      } else {
        value = Number(value);
      }
    }

    // Track manual edits to sales to capital fields
    if (
      type === "inputs" &&
      !isAutoFill &&
      (id === "salesToCapYr1" || id === "salesToCapYr2to5" || id === "salesToCapYr6to10")
    ) {
      setSalesToCapManuallyEdited((prev) => ({ ...prev, [id]: true }));
    }

    // Track manual edits to roic terminal year field
    if (type === "fetchedInputs" && !isAutoFill && id === "roicTerminalYear") {
      setRoicTerminalYearManuallyEdited(true);
    }

    // Track manual edits to initial WACC
    if (type === "fetchedInputs" && !isAutoFill && id === "initialWacc") {
      setInitialWaccManuallyEdited(true);
    }

    if (type === "inputs") {
      setInputs((prevInputs: any) => prevInputs.map((input: any) => (input.id === id ? { ...input, value } : input)));
    } else if (type === "fetchedInputs") {
      setFetchedInputs((prevFetchedInputs: any) =>
        prevFetchedInputs.map((input: any) => (input.id === id ? { ...input, value } : input)),
      );
    } else if (type === "stockInfo") {
      setStockInfo((prevStockInfo: any) =>
        prevStockInfo.map((input: any) => (input.id === id ? { ...input, value } : input)),
      );
    }
  };

  // Financial calculations state
  const valuationModelRef: any = useRef(States.VALUATION_MODEL);
  const valuationOutputRef: any = useRef(States.VALUATION_OUTPUT);

  const { data: riskFreeRateData, refetch: riskFreeRateRefetch } = useQuery({
    queryKey: ["riskFreeRate"],
    queryFn: async () => {
      if (isTestTickerRef.current) return null;
      await queryFn.fetchRiskFreeRate(handleInputChange);
      return null;
    },
    // Don't auto-fetch in edit mode — values are restored from the saved record
    enabled: !urlEditId,
  });

  //GET ERP and marginal tax rate
  const { refetch: equityRiskPremiumRefectch, isFetching: erpIsFetching } = useQuery({
    queryKey: ["equityRiskPremium", countryOptions],
    queryFn: async () => {
      if (isTestTickerRef.current && !testErpInitialFetchedRef.current) {
        // Initial TEST load: only fetch matureMarketErp — keep hardcoded ERP and marginalTaxRate
        testErpInitialFetchedRef.current = true;
        const matureMarketErpOnly = (id: string, value: any, type: any) => {
          if (id === "matureMarketErp") handleInputChange(id, value, type);
        };
        await queryFn.fetchEquityRiskPremium("United%20States", matureMarketErpOnly);
        return null;
      }
      // Subsequent fetches (user changed country): full update for all fields
      await queryFn.fetchEquityRiskPremium(encodeParams(countryOptions), handleInputChange);
      return null;
    },
    enabled: false,
  });

  const { refetch: stockInfoRefetch, isError: stockInfoIsError } = useQuery({
    queryKey: ["stockInfo"],
    queryFn: async () => {
      await queryFn.fetchStockInfo(symbol, handleInputChange);
      return null;
    },
    enabled: false,
  });

  const {
    refetch: incomeStatementRefetch,
    status: incomeStatementStatus,
    isFetching: incomeStatementIsFetching,
  } = useQuery({
    queryKey: ["incomeStatement"],
    queryFn: async () => {
      const response = queryFn.fetchIncomeStatement(symbol, handleInputChange);
      return response;
    },
    enabled: false,
  });

  const { refetch: balanceSheetQuartelyRefetch } = useQuery({
    queryKey: ["balanceSheetQuartely"],
    queryFn: async () => {
      await queryFn.fetchBalanceSheetQuarterly(symbol, handleInputChange);
      return null;
    },
    enabled: false,
  });

  const saveValuationMutation = useMutation({
    mutationFn: async (data: any) => {
      return queryFn.postValuation(data);
    },
  });

  const updateValuationMutation = useMutation({
    mutationFn: async (data: any) => {
      return queryFn.putValuation(urlEditId, data);
    },
  });

  // Fetch valuation for editing
  const { data: editValuation, isError: editValuationIsError } = useQuery({
    queryKey: ["editValuation", urlEditId],
    queryFn: () => queryFn.fetchValuationById(urlEditId),
    enabled: !!urlEditId,
    retry: 2,
  });

  // Apply edit valuation data to page state.
  // Uses hasRestoredState as the guard (not a ref) so that when the URL effect
  // resets hasRestoredState→false (back-nav re-edit), this effect re-fires even
  // if editValuation is already cached and unchanged.
  useEffect(() => {
    if (!editValuation || !urlEditId || hasRestoredState) return;

    // Prevent the symbolBtn effect from resetting inputs when symbol changes
    restoredFromStorageRef.current = true;

    setSymbol(editValuation.symbol);
    setSearchedSymbol(editValuation.symbol);
    setInputs(editValuation.inputs);
    setFetchedInputs(editValuation.fetched_inputs);
    setStockInfo(editValuation.stock_info);

    // Mark all editable fields as manually set so auto-fill won't overwrite them
    setSalesToCapManuallyEdited({ salesToCapYr1: true, salesToCapYr2to5: true, salesToCapYr6to10: true });
    setRoicTerminalYearManuallyEdited(true);
    setInitialWaccManuallyEdited(true);

    setSaveDescription(editValuation.description || "");
    setSaveTags(editValuation.tags || []);

    // Restore override flags from saved record
    const flags = editValuation.override_flags as any;
    if (flags) {
      if (flags.savedCountryOptions) setCountryOptions(flags.savedCountryOptions);
      if (flags.savedIndustryOptions) setIndustryOptions(flags.savedIndustryOptions);
      if (flags.savedSyntheticRatingOptions) setSyntheticRatingOptions(flags.savedSyntheticRatingOptions);
      setOverrideTerminalWacc(flags.overrideTerminalWacc ?? false);
      setOverrideTerminalRoic(flags.overrideTerminalRoic ?? false);
      setOverrideRevGrowthPerpetuity(flags.overrideRevGrowthPerpetuity ?? false);
      setOverrideTerminalRfr(flags.overrideTerminalRfr ?? false);
      setTerminalWaccCustom(flags.terminalWaccCustom ?? 0);
      setTerminalRfrCustom(flags.terminalRfrCustom ?? 0);
      // Explicitly restore ROIC custom value from override_flags so the
      // auto-reset effect (which fires with terminalWacc=0 before data loads)
      // cannot overwrite the saved value.
      if (flags.overrideTerminalRoic && flags.roicTerminalYearCustom !== undefined) {
        setFetchedInputs((prev: any) =>
          prev.map((input: any) =>
            input.id === "roicTerminalYear" ? { ...input, value: flags.roicTerminalYearCustom } : input
          )
        );
      }
    }

    setHasRestoredState(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editValuation, urlEditId, hasRestoredState]);

  // Initialize/restore from URL search params (runs on mount and on back/forward navigation)
  const prevUrlSymbolRef = useRef<string | null>(null);
  useEffect(() => {
    // Skip if urlSymbol hasn't changed (prevents re-running after our own router.push)
    if (prevUrlSymbolRef.current === urlSymbol) return;
    prevUrlSymbolRef.current = urlSymbol;

    if (!urlSymbol) {
      // No symbol in URL — reset to blank page
      setSymbol("");
      setSearchedSymbol("");
      setInputs(States.INPUT_FIELDS);
      setFetchedInputs(States.FETCHED_INPUT_FIELDS);
      setStockInfo(States.STOCK_INFO);
      setHasRestoredState(false);
      return;
    }

    const saved = !urlFresh ? loadValuationState(urlSymbol) : null;
    if (saved) {
      // Restore all state from sessionStorage
      restoredFromStorageRef.current = true;
      setHasRestoredState(true);
      setSymbol(saved.symbol);
      setSearchedSymbol(saved.symbol);
      setInputs(saved.inputs);
      setFetchedInputs(saved.fetchedInputs);
      setStockInfo(saved.stockInfo);
      setCountryOptions(saved.countryOptions);
      setIndustryOptions(saved.industryOptions);
      if (saved.syntheticRatingOptions) setSyntheticRatingOptions(saved.syntheticRatingOptions);
      setSalesToCapManuallyEdited(saved.salesToCapManuallyEdited);
      setRoicTerminalYearManuallyEdited(saved.roicTerminalYearManuallyEdited);
      setInitialWaccManuallyEdited(saved.initialWaccManuallyEdited);
      setOverrideTerminalWacc(saved.overrideTerminalWacc ?? false);
      setOverrideTerminalRoic(saved.overrideTerminalRoic ?? false);
      setOverrideRevGrowthPerpetuity(saved.overrideRevGrowthPerpetuity ?? false);
      setOverrideTerminalRfr(saved.overrideTerminalRfr ?? false);
      setTerminalWaccCustom(saved.terminalWaccCustom ?? 0);
      setTerminalRfrCustom(saved.terminalRfrCustom ?? 0);
    } else {
      // Skip if the symbolBtn useEffect already loaded this symbol (router.push triggers this effect)
      if (loadedSymbolRef.current.toUpperCase() === urlSymbol.toUpperCase()) return;
      // Symbol in URL but no saved state — trigger a fresh fetch
      setSymbol(urlSymbol);
      setSymbolBtn((prev) => !prev);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlSymbol]);

  useEffect(() => {
    if (!symbol.trim()) {
      return;
    }

    // Skip fetching if we just restored from sessionStorage
    if (restoredFromStorageRef.current) {
      restoredFromStorageRef.current = false;
      return;
    }

    setCurrencyConverted(false);

    // Reset inputs and fetched data to defaults when switching tickers
    setInputs(States.INPUT_FIELDS);
    setFetchedInputs(States.FETCHED_INPUT_FIELDS);
    setStockInfo(States.STOCK_INFO);

    // Reset manual edit tracking when searching for a new symbol
    setSalesToCapManuallyEdited({
      salesToCapYr1: false,
      salesToCapYr2to5: false,
      salesToCapYr6to10: false,
    });
    setRoicTerminalYearManuallyEdited(false);
    setInitialWaccManuallyEdited(false);
    setOverrideTerminalWacc(false);
    setOverrideTerminalRoic(false);
    setOverrideRevGrowthPerpetuity(false);
    setOverrideTerminalRfr(false);
    setTerminalWaccCustom(0);
    setTerminalRfrCustom(0);

    // TEST ticker: skip all API calls and prefill hardcoded values for source-of-truth comparison
    if (symbol.toUpperCase() === "TEST") {
      isTestTickerRef.current = true;
      handleInputChange("baseRevenue", 10_000_000, "fetchedInputs");
      handleInputChange("baseEbitMargin", 10, "fetchedInputs");
      handleInputChange("totalEquity", 10_000_000, "fetchedInputs");
      handleInputChange("totalDebt", 10_000_000, "fetchedInputs");
      handleInputChange("cash", 10_000_000, "fetchedInputs");
      handleInputChange("minorityInterest", 0, "fetchedInputs");
      handleInputChange("interestExpense", 10_000_000, "fetchedInputs");
      handleInputChange("effectiveTaxRate", 17.5, "fetchedInputs");
      handleInputChange("marginalTaxRate", 25, "fetchedInputs");
      handleInputChange("equityRiskPremium", 5, "fetchedInputs");
      handleInputChange("riskFreeRate", 4, "fetchedInputs");
      handleInputChange("currentSharePrice", 100, "fetchedInputs");
      handleInputChange("impliedSharesOutstanding", 10_000_000, "fetchedInputs");
      handleInputChange("revGrowthYr1", 10, "inputs", true);
      handleInputChange("revGrowthYr2to5", 10, "inputs", true);
      handleInputChange("revGrowthPerpetuity", 4, "inputs", true);
      handleInputChange("opMarginYr1", 10, "inputs", true);
      handleInputChange("opMarginYr10", 10, "inputs", true);
      handleInputChange("salesToCapYr1", 2, "inputs", true);
      handleInputChange("salesToCapYr2to5", 2, "inputs", true);
      handleInputChange("salesToCapYr6to10", 2, "inputs", true);
      setSalesToCapManuallyEdited({ salesToCapYr1: true, salesToCapYr2to5: true, salesToCapYr6to10: true });
      handleInputChange("yrsConvergence", 5, "inputs", true);
      handleInputChange("shortName", "Test Company Inc.", "stockInfo");
      handleInputChange("country", "United States", "stockInfo");
      handleInputChange("currency", "USD", "stockInfo");
      handleInputChange("industry", "Advertising", "stockInfo");
      handleInputChange("sector", "Technology", "stockInfo");
      setCountryOptions("United States");
      setIndustryOptions("Advertising");
      testErpInitialFetchedRef.current = false; // next fetch is the initial TEST load (matureMarketErp only)
      equityRiskPremiumRefectch(); // fetches matureMarketErp only on first call; full update on subsequent
      setSearchedSymbol(symbol);
      loadedSymbolRef.current = symbol;
      router.push(`/fcff?symbol=${symbol}`, { scroll: false });
      return;
    }

    isTestTickerRef.current = false;
    stockInfoRefetch();
    incomeStatementRefetch();
    balanceSheetQuartelyRefetch();
    // Re-fetch global market rates since state was reset to 0 above
    riskFreeRateRefetch();
    equityRiskPremiumRefectch();
    setSearchedSymbol(symbol); // Capture the symbol at search time
    loadedSymbolRef.current = symbol;

    // Update URL to reflect the searched symbol (push so back/forward works between tickers)
    router.push(`/fcff?symbol=${symbol}`, { scroll: false });
  }, [
    symbolBtn,
    symbol,
    stockInfoRefetch,
    incomeStatementRefetch,
    balanceSheetQuartelyRefetch,
    riskFreeRateRefetch,
    equityRiskPremiumRefectch,
  ]);

  useEffect(() => {
    // In edit mode, skip the auto-fetch on mount until the saved values have been applied
    if (urlEditId && !hasRestoredState) return;
    equityRiskPremiumRefectch();
  }, [countryOptions, equityRiskPremiumRefectch, urlEditId]);

  // Save state to sessionStorage (debounced)
  useEffect(() => {
    if (!searchedSymbol) return;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      saveValuationState(searchedSymbol, {
        symbol: searchedSymbol,
        inputs,
        fetchedInputs,
        stockInfo,
        countryOptions,
        industryOptions,
        syntheticRatingOptions,
        salesToCapManuallyEdited,
        roicTerminalYearManuallyEdited,
        initialWaccManuallyEdited,
        overrideTerminalWacc,
        overrideTerminalRoic,
        overrideRevGrowthPerpetuity,
        overrideTerminalRfr,
        terminalWaccCustom,
        terminalRfrCustom,
      });
    }, 500);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [
    searchedSymbol,
    inputs,
    fetchedInputs,
    stockInfo,
    countryOptions,
    industryOptions,
    syntheticRatingOptions,
    salesToCapManuallyEdited,
    roicTerminalYearManuallyEdited,
    initialWaccManuallyEdited,
    overrideTerminalWacc,
    overrideTerminalRoic,
    overrideRevGrowthPerpetuity,
    overrideTerminalRfr,
    terminalWaccCustom,
    terminalRfrCustom,
  ]);

  // Auto-fill sales to capital fields only if they haven't been manually edited
  useEffect(() => {
    const totalEquity = getInputValue("totalEquity", "fetchedInputs");
    const totalDebt = getInputValue("totalDebt", "fetchedInputs");
    const cash = getInputValue("cash", "fetchedInputs");
    const baseRevenue = getInputValue("baseRevenue", "fetchedInputs");

    // Only calculate and auto-fill if we have the necessary data and fields haven't been manually edited
    if (totalEquity && totalDebt && baseRevenue) {
      const investedCapital = FinCalc.calcInvestedCapital(totalEquity, totalDebt, cash);
      const salesToCap = FinCalc.calcSalesToCap(baseRevenue, investedCapital);

      if (!salesToCapManuallyEdited.salesToCapYr1) {
        handleInputChange("salesToCapYr1", salesToCap, "inputs", true);
      }
      if (!salesToCapManuallyEdited.salesToCapYr2to5) {
        handleInputChange("salesToCapYr2to5", salesToCap, "inputs", true);
      }
      if (!salesToCapManuallyEdited.salesToCapYr6to10) {
        handleInputChange("salesToCapYr6to10", salesToCap, "inputs", true);
      }
    }
  }, [
    getInputValue("totalEquity", "fetchedInputs"),
    getInputValue("totalDebt", "fetchedInputs"),
    getInputValue("cash", "fetchedInputs"),
    getInputValue("baseRevenue", "fetchedInputs"),
    salesToCapManuallyEdited,
  ]);

  const growthY1 = getInputValue("revGrowthYr1", "inputs");
  const growthY2to5 = getInputValue("revGrowthYr2to5", "inputs");
  const growthTerminal = getInputValue("revGrowthPerpetuity", "inputs");
  const ebitY1 = getInputValue("opMarginYr1", "inputs");
  const ebitY10 = getInputValue("opMarginYr10", "inputs");
  const yearOfConvergence = getInputValue("yrsConvergence", "inputs");
  const sCapY1 = getInputValue("salesToCapYr1", "inputs");
  const sCapY2to5 = getInputValue("salesToCapYr2to5", "inputs");
  const sCapY6to10 = getInputValue("salesToCapYr6to10", "inputs");
  const effectiveTaxRate = getInputValue("effectiveTaxRate", "fetchedInputs");
  const marginalTaxRate = getInputValue("marginalTaxRate", "fetchedInputs");

  // Placeholder values for missing inputs
  const matureMarketErp = getInputValue("matureMarketErp", "fetchedInputs");

  const terminalRfr = overrideTerminalRfr
    ? terminalRfrCustom
    : getInputValue("riskFreeRate", "fetchedInputs");
  const terminalWacc = overrideTerminalWacc
    ? terminalWaccCustom
    : FinCalc.calcTerminalWACC(matureMarketErp, terminalRfr);
  const effectiveGrowthTerminal = overrideRevGrowthPerpetuity ? growthTerminal : terminalRfr;

  const growthRates = FinCalc.calcRevenueGrowth(growthY1, growthY2to5, effectiveGrowthTerminal);
  const revenue = FinCalc.calcRevenue(getInputValue("baseRevenue", "fetchedInputs"), growthRates);
  const ebitMargin = FinCalc.calcEBITMargin(
    getInputValue("baseEbitMargin", "fetchedInputs"),
    ebitY1,
    ebitY10,
    yearOfConvergence,
  );
  const ebit = FinCalc.calcEbit(revenue, ebitMargin);
  const taxRate = FinCalc.calcTaxRate(effectiveTaxRate, marginalTaxRate);
  const ebitAfterTax = FinCalc.calcEbitAfterTax(ebit, taxRate);

  // Auto-fill ROIC terminal year from terminal WACC when not manually edited
  // (terminal WACC = country ERP + risk-free rate, same as year-10 WACC in Aswath's model)
  useEffect(() => {
    if (!overrideTerminalRoic) {
      handleInputChange("roicTerminalYear", terminalWacc, "fetchedInputs", true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [terminalWacc, overrideTerminalRoic]);
  const roicTerminalYear = getInputValue("roicTerminalYear", "fetchedInputs");

  // Calculate reinvestment with error handling for initial empty state
  let reinvestment: number[];
  try {
    reinvestment = FinCalc.calcReinvestment(
      revenue,
      sCapY1,
      sCapY2to5,
      sCapY6to10,
      effectiveGrowthTerminal,
      roicTerminalYear,
      ebitAfterTax[ebitAfterTax.length - 1],
    );
  } catch (error) {
    // On initial load or invalid inputs, use empty array
    // This prevents errors when user hasn't filled in all inputs yet
    reinvestment = Array(11).fill(0);
  }

  //For ROIC table
  const roicData = FinCalc.calcROIC(
    sCapY1,
    sCapY2to5,
    sCapY6to10,
    getInputValue("totalEquity", "fetchedInputs"),
    getInputValue("totalDebt", "fetchedInputs"),
    getInputValue("cash", "fetchedInputs"),
    reinvestment,
    ebitAfterTax,
    roicTerminalYear,
  );
  const fcff = FinCalc.calcFcff(ebitAfterTax, reinvestment);
  const wacc = FinCalc.calcWACC(getInputValue("initialWacc", "fetchedInputs"), terminalWacc);

  const cumulatedDiscountFactor = FinCalc.calcCumulatedDiscountFactor(wacc);

  const pvFcff = FinCalc.calcPvFcff(fcff, cumulatedDiscountFactor);

  const sumOfPvFcff10Yrs = FinCalc.calcSumOfPvFcff10Yrs(pvFcff);

  const terminalValue = FinCalc.calcTerminalValue(
    fcff[fcff.length - 1],
    wacc[wacc.length - 1],
    growthRates[growthRates.length - 1],
  );

  const pvTerminalValue = FinCalc.calcPVTerminalValue(
    terminalValue,
    cumulatedDiscountFactor[cumulatedDiscountFactor.length - 1],
  );

  const enterpriseValue = FinCalc.calcEnterpriseValue(pvTerminalValue, sumOfPvFcff10Yrs);
  const equityValue = FinCalc.calcEquityValue(
    enterpriseValue,
    getInputValue("totalDebt", "fetchedInputs"),
    0,
    // getFetchedInputValue("minorityInterest"),
    getInputValue("cash", "fetchedInputs"),
    0,
  );

  const equityValueCommonStock = FinCalc.calcEquityValueCommonStock(equityValue, 0);
  const impliedSharePrice = FinCalc.calcImpliedSharePrice(
    equityValueCommonStock,
    getInputValue("impliedSharesOutstanding", "fetchedInputs"),
  );
  impliedSharePriceRef.current = impliedSharePrice;
  // Update VALUATION_MODEL
  valuationModelRef.current = States.VALUATION_MODEL.map((item) => {
    switch (item.id) {
      case "growthRates":
        return { ...item, value: growthRates };
      case "revenue":
        return { ...item, value: revenue };
      case "ebitMargin":
        return { ...item, value: ebitMargin };
      case "ebit":
        return { ...item, value: ebit };
      case "taxRate":
        return { ...item, value: taxRate };
      case "ebitAfterTax":
        return { ...item, value: ebitAfterTax };
      case "reinvestment":
        return { ...item, value: reinvestment };
      case "fcff":
        return { ...item, value: fcff };
      case "wacc":
        return { ...item, value: wacc };
      case "cumulatedDiscountFactor":
        return { ...item, value: cumulatedDiscountFactor };
      case "pvFcff":
        return { ...item, value: pvFcff };
      default:
        return item;
    }
  });

  // Update VALUATION_OUTPUT
  valuationOutputRef.current = States.VALUATION_OUTPUT.map((item) => {
    switch (item.id) {
      case "terminalWACC":
        return { ...item, value: terminalWacc };
      case "sumOfPVFcff10Yrs":
        return { ...item, value: sumOfPvFcff10Yrs };
      case "terminalValue":
        return { ...item, value: terminalValue };
      case "pvTerminalValue":
        return { ...item, value: pvTerminalValue };
      case "enterpriseValue":
        return { ...item, value: enterpriseValue };
      case "equityValue":
        return { ...item, value: equityValue };
      case "equityValueCommonStock":
        return { ...item, value: equityValueCommonStock };
      default:
        return item;
    }
  });

  if (status === "unauthenticated") {
    router.push("/"); // Redirect to homepage
    return null;
  }
  return (
    <div>
      <Navbar />
      <SearchTicker
        symbol={symbol}
        setSymbol={setSymbol}
        setSymbolBtn={setSymbolBtn}
        incomeStatementIsFetching={incomeStatementIsFetching}
      />

      {urlEditId && !hasRestoredState && !editValuationIsError ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <Image src="/loading.svg" alt="Loading icon" height={400} width={400} className="object-contain mb-4" />
          <p className="font-semibold text-lg text-center mt-5">Loading...</p>
        </div>
      ) : urlEditId && editValuationIsError ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <Image src="/error.svg" alt="Error icon" height={500} width={500} className="object-contain mb-4" />
          <p className="text-red-700 dark:text-red-400 font-medium text-lg text-center mt-5">
            Failed to load valuation. Please try again.
          </p>
        </div>
      ) : searchedSymbol === "" ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <Image src="/growth.svg" alt="growth icon" height={500} width={500} className="object-contain mb-4" />
          <p className=" font-medium text-lg text-center mt-5"> Search for the stock ticker you want to view</p>
        </div>
      ) : !hasRestoredState && incomeStatementStatus === "error" ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <Image src="/error.svg" alt="Error icon" height={500} width={500} className="object-contain mb-4" />
          <p className="text-red-700 dark:text-red-400 font-medium text-lg text-center mt-5">No such symbol. Please enter valid symbol</p>
        </div>
      ) : !hasRestoredState && (incomeStatementIsFetching || status === "loading") ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <Image src="/loading.svg" alt="Loading icon" height={400} width={400} className="object-contain mb-4" />
          <p className="font-semibold text-lg text-center mt-5">Loading...</p>
        </div>
      ) : (
        <>
          {saveValuationMutation.isSuccess && <Alert message="Valuation successfully saved" />}
          {/* Container */}
          <div
            className="mt-10 mx-5 px-5 py-10 bg-white dark:bg-gray-800 rounded-2xl drop-shadow-md border dark:border-gray-700"
          >
            <StockInfo stockInfo={stockInfo} setStockInfo={setStockInfo} searchedSymbol={searchedSymbol} />
          </div>

          <div className="uppercase font-bold text-2xl text-center my-10 tracking-wider dark:text-white">Analysis Tools</div>
          {/* Replace the old grid with the new carousel component */}
          <AnalysisToolsCarousel
            setFundamentalPopup={setFundamentalPopup}
            setMarketPopup={setMarketPopup}
            setMonteCarloPopup={setMonteCarloPopup}
            setSensitivityPopup={setSensitivityPopup}
            setCurrencyConverterPopup={setCurrencyConverterPopup}
            symbol={symbol}
            currencyConverted={currencyConverted}
          />

          <div className="uppercase font-bold text-2xl text-center my-10 tracking-wider dark:text-white">Inputs</div>
          {/* Container */}
          <div
            className="mt-10 mx-5 px-5 py-10 bg-white dark:bg-gray-800 rounded-2xl drop-shadow-md border dark:border-gray-700"
          >
            <div className="flex flex-col gap-y-10">
              {/* Country + Industry */}
              <div className="grid lg:grid-cols-3 grid-cols-2 place-items-center gap-y-10">
                <Dropdown
                  options={countries}
                  value={countryOptions}
                  onChange={(v: string) => { setCountryOptions(v); setInitialWaccManuallyEdited(false); }}
                  defaultOption="United States"
                  label="Country"
                />
                <Dropdown
                  options={industries}
                  value={industryOptions}
                  onChange={(v: string) => { setIndustryOptions(v); setInitialWaccManuallyEdited(false); }}
                  defaultOption="Software (Internet)"
                  label="Industry"
                />
              </div>
              {/* Revenue Growth */}
              <div className="grid lg:grid-cols-3 grid-cols-2 place-items-center gap-y-10">
                {inputs
                  .filter((input) => ["revGrowthYr1", "revGrowthYr2to5"].includes(input.id))
                  .map((input) => (
                    <InputBox
                      key={input.id}
                      id={input.id}
                      label={input.label}
                      value={input.value}
                      question={input.question}
                      unit={input.unit}
                      onChange={(e: any) => handleInputChange(input.id, e.target.value, "inputs")}
                    />
                  ))}
              </div>
              {/* Operating Margin + Convergence */}
              <div className="grid lg:grid-cols-3 grid-cols-2 place-items-center gap-y-10">
                {inputs
                  .filter((input) => ["opMarginYr1", "opMarginYr10", "yrsConvergence"].includes(input.id))
                  .map((input) => (
                    <InputBox
                      key={input.id}
                      id={input.id}
                      label={input.label}
                      value={input.value}
                      question={input.question}
                      unit={input.unit}
                      onChange={(e: any) => handleInputChange(input.id, e.target.value, "inputs")}
                    />
                  ))}
              </div>
              {/* Sales to Capital */}
              <div className="grid lg:grid-cols-3 grid-cols-2 place-items-center gap-y-10">
                {inputs
                  .filter((input) => ["salesToCapYr1", "salesToCapYr2to5", "salesToCapYr6to10"].includes(input.id))
                  .map((input) => (
                    <InputBox
                      key={input.id}
                      id={input.id}
                      label={input.label}
                      value={input.value}
                      question={input.question}
                      unit={input.unit}
                      onChange={(e: any) => handleInputChange(input.id, e.target.value, "inputs")}
                    />
                  ))}
              </div>
            </div>
            {/* Show More button */}
            <div className="text-center mt-10">
              <button
                onClick={() => setShowMoreInputs((prevState) => !prevState)}
                className="bg-gray-900 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 text-white py-2 px-3 rounded"
              >
                <div className="flex items-center">
                  {showMoreInputs ? "Show Less" : "Show More"}
                  {showMoreInputs ? <RiArrowDropUpLine className="ml-1" /> : <RiArrowDropDownLine className="ml-1" />}
                </div>
              </button>
            </div>

            {/* Fetched Inputs */}
            {showMoreInputs && (
              <div className="grid lg:grid-cols-3 grid-cols-2 place-items-center gap-y-10 mt-10">
                {fetchedInputs
                  .filter((input: InputField) => input.id !== "roicTerminalYear")
                  .map((input: InputField) => (
                    <InputBox
                      key={input.id}
                      id={input.id}
                      label={input.label}
                      value={input.value}
                      question={input.question}
                      unit={input.unit}
                      onChange={(e: any) => handleInputChange(input.id, e.target.value, "fetchedInputs")}
                    />
                  ))}
              </div>
            )}
          </div>
          <div className="mt-10 mx-5 text-gray-700 dark:text-gray-300 font-extralight text-sm">
            <span className="font-medium">Units —</span> Dollar inputs (Revenue, Equity, Debt, Cash, Interest Expense)
            are entered as full dollar amounts. Valuation output tables (EBIT, FCFF, Invested Capital, Enterprise Value,
            Equity Value) are displayed in millions.
          </div>

          {/* Assumptions Header */}
          <div className="uppercase font-bold text-2xl text-center mt-10 mb-10 tracking-wider dark:text-white">Assumptions</div>
          {/* Container */}
          <div
            className="mt-10 mx-5 px-5 py-10 bg-white dark:bg-gray-800 rounded-2xl drop-shadow-md border dark:border-gray-700"
          >
            <AssumptionOverrides
              overrideTerminalWacc={overrideTerminalWacc}
              overrideTerminalRoic={overrideTerminalRoic}
              overrideRevGrowthPerpetuity={overrideRevGrowthPerpetuity}
              overrideTerminalRfr={overrideTerminalRfr}
              setOverrideTerminalWacc={setOverrideTerminalWacc}
              setOverrideTerminalRoic={setOverrideTerminalRoic}
              setOverrideRevGrowthPerpetuity={setOverrideRevGrowthPerpetuity}
              setOverrideTerminalRfr={setOverrideTerminalRfr}
              terminalWaccAuto={FinCalc.calcTerminalWACC(matureMarketErp, getInputValue("riskFreeRate", "fetchedInputs"))}
              terminalRoicAuto={terminalWacc}
              terminalRfrAuto={getInputValue("riskFreeRate", "fetchedInputs")}
              revGrowthAuto={terminalRfr}
              terminalWaccCustom={terminalWaccCustom}
              terminalRfrCustom={terminalRfrCustom}
              setTerminalWaccCustom={setTerminalWaccCustom}
              setTerminalRfrCustom={setTerminalRfrCustom}
              roicTerminalYear={roicTerminalYear}
              revGrowthPerpetuity={growthTerminal}
              handleInputChange={handleInputChange}
            />
          </div>

          {/*WACC Header */}
          <div className="uppercase font-bold text-2xl text-center mt-5 mb-10 tracking-wider dark:text-white">WACC</div>
          {/* Container */}
          <div
            className="mt-10 mx-5 px-5 py-10 bg-white dark:bg-gray-800 rounded-2xl drop-shadow-md border dark:border-gray-700"
          >
            <DetailedWacc
              fetchedInputs={fetchedInputs}
              getPageInputValue={getInputValue}
              handlePageInputChange={handleInputChange}
              countryOptions={countryOptions}
              industryOptions={industryOptions}
              initialWaccManuallyEdited={initialWaccManuallyEdited}
              erpIsFetching={erpIsFetching}
              syntheticRatingOptions={syntheticRatingOptions}
              setSyntheticRatingOptions={(v: string) => { setSyntheticRatingOptions(v); setInitialWaccManuallyEdited(false); }}
            />
          </div>
          {/*Valuation Header */}
          <div className="uppercase font-bold text-2xl text-center my-10 tracking-wider dark:text-white">Valuation</div>
          {/* Container */}
          <div
            className="mt-10 mx-5 px-5 py-10 bg-white dark:bg-gray-800 rounded-2xl drop-shadow-md border dark:border-gray-700"
          >
            <div className="flex flex-col items-center mb-14 mt-10">
              <h2 className="font-medium text-xl mb-4 text-gray-700 dark:text-gray-200">Present Value of Free Cash Flow</h2>
              <div className="w-full max-w h-0.5 bg-gray-200 dark:bg-gray-600"></div>
            </div>
            <PresentValueTable
              data={valuationModelRef.current}
              setIsPopoutOpen={setPresentValuePopup}
              setValuationModelLabel={setValuationModelLabel}
            />
            <div className="flex flex-col items-center mb-14 mt-10">
              <h2 className="font-medium text-xl mb-4 text-gray-700 dark:text-gray-200">Return on Invested Capital</h2>
              <div className="w-full max-w h-0.5 bg-gray-200 dark:bg-gray-600"></div>
            </div>
            <ROICTable data={roicData} />
            <div className="flex flex-col items-center mb-14 mt-10">
              <h2 className="font-medium text-xl mb-4 text-gray-700 dark:text-gray-200">Equity Value</h2>
              <div className="w-full max-w h-0.5 bg-gray-200 dark:bg-gray-600"></div>
            </div>
            <EquityValue data={valuationOutputRef.current} />
            <ImpliedValue
              title={symbol}
              value={impliedSharePriceRef.current}
              currentPrice={getInputValue("currentSharePrice", "fetchedInputs")}
            />
            <SaveValuationButton setSavePopup={setSavePopup} />
          </div>
          {/* Write the popup pages in parent page to ensure that the darken/blur effect affects the whole page*/}
          {fundamentalPopup && (
            <FundamentalDataPopoutPage setIsPopoutOpen={setFundamentalPopup} stockInfo={stockInfo} symbol={symbol} />
          )}
          {marketPopup && (
            <MarketInsightPopoutPage
              setIsPopoutOpen={setMarketPopup}
              industries={industryOptions}
              pageInputs={inputs}
              pageFetchedInputs={fetchedInputs}
              getPageInputValue={getInputValue}
              symbol={symbol}
              valuationModelRef={valuationModelRef.current}
            />
          )}
          {presentValuePopup && (
            <PresentValuePopoutPage
              setIsPopoutOpen={setPresentValuePopup}
              data={valuationModelRef.current}
              valuationModelLabel={valuationModelLabel} //key to identify which chart to show first
              searchedSymbol={searchedSymbol}
              stockInfo={stockInfo}
            />
          )}
          {savePopup && (
            <SaveValuationPopoutPage
              setIsPopoutOpen={setSavePopup}
              symbol={symbol}
              inputs={inputs}
              email={session?.user?.email}
              fetchedInputs={fetchedInputs}
              stockInfo={stockInfo}
              valuationModel={valuationModelRef.current}
              valuationOutput={valuationOutputRef.current}
              impliedSharePrice={impliedSharePriceRef.current}
              industryOptions={industryOptions}
              countryOptions={countryOptions}
              syntheticRatingOptions={syntheticRatingOptions}
              roicData={roicData}
              mutation={saveValuationMutation}
              updateMutation={updateValuationMutation}
              editId={urlEditId || undefined}
              description={saveDescription}
              setDescription={setSaveDescription}
              tags={saveTags}
              setTags={setSaveTags}
              selectedGroupIds={saveGroupIds}
              setSelectedGroupIds={setSaveGroupIds}
              overrideTerminalWacc={overrideTerminalWacc}
              overrideTerminalRoic={overrideTerminalRoic}
              overrideRevGrowthPerpetuity={overrideRevGrowthPerpetuity}
              overrideTerminalRfr={overrideTerminalRfr}
              terminalWaccCustom={terminalWaccCustom}
              terminalRfrCustom={terminalRfrCustom}
              roicTerminalYear={roicTerminalYear}
            />
          )}
          {monteCarloPopup && (
            <MonteCarloPopoutPage
              setIsPopoutOpen={setMonteCarloPopup}
              initialInputs={inputs}
              fetchedInputs={fetchedInputs}
              searchedSymbol={searchedSymbol}
              stockInfo={stockInfo}
            />
          )}
          {sensitivityPopup && (
            <SensitivityAnalysisPopoutPage
              setIsPopoutOpen={setSensitivityPopup}
              initialInputs={inputs}
              fetchedInputs={fetchedInputs}
              searchedSymbol={searchedSymbol}
              stockInfo={stockInfo}
            />
          )}
          {currencyConverterPopup && (
            <CurrencyConverterPopoutPage
              setIsPopoutOpen={setCurrencyConverterPopup}
              symbol={symbol}
              stockInfo={stockInfo}
              fetchedInputs={fetchedInputs}
              handleInputChange={handleInputChange}
              setCurrencyConverted={setCurrencyConverted}
            />
          )}
        </>
      )}
    </div>
  );
}
