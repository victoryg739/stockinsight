"use client";

import React, { useState, useRef } from "react";
import { RxCross1 } from "react-icons/rx";
import MarketInsightTable from "./MarketInsightTable";
import { useQuery } from "@tanstack/react-query";
import * as queryFn from "../utils/queryAPIFunctions";
import * as States from "../constants/states";
import { convRound2Dp } from "../utils/helper";

const MarketInsightPopoutPage = ({
  setIsPopoutOpen,
  industries,
  pageInputs,
  pageFetchedInputs,
  getPageInputValue,
  symbol,
}) => {
  const revenueGrowthRef = useRef(States.INPUT_STATS_REVENUE_GROWTH);
  const operatingMarginRef = useRef(States.INPUT_STATS_OPERATING_MARGIN);
  const salesToCapRef = useRef(States.INPUT_STATS_SALES_TO_CAP);
  const waccRef = useRef(States.INPUT_STATS_WACC);
  const debtToCapRef = useRef(States.INPUT_STATS_DEBT_TO_CAPITAL);
  const historicalSalesToCap = useRef<{ date: string; salesToCap: number }[]>([]);
  const handleInputChange = (id: string, newValue: any, type: string): void => {
    const value = newValue === undefined ? 0 : newValue;

    switch (type) {
      case "revenueGrowth":
        revenueGrowthRef.current = revenueGrowthRef.current.map((input) =>
          input.id === id ? { ...input, value } : input
        );
        break;

      case "operatingMargin":
        operatingMarginRef.current = operatingMarginRef.current.map((input) =>
          input.id === id ? { ...input, value } : input
        );
        break;

      case "salesToCap":
        salesToCapRef.current = salesToCapRef.current.map((input) => (input.id === id ? { ...input, value } : input));
        break;

      case "wacc":
        waccRef.current = waccRef.current.map((input) => (input.id === id ? { ...input, value } : input));
        break;

      case "debtToCap":
        debtToCapRef.current = debtToCapRef.current.map((input) => (input.id === id ? { ...input, value } : input));
        break;

      default:
        console.error("Invalid type provided to handleInputChange.");
        break;
    }
  };

  const { data: inputStatsQuery } = useQuery({
    queryKey: ["balanceSheetQuartely"],
    queryFn: async () => {
      const data = queryFn.fetchInputStats(industries);
      return data;
    },
    // enabled: false,
  });

  const { data: revQuery } = useQuery({
    queryKey: ["historicalRevenue"],
    queryFn: async () => {
      const data = queryFn.fetchDCFHistoricalRev(symbol);
      return data;
    },
  });

  const { data: investedCapitalQuery } = useQuery({
    queryKey: ["historicalInvestedCapital"],
    queryFn: async () => {
      const data = queryFn.fetchDCFHistoricalInvestedCap(symbol);
      return data;
    },
  });

  if (revQuery && investedCapitalQuery) {
    historicalSalesToCap.current = [];
    for (let i = 0; i < revQuery.length; i++) {
      if (revQuery[i].date !== investedCapitalQuery[i].date) {
        //throw some error
        throw new Error("anc");
      }
      const curSalesToCap = revQuery[i].revenue / investedCapitalQuery[i].investedCapital;
      historicalSalesToCap.current.push({ date: revQuery[i].date, salesToCap: curSalesToCap });
    }
  }
  console.log(historicalSalesToCap);

  if (inputStatsQuery) {
    // Update Revenue Growth
    handleInputChange("revGrowthYr1", getPageInputValue("revGrowthYr1", "inputs") + "%", "revenueGrowth");
    handleInputChange("revGrowthYr2to5", getPageInputValue("revGrowthYr2to5", "inputs") + "%", "revenueGrowth");
    handleInputChange(
      "revenueGrowthFirstQuartile",
      inputStatsQuery["revenue_growth_rate_first_quartile"] + "%",
      "revenueGrowth"
    );
    handleInputChange("revenueGrowthMedian", inputStatsQuery["revenue_growth_rate_median"] + "%", "revenueGrowth");
    handleInputChange(
      "revenueGrowthThirdQuartile",
      inputStatsQuery["revenue_growth_rate_third_quartile"] + "%",
      "revenueGrowth"
    );

    // Update Operating Margin
    handleInputChange("opMarginYr1", getPageInputValue("opMarginYr1", "inputs") + "%", "operatingMargin");
    handleInputChange("opMarginYr10", getPageInputValue("opMarginYr10", "inputs") + "%", "operatingMargin");
    handleInputChange(
      "operatingMarginFirstQuartile",
      inputStatsQuery["pre_tax_operating_margin_first_quartile"] + "%",
      "operatingMargin"
    );
    handleInputChange(
      "operatingMarginMedian",
      inputStatsQuery["pre_tax_operating_margin_median"] + "%",
      "operatingMargin"
    );
    handleInputChange(
      "operatingMarginThirdQuartile",
      inputStatsQuery["pre_tax_operating_margin_third_quartile"] + "%",
      "operatingMargin"
    );

    // Update Sales to Capital
    handleInputChange("salesToCapYr1", getPageInputValue("salesToCapYr1", "inputs"), "salesToCap");
    handleInputChange("salesToCapYr2to5", getPageInputValue("salesToCapYr2to5", "inputs"), "salesToCap");
    handleInputChange("salesToCapYr6to10", getPageInputValue("salesToCapYr6to10", "inputs"), "salesToCap");
    handleInputChange(
      "salesToCapitalFirstQuartile",
      inputStatsQuery["sales_to_invested_capital_first_quartile"],
      "salesToCap"
    );
    handleInputChange("salesToCapitalMedian", inputStatsQuery["sales_to_invested_capital_median"], "salesToCap");
    handleInputChange(
      "salesToCapitalThirdQuartile",
      inputStatsQuery["sales_to_invested_capital_third_quartile"],
      "salesToCap"
    );

    // Update WACC
    handleInputChange("initialWacc", convRound2Dp(getPageInputValue("initialWacc", "fetchedInputs")) + "%", "wacc");
    handleInputChange("costOfCapitalFirstQuartile", inputStatsQuery["cost_of_capital_first_quartile"] + "%", "wacc");
    handleInputChange("costOfCapitalMedian", inputStatsQuery["cost_of_capital_median"] + "%", "wacc");
    handleInputChange("costOfCapitalThirdQuartile", inputStatsQuery["cost_of_capital_third_quartile"] + "%", "wacc");

    // Update Debt to Capital Ratio
    const totalEquity = getPageInputValue("totalEquity", "fetchedInputs");
    const totalDebt = getPageInputValue("totalDebt", "fetchedInputs");
    const debtToEquity = convRound2Dp(totalDebt / (totalDebt + totalEquity));

    handleInputChange("debtToCapital", debtToEquity, "debtToCap");
    handleInputChange(
      "debtToCapitalFirstQuartile",
      inputStatsQuery["debt_to_capital_ratio_first_quartile"],
      "debtToCap"
    );
    handleInputChange("debtToCapitalMedian", inputStatsQuery["debt_to_capital_ratio_median"], "debtToCap");
    handleInputChange(
      "debtToCapitalThirdQuartile",
      inputStatsQuery["debt_to_capital_ratio_third_quartile"],
      "debtToCap"
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 h-5/6 overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Market Insight</h2>

          <button
            onClick={() => {
              setIsPopoutOpen(false);
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <RxCross1 size={24} />
          </button>
        </div>

        <MarketInsightTable data={revenueGrowthRef.current} />
        <MarketInsightTable data={operatingMarginRef.current} />
        <MarketInsightTable data={salesToCapRef.current} />
        <MarketInsightTable data={waccRef.current} />
        <MarketInsightTable data={debtToCapRef.current} />
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Historical Sales to Capital Ratio</h3>
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full bg-white border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 border-b border-r rounded-tl-lg"></th>
                  {historicalSalesToCap.current.map((item, index) => (
                    <th
                      key={index}
                      className={`py-2 px-4 border-b font-semibold text-sm ${
                        index === historicalSalesToCap.current.length - 1 ? "rounded-tr-lg" : ""
                      }`}
                    >
                      {item.date}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b border-r font-semibold rounded-bl-lg">Sales to Capital Ratio</td>
                  {historicalSalesToCap.current.map((item, index) => (
                    <td
                      key={index}
                      className={`py-2 px-4 border-b text-center ${
                        index === historicalSalesToCap.current.length - 1 ? "rounded-br-lg" : ""
                      }`}
                    >
                      {item.salesToCap.toFixed(2)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <a
          href={`https://www.alphaspread.com/security/nasdaq/${symbol}/analyst-estimates`}
          className="block mt-10 text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Analyst Estimates - AlphaSpread
        </a>
        <a
          href={`https://discountingcashflows.com/company/${symbol}/valuation/discounted-free-cash-flow-perpetuity`}
          className="block mt-10 text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Analyst Estimates - Discounting Cash Flows
        </a>

        <a
          href={`https://chat.aitickerchat.com/`}
          className="block mt-10 text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Use AI for Financial Reports - AI Ticker Chat
        </a>
      </div>
    </div>
  );
};
export default MarketInsightPopoutPage;
