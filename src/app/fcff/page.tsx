"use client";
import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import SearchTicker from "../components/SearchTicker";
import InputBox from "../components/InputBox";
import PresentValueTable from "../components/PresentValueTable";
import EquityValue from "../components/EquityValue";
import MarketInsightPopoutPage from "../components/MarketInsightPopoutPage";
import SaveValuationPopoutPage from "../components/SaveValuationPopoutPage";
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

import * as FinCalc from "../utils/financialCalculations";
import * as queryFn from "../utils/queryAPIFunctions";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import StockInfo from "../components/StockInfo";

interface InputField {
  id: string;
  label: string;
  question: string;
  value: number | string;
  unit: string;
}

export default function Page() {
  const [symbol, setSymbol] = useState("MHO");
  const [symbolBtn, setSymbolBtn] = useState(false);
  const [showMoreInputs, setShowMoreInputs] = useState(false);
  const impliedSharePriceRef = useRef(0);
  const [countryOptions, setCountryOptions] = useState("United States");
  const [industryOptions, setIndustryOptions] = useState("Software (Internet)");
  const [marketPopup, setMarketPopup] = useState(false);
  const [savePopup, setSavePopup] = useState(false);

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

  const handleInputChange = (id: string, newValue: any, type: "inputs" | "fetchedInputs" | "stockInfo"): void => {
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

  const { refetch: riskFreeRateRefetch } = useQuery({
    queryKey: ["riskFreeRate"],
    queryFn: async () => {
      queryFn.fetchRiskFreeRate(handleInputChange);
    },
    enabled: false,
  });

  //GET ERP and marginal tax rate
  const { refetch: equityRiskPremiumRefectch } = useQuery({
    queryKey: ["equityRiskPremium"],
    queryFn: async () => {
      return queryFn.fetchEquityRiskPremium(encodeParams(countryOptions), handleInputChange);
    },
    enabled: false,
  });

  const { refetch: stockInfoRefetch, isError: stockInfoIsError } = useQuery({
    queryKey: ["stockInfo"],
    queryFn: async () => {
      queryFn.fetchStockInfo(symbol, handleInputChange);
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
      queryFn.fetchBalanceSheetQuarterly(symbol, handleInputChange);
    },
    enabled: false,
  });

  const saveValuationMutation = useMutation({
    mutationFn: async (data: any) => {
      queryFn.postValuation(data);
    },
  });

  useEffect(() => {
    stockInfoRefetch();
    incomeStatementRefetch();
    balanceSheetQuartelyRefetch();
  }, [symbolBtn]);

  useEffect(() => {
    riskFreeRateRefetch(); //for now hardcoded to only have US 10 Year treasury yield
    equityRiskPremiumRefectch();
  }, [countryOptions]);

  const SalesToCapAutoFill = () => {
    const totalEquity = getInputValue("totalEquity", fetchedInputs);
    const totalDebt = getInputValue("totalDebt", fetchedInputs);
    const cash = getInputValue("cash", fetchedInputs);
    const investedCapital = FinCalc.calcInvestedCapital(totalEquity, totalDebt, cash);
    const baseRevenue = getInputValue("baseRevenue", fetchedInputs);
    const salesToCap = FinCalc.calcSalesToCap(baseRevenue, investedCapital);

    useEffect(() => {
      handleInputChange("salesToCapYr1", salesToCap, "inputs");
      handleInputChange("salesToCapYr2to5", salesToCap, "inputs");
      handleInputChange("salesToCapYr6to10", salesToCap, "inputs");
    }, [salesToCap]);
  };
  SalesToCapAutoFill();

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
  const reinvestment = FinCalc.calcReinvestment(
    revenue,
    sCapY1,
    sCapY2to5,
    sCapY6to10,
    growthTerminal,
    terminalWacc,
    ebitAfterTax[ebitAfterTax.length - 1]
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
    getInputValue("sharesOutstanding", "fetchedInputs")
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
      case "terminalCOC":
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
  }
  return (
    <div>
      <Navbar />
      <SearchTicker symbol={symbol} setSymbol={setSymbol} setSymbolBtn={setSymbolBtn} />

      {/*Inputs Header */}
      {!symbol ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <Image
            src="/growth.svg"
            alt="growth icon"
            height={500}
            width={500}
            className="object-contain mb-4" // Added margin-bottom for spacing
          />
          <p className=" font-medium text-lg text-center mt-5"> Search for the stock ticker you want to view</p>
        </div>
      ) : incomeStatementStatus === "error" ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <Image
            src="/error.svg"
            alt="Error icon"
            height={500}
            width={500}
            className="object-contain mb-4" // Added margin-bottom for spacing
          />
          <p className="text-red-700 font-medium text-lg text-center mt-5">No such symbol. Please enter valid symbol</p>
        </div>
      ) : incomeStatementIsFetching || status === "loading" ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <Image
            src="/loading.svg"
            alt="Loading icon"
            height={400}
            width={400}
            className="object-contain mb-4" // Added margin-bottom for spacing
          />
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
            <StockInfo stockInfo={stockInfo} setStockInfo={setStockInfo} />
          </div>
          <div className="uppercase font-bold text-2xl text-center my-10 tracking-wider">Inputs</div>
          {/* Container */}
          <div
            className="mt-10 mx-5 px-5 py-10 bg-white rounded-2xl drop-shadow-md
           border"
          >
            <div className="grid grid-cols-3 place-items-center gap-y-10 ">
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
              <button
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50 rounded-lg px-4 py-2 transition-all duration-200"
                onClick={() => setMarketPopup(true)}
              >
                Market Insight
              </button>

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
              <div className="grid grid-cols-3 place-items-center gap-y-10 mt-10">
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
          {/*WACC Header */}
          <div className="uppercase font-bold text-2xl text-center my-10 tracking-wider">WACC</div>
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
              <div className="w-full max-w h-0.5 bg-gray-100"></div>
            </div>
            <PresentValueTable data={valuationModelRef.current} />
            <div className="flex flex-col items-center mb-14 mt-10">
              <h2 className="font-medium text-xl mb-4 text-gray-700">Equity Value</h2>
              <div className="w-full max-w h-0.5 bg-gray-100"></div>
            </div>
            <EquityValue data={valuationOutputRef.current} />
            <ImpliedValue
              title={symbol}
              value={impliedSharePriceRef.current}
              currentPrice={getInputValue("currentSharePrice", "fetchedInputs")}
            />
            <SaveValuationButton setSavePopup={setSavePopup} />
          </div>
          {marketPopup && (
            <MarketInsightPopoutPage
              setIsPopoutOpen={setMarketPopup}
              industries={industryOptions}
              pageInputs={inputs}
              pageFetchedInputs={fetchedInputs}
              getPageInputValue={getInputValue}
              symbol={symbol}
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
              mutation={saveValuationMutation}
            />
          )}
        </>
      )}
    </div>
  );
}
