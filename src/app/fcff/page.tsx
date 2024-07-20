"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SearchTicker from "../components/SearchTicker";
import InputBox from "../components/InputBox";
import * as States from "../constants/states";
import PresentValueTable from "../components/PresentValueTable";
import DCFTable from "../components/DCFTable";
import * as FinCalc from "../utils/financialCalculations";
import * as FetchInputHelper from "../utils/fetchedInputsHelper";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import * as queryFn from "../utils/queryAPIFunctions";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

interface InputField {
  id: string;
  label: string;
  value: string;
  question: string;
}
type ValuationModelItem = {
  id: string;
  label: string;
  value: number[];
};

type ValuationOutputItem = {
  id: string;
  label: string;
  value: number;
};
export default function page() {
  const [symbol, setSymbol] = useState("");
  const [symbolBtn, setSymbolBtn] = useState(false);
  const [showMoreInputs, setShowMoreInputs] = useState(false);
  const toggleShowMoreInputs = () => {
    setShowMoreInputs(!showMoreInputs);
  };
  const [inputs, setInputs] = useState(States.INPUT_FIELDS);
  const getInputValue = (id: string): number => {
    const input = inputs.find((input) => input.id === id);
    return input ? parseFloat(input.value) : 0;
  };

  const handleInputChange = (id: string, newValue: any): void => {
    const value = newValue === undefined ? 0 : newValue;
    setInputs((prevInputs) => prevInputs.map((input) => (input.id === id ? { ...input, value } : input)));
  };

  const [fetchedInputs, setFetchedInputs] = useState<any>(States.FETCHED_INPUT_FIELDS);

  const getFetchedInputValue = (id: string): number => {
    const input = fetchedInputs.find((input) => input.id === id);
    return input ? parseFloat(input.value.toString()) : 0;
  };

  const handleFetchedInputChange = (id: string, newValue: any): void => {
    const value = newValue === undefined ? 0 : newValue;
    setFetchedInputs((prevFetchedInputs: any) =>
      prevFetchedInputs.map((input: any) => (input.id === id ? { ...input, value } : input))
    );
  };

  // Financial calculations state
  const [valuationModel, setValuationModel] = useState<ValuationModelItem[]>(States.VALUATION_MODEL);
  const [valuationOutput, setValuationOutput] = useState<ValuationOutputItem[]>(States.VALUATION_OUTPUT);

  const { refetch: riskFreeRateRefetch } = useQuery({
    queryKey: ["riskFreeRate"],
    queryFn: async () => {
      queryFn.fetchRiskFreeRate(handleFetchedInputChange);
    },
    enabled: false,
  });

  const { refetch: stockInfoRefetch } = useQuery({
    queryKey: ["stockInfo"],
    queryFn: async () => {
      queryFn.fetchStockInfo(symbol, handleFetchedInputChange);
    },
    enabled: false,
  });

  const { refetch: incomeStatementRefetch } = useQuery({
    queryKey: ["incomeStatement"],
    queryFn: async () => {
      queryFn.fetchIncomeStatement(symbol, handleFetchedInputChange);
    },
    enabled: false,
  });

  const { refetch: balanceSheetQuartelyRefetch } = useQuery({
    queryKey: ["balanceSheetQuartely"],
    queryFn: async () => {
      queryFn.fetchBalanceSheetQuarterly(symbol, handleFetchedInputChange);
    },
    enabled: false,
  });

  useEffect(() => {
    stockInfoRefetch();
    incomeStatementRefetch();
    riskFreeRateRefetch();
    balanceSheetQuartelyRefetch();
  }, [symbolBtn]); // add symbol change

  console.log(fetchedInputs);

  useEffect(() => {
    const growthY1 = getInputValue("revGrowthYr1");
    const growthY2to5 = getInputValue("revGrowthYr2to5");
    const growthTerminal = getInputValue("revGrowthPerpetuity");
    const ebitY1 = getInputValue("opMarginYr1");
    const ebitY10 = getInputValue("opMarginYr10");
    const yearOfConvergence = getInputValue("yrsConvergence");
    const sCapY1 = getInputValue("salesToCapYr1");
    const sCapY2to5 = getInputValue("salesToCapYr2to5");
    const sCapY6to10 = getInputValue("salesToCapYr6to10");
    const taxRateY1 = getInputValue("taxRateY1");
    const marginalTaxRate = getInputValue("marginalTaxRate");

    // Placeholder values for missing inputs
    const initialWacc = 5.05; // You might want to add this to INPUT_FIELDS
    const countryEquityRiskPremium = 4.24;
    // const riskFreeRate = 4.36;
    // const sharesOutstanding = 27.75; // You might want to add this to INPUT_FIELDS
    // const currentSharePrice = 1;

    const growthRates = FinCalc.calcRevenueGrowth(growthY1, growthY2to5, growthTerminal);
    const revenue = FinCalc.calcRevenue(getFetchedInputValue("baseRevenue"), growthRates);
    const ebitMargin = FinCalc.calcEBITMargin(
      getFetchedInputValue("baseEbitMargin"),
      ebitY1,
      ebitY10,
      yearOfConvergence
    );
    const ebit = FinCalc.calcEbit(revenue, ebitMargin);
    const taxRate = FinCalc.calcTaxRate(taxRateY1, marginalTaxRate);
    const ebitAfterTax = FinCalc.calcEbitAfterTax(ebit, taxRate);
    const terminalWacc = FinCalc.calcTerminalWACC(countryEquityRiskPremium, getFetchedInputValue("riskFreeRate"));
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
    const wacc = FinCalc.calcWACC(initialWacc, terminalWacc);

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
      getFetchedInputValue("debt"),
      0,
      // getFetchedInputValue("minorityInterest"),
      getFetchedInputValue("cash"),
      0
    );

    const equityValueCommonStock = FinCalc.calcEquityValueCommonStock(equityValue, 0);
    const impliedSharePrice = FinCalc.calcImpliedSharePrice(
      equityValueCommonStock,
      getFetchedInputValue("sharesOutstanding")
    );
    // Update VALUATION_MODEL
    setValuationModel(
      States.VALUATION_MODEL.map((item) => {
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
      })
    );

    // Update VALUATION_OUTPUT
    setValuationOutput(
      States.VALUATION_OUTPUT.map((item) => {
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
          case "impliedSharePrice":
            return { ...item, value: impliedSharePrice };
          default:
            return item;
        }
      })
    );
  }, [inputs, fetchedInputs]);
  console.log(valuationModel);
  console.log(symbol);
  console.log(symbolBtn);
  return (
    <div>
      <Navbar />
      <SearchTicker symbol={symbol} setSymbol={setSymbol} setSymbolBtn={setSymbolBtn} />
      {/*Inputs Header */}
      <div className="uppercase font-bold text-2xl text-center my-10 tracking-wider">Inputs</div>
      {/* Container */}

      <div className="mt-10 mx-5 px-5 py-10 bg-white rounded-xl shadow-md ">
        <div className="grid grid-cols-3 place-items-center gap-y-10">
          {inputs.map((input) => (
            <InputBox
              key={input.id}
              id={input.id}
              label={input.label}
              value={input.value}
              question={input.question}
              onChange={(e) => handleInputChange(input.id, e.target.value)}
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
              {showMoreInputs ? <RiArrowDropUpLine className="ml-1" /> : <RiArrowDropDownLine className="ml-1" />}{" "}
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
                onChange={(e) => handleFetchedInputChange(input.id, e.target.value)}
              />
            ))}
          </div>
        )}
      </div>
      {/*Valuation Header */}
      <div className="uppercase font-bold text-2xl text-center my-10 tracking-wider">Valuation</div>
      {/* Container */}
      <div className="mt-10 mx-5 px-5 py-10 bg-white rounded-xl shadow-md ">
        <PresentValueTable data={valuationModel} />
        <DCFTable data={valuationOutput} />
      </div>
    </div>
  );
}
