"use client";
import { useState, useRef, useEffect } from "react";
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
import { useRouter } from "next/navigation";
import StockInfo from "../components/StockInfo";
import MonteCarloPopoutPage from "../components/PopoutPage/MonteCarloPopoutPage";
import SensitivityAnalysisPopoutPage from "../components/PopoutPage/SensitivityAnalysisPopoutPage";
import AnalysisToolsCarousel from "../components/AnalysisToolsCarousel"; // Import the new carousel component
import FundamentalDataPopoutPage from "../components/PopoutPage/FundamentalDataPopoutPage";

interface InputField {
  id: string;
  label: string;
  question: string;
  value: number | string;
  unit: string;
}

export default function Page() {
  const [symbol, setSymbol] = useState("");
  //This state is to capture symbol only when search button is pressed
  const [searchedSymbol, setSearchedSymbol] = useState("");
  const [symbolBtn, setSymbolBtn] = useState(false);
  const [showMoreInputs, setShowMoreInputs] = useState(false);
  const impliedSharePriceRef = useRef(0);
  const [countryOptions, setCountryOptions] = useState("United States");
  const [industryOptions, setIndustryOptions] = useState("Software (Internet)");
  const [marketPopup, setMarketPopup] = useState(false);
  const [presentValuePopup, setPresentValuePopup] = useState(false);
  const [monteCarloPopup, setMonteCarloPopup] = useState(false);
  const [sensitivityPopup, setSensitivityPopup] = useState(false);
  const [currencyConverterPopup, setCurrencyConverterPopup] = useState(false);
  const [currencyConverted, setCurrencyConverted] = useState(false);
  const [fundamentalPopup, setFundamentalPopup] = useState(false);

  const [valuationModelLabel, setValuationModelLabel] = useState("");
  const [savePopup, setSavePopup] = useState(false);

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

  const { data: session, status } = useSession();
  const router = useRouter();

  const [inputs, setInputs] = useState(States.INPUT_FIELDS);
  const [fetchedInputs, setFetchedInputs] = useState<any>(States.FETCHED_INPUT_FIELDS);
  const [stockInfo, setStockInfo] = useState(States.STOCK_INFO);

  const getInputValue = (id: string, type: "inputs" | "fetchedInputs"): number => {
    const inputArray = type === "inputs" ? inputs : fetchedInputs;
    const input = inputArray.find((input: any) => input.id === id);
    return input ? input.value : 0;
  };

  const handleInputChange = (
    id: string,
    newValue: any,
    type: "inputs" | "fetchedInputs" | "stockInfo",
    isAutoFill: boolean = false
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
        prevFetchedInputs.map((input: any) => (input.id === id ? { ...input, value } : input))
      );
    } else if (type === "stockInfo") {
      setStockInfo((prevStockInfo: any) =>
        prevStockInfo.map((input: any) => (input.id === id ? { ...input, value } : input))
      );
    }
  };

  // Financial calculations state
  const valuationModelRef: any = useRef(States.VALUATION_MODEL);
  const valuationOutputRef: any = useRef(States.VALUATION_OUTPUT);

  const { data: riskFreeRateData } = useQuery({
    queryKey: ["riskFreeRate"],
    queryFn: async () => {
      await queryFn.fetchRiskFreeRate(handleInputChange);
      return null;
    },
  });

  //GET ERP and marginal tax rate
  const { refetch: equityRiskPremiumRefectch } = useQuery({
    queryKey: ["equityRiskPremium"],
    queryFn: async () => {
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
      queryFn.postValuation(data);
    },
  });

  useEffect(() => {
    if (!symbol.trim()) {
      return;
    }
    setCurrencyConverted(false);

    // Reset manual edit tracking when searching for a new symbol
    setSalesToCapManuallyEdited({
      salesToCapYr1: false,
      salesToCapYr2to5: false,
      salesToCapYr6to10: false,
    });
    setRoicTerminalYearManuallyEdited(false);
    setInitialWaccManuallyEdited(false);

    stockInfoRefetch();
    incomeStatementRefetch();
    balanceSheetQuartelyRefetch();
    setSearchedSymbol(symbol); // Capture the symbol at search time
  }, [symbolBtn, symbol, stockInfoRefetch, incomeStatementRefetch, balanceSheetQuartelyRefetch]);

  useEffect(() => {
    equityRiskPremiumRefectch();
  }, [countryOptions, equityRiskPremiumRefectch]);

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
  const countryEquityRiskPremium = getInputValue("equityRiskPremium", "fetchedInputs");

  const growthRates = FinCalc.calcRevenueGrowth(growthY1, growthY2to5, growthTerminal);
  const revenue = FinCalc.calcRevenue(getInputValue("baseRevenue", "fetchedInputs"), growthRates);
  const ebitMargin = FinCalc.calcEBITMargin(
    getInputValue("baseEbitMargin", "fetchedInputs"),
    ebitY1,
    ebitY10,
    yearOfConvergence
  );
  const ebit = FinCalc.calcEbit(revenue, ebitMargin);
  const taxRate = FinCalc.calcTaxRate(effectiveTaxRate, marginalTaxRate);
  const ebitAfterTax = FinCalc.calcEbitAfterTax(ebit, taxRate);
  const terminalWacc = FinCalc.calcTerminalWACC(
    countryEquityRiskPremium,
    getInputValue("riskFreeRate", "fetchedInputs")
  );

  const RoicTerminalAutoFill = () => {
    //we use terminal WACC however in Aswath spreadsheet is year 10 WACC however of both the value is always the same
    const terminalWacc = FinCalc.calcTerminalWACC(
      countryEquityRiskPremium,
      getInputValue("riskFreeRate", "fetchedInputs")
    );
    const riskFreeRate = getInputValue("riskFreeRate", "fetchedInputs");
    const equityRiskPremium = getInputValue("equityRiskPremium", "fetchedInputs");

    useEffect(() => {
      // Only auto-fill if the field hasn't been manually edited
      if (!roicTerminalYearManuallyEdited) {
        handleInputChange("roicTerminalYear", terminalWacc, "fetchedInputs", true);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [terminalWacc, riskFreeRate, equityRiskPremium, roicTerminalYearManuallyEdited]);
  };
  RoicTerminalAutoFill();
  const roicTerminalYear = getInputValue("roicTerminalYear", "fetchedInputs");

  // Calculate reinvestment with error handling for initial empty state
  let reinvestment: number[];
  try {
    reinvestment = FinCalc.calcReinvestment(
      revenue,
      sCapY1,
      sCapY2to5,
      sCapY6to10,
      growthTerminal,
      roicTerminalYear,
      ebitAfterTax[ebitAfterTax.length - 1]
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
    roicTerminalYear
  );
  const fcff = FinCalc.calcFcff(ebitAfterTax, reinvestment);
  const wacc = FinCalc.calcWACC(getInputValue("initialWacc", "fetchedInputs"), terminalWacc);

  const cumulatedDiscountFactor = FinCalc.calcCumulatedDiscountFactor(wacc);

  const pvFcff = FinCalc.calcPvFcff(fcff, cumulatedDiscountFactor);

  const sumOfPvFcff10Yrs = FinCalc.calcSumOfPvFcff10Yrs(pvFcff);

  const terminalValue = FinCalc.calcTerminalValue(
    fcff[fcff.length - 1],
    wacc[wacc.length - 1],
    growthRates[growthRates.length - 1]
  );

  const pvTerminalValue = FinCalc.calcPVTerminalValue(
    terminalValue,
    cumulatedDiscountFactor[cumulatedDiscountFactor.length - 1]
  );

  const enterpriseValue = FinCalc.calcEnterpriseValue(pvTerminalValue, sumOfPvFcff10Yrs);
  const equityValue = FinCalc.calcEquityValue(
    enterpriseValue,
    getInputValue("totalDebt", "fetchedInputs"),
    0,
    // getFetchedInputValue("minorityInterest"),
    getInputValue("cash", "fetchedInputs"),
    0
  );

  const equityValueCommonStock = FinCalc.calcEquityValueCommonStock(equityValue, 0);
  const impliedSharePrice = FinCalc.calcImpliedSharePrice(
    equityValueCommonStock,
    getInputValue("impliedSharesOutstanding", "fetchedInputs")
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
    return router.push("/"); // Redirect to homepage
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

      {searchedSymbol === "" ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <Image src="/growth.svg" alt="growth icon" height={500} width={500} className="object-contain mb-4" />
          <p className=" font-medium text-lg text-center mt-5"> Search for the stock ticker you want to view</p>
        </div>
      ) : incomeStatementStatus === "error" ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <Image src="/error.svg" alt="Error icon" height={500} width={500} className="object-contain mb-4" />
          <p className="text-red-700 font-medium text-lg text-center mt-5">No such symbol. Please enter valid symbol</p>
        </div>
      ) : incomeStatementIsFetching || status === "loading" ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <Image src="/loading.svg" alt="Loading icon" height={400} width={400} className="object-contain mb-4" />
          <p className="font-semibold text-lg text-center mt-5">Loading...</p>
        </div>
      ) : (
        <>
          {saveValuationMutation.isSuccess && <Alert message="Valuation successfully saved" />}
          {/* Container */}
          <div
            className="mt-10 mx-5 px-5 py-10 bg-white rounded-2xl drop-shadow-md
           border"
          >
            <StockInfo stockInfo={stockInfo} setStockInfo={setStockInfo} searchedSymbol={searchedSymbol} />
          </div>

          <div className="uppercase font-bold text-2xl text-center my-10 tracking-wider">Analysis Tools</div>
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

          <div className="uppercase font-bold text-2xl text-center my-10 tracking-wider">Inputs</div>
          {/* Container */}
          <div
            className="mt-10 mx-5 px-5 py-10 bg-white rounded-2xl drop-shadow-md
           border"
          >
            <div className="grid lg:grid-cols-3 grid-cols-2 place-items-center gap-y-10 ">
              <Dropdown
                options={countries}
                value={countryOptions}
                onChange={setCountryOptions}
                defaultOption="United States"
                label="Country"
              />
              <Dropdown
                options={industries}
                value={industryOptions}
                onChange={setIndustryOptions}
                defaultOption="Software (Internet)"
                label="Industry"
              />

              {inputs.map((input, index) => (
                <InputBox
                  key={input.id}
                  id={input.id}
                  label={input.label}
                  value={input.value}
                  question={input.question}
                  unit={input.unit}
                  onChange={(e: any) => handleInputChange(input.id, e.target.value, "inputs")}
                  firstElement={index === 0}
                />
              ))}
            </div>
            {/* Show More button */}
            <div className="text-center mt-10">
              <button
                onClick={() => setShowMoreInputs((prevState) => !prevState)}
                className="bg-black hover:bg-gray-700 text-white py-2 px-3 rounded"
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
                {fetchedInputs.map((input: InputField) => (
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
          <div className="mt-10 mx-5 text-gray-700 font-extralight text-sm">
            All financial numbers are in the millions
          </div>
          {/*WACC Header */}
          <div className="uppercase font-bold text-2xl text-center mt-5 mb-10 tracking-wider">WACC</div>
          {/* Container */}
          <div
            className="mt-10 mx-5 px-5 py-10 bg-white rounded-2xl drop-shadow-md
           border"
          >
            <DetailedWacc
              fetchedInputs={fetchedInputs}
              getPageInputValue={getInputValue}
              handlePageInputChange={handleInputChange}
              countryOptions={countryOptions}
              industryOptions={industryOptions}
              initialWaccManuallyEdited={initialWaccManuallyEdited}
            />
          </div>
          {/*Valuation Header */}
          <div className="uppercase font-bold text-2xl text-center my-10 tracking-wider">Valuation</div>
          {/* Container */}
          <div
            className="mt-10 mx-5 px-5 py-10 bg-white rounded-2xl drop-shadow-md
           border"
          >
            <div className="flex flex-col items-center mb-14 mt-10">
              <h2 className="font-medium text-xl mb-4 text-gray-700">Present Value of Free Cash Flow</h2>
              <div className="w-full max-w h-0.5 bg-gray-200"></div>
            </div>
            <PresentValueTable
              data={valuationModelRef.current}
              setIsPopoutOpen={setPresentValuePopup}
              setValuationModelLabel={setValuationModelLabel}
            />
            <div className="flex flex-col items-center mb-14 mt-10">
              <h2 className="font-medium text-xl mb-4 text-gray-700">Return on Invested Capital</h2>
              <div className="w-full max-w h-0.5 bg-gray-200"></div>
            </div>
            <ROICTable data={roicData} />
            <div className="flex flex-col items-center mb-14 mt-10">
              <h2 className="font-medium text-xl mb-4 text-gray-700">Equity Value</h2>
              <div className="w-full max-w h-0.5 bg-gray-200"></div>
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
              roicData={roicData}
              mutation={saveValuationMutation}
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
