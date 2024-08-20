import React, { useState, useEffect, useRef } from "react";
import Dropdown from "../DropDown";
import { countries, industries, syntheticRatings } from "../../constants/dropdown";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import WaccFormula from "./WaccFormula";
import * as queryFn from "../../utils/queryAPIFunctions";
import * as States from "../../constants/states";
import * as financialCalculations from "../../utils/financialCalculations";
import { encodeParams } from "../../utils/helper";
import * as conv from "../../utils/helper";

export default function DetailedWacc({
  fetchedInputs,
  getPageInputValue,
  handlePageInputChange,
  industryOptions,
  countryOptions,
}: any) {
  // Get QueryClient from the context
  const queryClient = useQueryClient();
  const [syntheticRatingOptions, setSyntheticRatingOptions] = useState("Aaa/AAA");
  const spread = useRef(0.59);

  const waccEquityRef = useRef(States.WACC_EQUITY);
  const waccDebtRef = useRef(States.WACC_DEBT);
  const marketEquityRef = useRef(0);
  const costOfEquityRef = useRef(0);
  const marketDebtRef = useRef(0);
  const costOfDebtRef = useRef(0);
  const initialWaccRef = useRef(0);
  const equityWeightRef = useRef(0);
  const debtWeightRef = useRef(0);

  const getInputValue = (id: string, type: "waccEquity" | "waccDebt"): number => {
    const inputArray = type === "waccEquity" ? waccEquityRef.current : waccDebtRef.current;
    const input = inputArray.find((input: any) => input.id === id);
    return input ? input.value : 0;
  };

  const handleInputChange = (id: string, newValue: any, type: "waccEquity" | "waccDebt"): void => {
    const value = newValue === undefined ? 0 : newValue;
    if (type === "waccEquity") {
      waccEquityRef.current = waccEquityRef.current.map((input) => (input.id === id ? { ...input, value } : input));
    } else if (type === "waccDebt") {
      waccDebtRef.current = waccDebtRef.current.map((input: any) => (input.id === id ? { ...input, value } : input));
    }
  };

  //GET unlevered beta
  const { data: betaQuery } = useQuery({
    queryKey: ["beta"],
    queryFn: async () => {
      const data = queryFn.fetchBeta(encodeParams(industryOptions));
      return data;
    },
  });
  if (betaQuery) {
    handleInputChange("unleveredBeta", betaQuery, "waccEquity");
  }

  //GET synthetic ratings spread
  const { data: syntheticRatingQuery } = useQuery({
    queryKey: ["syntheticRatingSpread"],
    queryFn: async () => {
      return queryFn.fetchSyntheticRatingSpread(syntheticRatingOptions);
    },
  });

  if (syntheticRatingQuery) {
    spread.current = syntheticRatingQuery;
  }

  //invalidate all queries
  useEffect(() => {
    queryClient.refetchQueries();
  }, [industryOptions, countryOptions, syntheticRatingOptions]);

  //handle local input changes from page
  const riskFreeRate = getPageInputValue("riskFreeRate", "fetchedInputs");
  handleInputChange("riskFreeRate", riskFreeRate, "waccEquity");
  handleInputChange("riskFreeRate", riskFreeRate, "waccDebt");
  const equityRiskPremium = getPageInputValue("equityRiskPremium", "fetchedInputs");
  handleInputChange("equityRiskPremium", equityRiskPremium, "waccEquity");

  const marginalTaxRate = getPageInputValue("marginalTaxRate", "fetchedInputs");
  handleInputChange("marginalTaxRate", marginalTaxRate, "waccEquity");
  handleInputChange("marginalTaxRate", marginalTaxRate, "waccDebt");

  //calculate levered beta
  const unleveredBeta = getInputValue("unleveredBeta", "waccEquity");

  //calculate pre tax cost of debt
  const preTaxCostOfDebt = riskFreeRate + spread.current;
  handleInputChange("preTaxCostOfDebt", preTaxCostOfDebt, "waccDebt");

  //calculate market value of equity
  const sharesOutstanding = getPageInputValue("sharesOutstanding", "fetchedInputs");
  const currentSharePrice = getPageInputValue("currentSharePrice", "fetchedInputs");
  marketEquityRef.current = sharesOutstanding * currentSharePrice;

  //calculate market value of debt
  const interestExpense = getPageInputValue("interestExpense", "fetchedInputs");
  const totalDebt = getPageInputValue("totalDebt", "fetchedInputs");
  handleInputChange("interestExpense", interestExpense, "waccDebt");
  handleInputChange("totalDebt", totalDebt, "waccDebt");
  marketDebtRef.current = financialCalculations.calcMarketValueDebt(interestExpense, preTaxCostOfDebt, 3, totalDebt);

  //calculate levered beta
  const leveredBeta = financialCalculations.calcLeveredBeta(
    unleveredBeta,
    marginalTaxRate,
    marketEquityRef.current,
    marketDebtRef.current
  );
  handleInputChange("leveredBeta", leveredBeta, "waccEquity");

  //calculate cost of equity
  const costOfEquity = financialCalculations.calcCostOfEquity(riskFreeRate, leveredBeta, equityRiskPremium);
  costOfEquityRef.current = costOfEquity;

  //calculate cost of debt
  costOfDebtRef.current = preTaxCostOfDebt * (1 - marginalTaxRate / 100);

  //calculate wacc
  equityWeightRef.current = financialCalculations.calcWaccEquityWeight(marketEquityRef.current, marketDebtRef.current);
  debtWeightRef.current = financialCalculations.calcWaccDebtWeight(marketEquityRef.current, marketDebtRef.current);

  initialWaccRef.current = financialCalculations.calcInitialWacc(
    equityWeightRef.current,
    debtWeightRef.current,
    costOfEquityRef.current,
    costOfDebtRef.current
  );
  useEffect(() => {
    handlePageInputChange("initialWacc", initialWaccRef.current, "fetchedInputs");
  }, [initialWaccRef.current]);

  return (
    <div>
      <div className="flex flex-col items-center mb-14">
        <h2 className="font-medium text-xl mb-4 text-gray-700">Equity</h2>
        <div className="w-full max-w h-0.5 bg-gray-100"></div>
      </div>
      <div className="grid grid-cols-3 place-items-center gap-y-10">
        {waccEquityRef.current.map((item, index) => (
          //old logic can change next time
          <>
            {item.id === "riskFreeRate" || item.id === "equityRiskPremium" ? (
              <div className="flex flex-col items-center justify-center bg-gray-100 rounded-2xl p-4 w-48 h-20 col-start-1">
                <div className="text-2xl font-semibold">{conv.convRound2Dp(item.value) + "%"}</div>
                <div className="text-xs  tracking-wide mt-1 border-b border-dotted border-black">{item.label}</div>
              </div>
            ) : item.id === "leveredBeta" ? (
              <div className="flex flex-col items-center justify-center bg-gray-100 rounded-2xl p-4 w-48 h-20">
                <div className="text-2xl font-semibold">{conv.convRound2Dp(item.value)}</div>
                <div className="text-xs  tracking-wide mt-1 border-b border-dotted border-black">{item.label}</div>
              </div>
            ) : item.id === "marginalTaxRate" ? (
              <div className="flex flex-col items-center justify-center bg-gray-100 rounded-2xl p-4 w-48 h-20">
                <div className="text-2xl font-semibold">{item.value + "%"}</div>
                <div className="text-xs  tracking-wide mt-1 border-b border-dotted border-black">{item.label}</div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center bg-gray-100 rounded-2xl p-4 w-48 h-20">
                <div className="text-2xl font-semibold">{item.value}</div>
                <div className="text-xs  tracking-wide mt-1 border-b border-dotted border-black">{item.label}</div>
              </div>
            )}
          </>
        ))}

        <div className="flex flex-col items-center justify-center bg-blue-200 rounded-2xl p-4 w-48 h-20 col-start-1">
          <div className="text-2xl font-semibold">{conv.convToMillion(marketEquityRef.current)}</div>
          <div className="text-xs tracking-wide mt-1 border-b border-dotted border-black">Market Value of Equity</div>
        </div>

        <div className="flex flex-col items-center justify-center bg-blue-200 rounded-2xl p-4 w-48 h-20 col-start-1">
          <div className="text-2xl font-semibold">{conv.convRound2Dp(costOfEquityRef.current) + "%"}</div>
          <div className="text-xs tracking-wide mt-1 border-b border-dotted border-black">Cost Of Equity</div>
        </div>
      </div>

      <div className="flex flex-col items-center mb-14">
        <h2 className="font-medium text-xl mb-4 text-gray-700">Debt</h2>
        <div className="w-full max-w h-0.5 bg-gray-100"></div>
      </div>
      <div className="grid grid-cols-3 place-items-center gap-y-10">
        <Dropdown
          options={syntheticRatings}
          value={syntheticRatingOptions}
          onChange={setSyntheticRatingOptions}
          defaultOption="Aaa/AAA"
          label="Synthetic Rating"
        />
        {waccDebtRef.current.map((item, index) => (
          <>
            {index === 0 ? (
              <div className="flex flex-col items-center justify-center bg-gray-100 rounded-2xl p-4 w-48 h-20 col-start-1">
                <div className="text-2xl font-semibold">{conv.convRound2Dp(item.value) + "%"}</div>
                <div className="text-xs  tracking-wide mt-1 border-b border-dotted border-black">{item.label}</div>
              </div>
            ) : item.id === "preTaxCostOfDebt" ? (
              <div className="flex flex-col items-center justify-center bg-gray-100 rounded-2xl p-4 w-48 h-20">
                <div className="text-2xl font-semibold">{conv.convRound2Dp(item.value)}</div>
                <div className="text-xs  tracking-wide mt-1 border-b border-dotted border-black">{item.label}</div>
              </div>
            ) : item.id === "marginalTaxRate" ? (
              <div className="flex flex-col items-center justify-center bg-gray-100 rounded-2xl p-4 w-48 h-20">
                <div className="text-2xl font-semibold">{item.value + "%"}</div>
                <div className="text-xs  tracking-wide mt-1 border-b border-dotted border-black">{item.label}</div>
              </div>
            ) : item.id === "totalDebt" || item.id === "interestExpense" ? (
              <div className="flex flex-col items-center justify-center bg-gray-100 rounded-2xl p-4 w-48 h-20">
                <div className="text-2xl font-semibold">{conv.convToMillion(item.value)}</div>
                <div className="text-xs  tracking-wide mt-1 border-b border-dotted border-black">{item.label}</div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center bg-gray-100 rounded-2xl p-4 w-48 h-20">
                <div className="text-2xl font-semibold">{item.value}</div>
                <div className="text-xs  tracking-wide mt-1 border-b border-dotted border-black">{item.label}</div>
              </div>
            )}
          </>
        ))}
        <div className="flex flex-col items-center justify-center bg-blue-200 rounded-2xl p-4 w-48 h-20 col-start-1">
          <div className="text-2xl font-semibold">{conv.convToMillion(marketDebtRef.current)}</div>
          <div className="text-xs tracking-wide mt-1 border-b border-dotted border-black">Market Value of Debt</div>
        </div>

        <div className="flex flex-col items-center justify-center bg-blue-200 rounded-2xl p-4 w-48 h-20 col-start-1">
          <div className="text-2xl font-semibold">{conv.convRound2Dp(costOfDebtRef.current) + "%"}</div>
          <div className="text-xs tracking-wide mt-1 border-b border-dotted border-black">Cost Of Debt</div>
        </div>
      </div>
      <div className="flex flex-col items-center mb-14 mt-10">
        <h2 className="font-medium text-xl mb-4 text-gray-700">WACC</h2>
        <div className="w-full max-w h-0.5 bg-gray-100"></div>
      </div>
      <WaccFormula
        wacc={getPageInputValue("initialWacc", "fetchedInputs")}
        costOfEquity={costOfEquityRef.current}
        equityWeight={equityWeightRef.current}
        costOfDebt={costOfDebtRef.current}
        debtWeight={debtWeightRef.current}
      />
    </div>
  );
}
