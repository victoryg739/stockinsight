"use client";

import React, { useState, useRef, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import MarketInsightTable from "../MarketInsightTable";
import { useQueries, useQuery } from "@tanstack/react-query";
import * as queryFn from "../../utils/queryAPIFunctions";
import * as States from "../../constants/states";
import { convRound2Dp, convToMillion } from "../../utils/helper";
import { CiSearch } from "react-icons/ci";

const MarketInsightPopoutPage = ({
  setIsPopoutOpen,
  industries,
  pageInputs,
  pageFetchedInputs,
  getPageInputValue,
  symbol,
}: any) => {
  const revenueGrowthRef = useRef(States.INPUT_STATS_REVENUE_GROWTH);
  const operatingMarginRef = useRef(States.INPUT_STATS_OPERATING_MARGIN);
  const salesToCapRef = useRef(States.INPUT_STATS_SALES_TO_CAP);
  const waccRef = useRef(States.INPUT_STATS_WACC);
  const debtToCapRef = useRef(States.INPUT_STATS_DEBT_TO_CAPITAL);
  const roicRef = useRef(States.ROIC_STATS);
  const [historicalSalesToCap, setHistoricalSalesToCap] = useState<{ date: string; salesToCap: number | string }[]>([]);
  const popoutRef = useRef<HTMLDivElement>(null);

  const compAnalysisRef = useRef([
    { ticker: symbol, shortName: "", revenue: 0, ebit: 0, ebitMargin: 0, peRatio: 0, salesToCapital: "N/A" },
    { ticker: "", shortName: "", revenue: 0, ebit: 0, ebitMargin: 0, peRatio: 0, salesToCapital: "N/A" },
  ]);

  const [averages, setAverages] = useState({
    avgSalesToCapital: "N/A",
    avgPeRatio: "N/A",
    avgEbitMargin: "N/A",
  });

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

      case "roic":
        roicRef.current = roicRef.current.map((input) => (input.id === id ? { ...input, value } : input));

      default:
        console.error("Invalid type provided to handleInputChange.");
        break;
    }
  };

  const { data: inputStatsQuery } = useQuery({
    queryKey: ["inputStats"],
    queryFn: async () => {
      const data = queryFn.fetchInputStats(industries);
      return data;
    },
    // enabled: false,
  });

  const { data: roicStatsQuery } = useQuery({
    queryKey: ["roicStats"],
    queryFn: async () => {
      const data = queryFn.fetchRoic(industries);
      return data;
    },
    // enabled: false,
  });

  const {
    data: revQuery,
    refetch: refetchRev,
    isFetching: revIsFetching,
  } = useQuery({
    queryKey: ["historicalRevenue", symbol], // Add symbol to query key
    queryFn: async () => await queryFn.fetchDCFHistoricalRev(symbol),
    staleTime: 0,
    enabled: false, // Disable automatic fetch
  });

  const {
    data: investedCapitalQuery,
    refetch: refetchInvestedCapital,
    isFetching: investedCapitalIsFetching,
  } = useQuery({
    queryKey: ["historicalInvestedCapital", symbol], // Add symbol to query key
    queryFn: async () => await queryFn.fetchDCFHistoricalInvestedCap(symbol),
    staleTime: 0,
    enabled: false,
  });

  const compAnalysisQueries = useQueries({
    queries: compAnalysisRef.current.map((item) => ({
      queryKey: ["compAnalysis", item.ticker], // Unique key per ticker
      queryFn: () => queryFn.fetchCompAnalysis(item.ticker),
      enabled: false,
    })),
  });

  const isFetchingCompAnalysis = compAnalysisQueries.some((query) => query.isFetching);

  // Force re-render mechanism
  const [, forceUpdate] = useState({});
  const triggerReRender = () => forceUpdate({});

  // Add useEffect to trigger refetch when popup opens
  useEffect(() => {
    if (symbol) {
      refetchRev();
      refetchInvestedCapital();
    }
  }, [symbol, refetchRev, refetchInvestedCapital]);

  useEffect(() => {
    if (revQuery && investedCapitalQuery) {
      const updatedSalesToCap = [];
      for (let a = 0; a < revQuery.length; a++) {
        for (let b = 0; b < investedCapitalQuery.length; b++) {
          //same date
          if (revQuery[a].date === investedCapitalQuery[b].date) {
            const curSalesToCap = revQuery[a].revenue / investedCapitalQuery[a].investedCapital;
            updatedSalesToCap.push({ date: revQuery[a].date, salesToCap: curSalesToCap });
          }
        }
      }
      setHistoricalSalesToCap(updatedSalesToCap);
    }
  }, [revQuery, investedCapitalQuery]);

  const validSalesToCap = historicalSalesToCap
    .map((item) => item.salesToCap)
    .filter((value) => typeof value === "number" && !isNaN(value)) as number[];

  const average =
    validSalesToCap.length > 0 ? validSalesToCap.reduce((sum, val) => sum + val, 0) / validSalesToCap.length : null;

  const stdDev =
    validSalesToCap.length > 0 && average !== null
      ? Math.sqrt(validSalesToCap.reduce((sum, val) => sum + Math.pow(val - average, 2), 0) / validSalesToCap.length)
      : null;

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

  if (roicStatsQuery) {
    handleInputChange("roic", roicStatsQuery["roc"] + "%", "roic");
    handleInputChange("reinvestmentRate", "$" + roicStatsQuery["reinvestment_rate"], "roic");
    handleInputChange("expectedGrowthEbit", roicStatsQuery["expected_growth_ebit"] + "%", "roic");
  }

  // Close when clicking outside the popout
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoutRef.current && !popoutRef.current.contains(event.target as Node)) {
        setIsPopoutOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsPopoutOpen]);

  //handle button(search) click in the comp analysis
  const handleCompAnalysis = async () => {
    // Wait for all refetch operations to complete
    const results = await Promise.all(compAnalysisQueries.map((query) => query.refetch()));
    const avg = {
      ebitMargin: { value: 0, count: 0 },
      peRatio: { value: 0, count: 0 },
      salesToCapital: { value: 0, count: 0 },
    };
    results.forEach((result, index) => {
      compAnalysisRef.current[index] = {
        ...compAnalysisRef.current[index],
        ...result.data, // Merge fetched data
      };

      if (result.data?.ticker !== "") {
        if (result.data?.ebitMargin !== undefined) {
          avg.ebitMargin.count += 1;
          avg.ebitMargin.value += (result.data.ebitMargin - avg.ebitMargin.value) / avg.ebitMargin.count;
        }
        if (result.data?.peRatio !== undefined) {
          avg.peRatio.count += 1;
          avg.peRatio.value += (result.data.peRatio - avg.peRatio.value) / avg.peRatio.count;
        }
        if (result.data?.salesToCapital !== "N/A" && result.data?.salesToCapital !== undefined) {
          avg.salesToCapital.count += 1;
          avg.salesToCapital.value +=
            (Number(result.data.salesToCapital) - avg.salesToCapital.value) / avg.salesToCapital.count;
        }
      }
    });

    // Update the averages state
    setAverages({
      avgEbitMargin: convRound2Dp(avg.ebitMargin.value),
      avgPeRatio: convRound2Dp(avg.peRatio.value),
      avgSalesToCapital: convRound2Dp(avg.salesToCapital.value),
    });

    triggerReRender(); // Ensure UI updates
  };
  // Run refetch() after mount
  useEffect(() => {
    handleCompAnalysis();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div ref={popoutRef} className="bg-white p-6 rounded-lg shadow-xl w-11/12 h-5/6 overflow-auto">
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
        <MarketInsightTable data={roicRef.current} />

        <div className="mt-16">
          <h3 className="text-xl font-semibold mb-4 text-center">Historical Sales to Capital Ratio</h3>
          <div className="overflow-x-auto rounded-lg shadow">
            {investedCapitalIsFetching || revIsFetching ? (
              <div className="w-full bg-white p-4 rounded-lg">
                <div className="animate-pulse space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-full"></div>
                  <div className="h-8 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ) : (
              <table className="min-w-full bg-white border-collapse mt-6">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-2 px-4 border-b border-r rounded-tl-lg"></th>
                    {historicalSalesToCap.map((item, index) => (
                      <th
                        key={index}
                        className={`py-2 px-4 border-b font-semibold text-sm ${
                          index === historicalSalesToCap.length - 1 ? "rounded-tr-lg" : ""
                        }`}
                      >
                        {item.date}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b border-r font-semibold">Sales To Capital</td>
                    {historicalSalesToCap.map((item, index) => (
                      <td key={index} className="py-2 px-4 border-b text-center font-mono text-sm">
                        {typeof item.salesToCap === "number" && !isNaN(item.salesToCap) ? (
                          <span className="text-emerald-700">
                            {item.salesToCap.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        ) : (
                          <span className="text-red-600">N/A</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  {/* Average Row */}
                  <tr>
                    <td className="py-2 px-4 border-b border-r font-semibold">Average</td>
                    <td
                      colSpan={historicalSalesToCap.length}
                      className="py-2 px-4 border-b text-center font-mono text-sm"
                    >
                      {average !== null ? (
                        <span className="text-emerald-700">
                          {average.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      ) : (
                        <span className="text-red-600">N/A</span>
                      )}
                    </td>
                  </tr>
                  {/* Standard Deviation Row */}
                  <tr>
                    <td className="py-2 px-4 border-b border-r font-semibold rounded-bl-lg">Standard Deviation</td>
                    <td
                      colSpan={historicalSalesToCap.length}
                      className="py-2 px-4 border-b text-center font-mono text-sm rounded-br-lg"
                    >
                      {stdDev !== null ? (
                        <span className="text-emerald-700">
                          {stdDev.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      ) : (
                        <span className="text-red-600">N/A</span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/*Comp Analysis section*/}
        <div className="mt-16">
          <h3 className="text-xl font-semibold text-center text-gray-800 mb-8">Comp Analysis</h3>

          <div className="overflow-hidden shadow-lg rounded-xl border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-left rtl:text-right">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-sm font-medium text-gray-700 uppercase w-32">Ticker</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-700 uppercase">Company</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-700 uppercase">Revenue</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-700 uppercase">EBIT</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-700 uppercase">EBIT Margin</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-700 uppercase">P/E</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-700 uppercase">Sales To Capital</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {compAnalysisRef.current.map((item, index) => (
                  <tr key={`${item.ticker}-${index}`} className="hover:bg-gray-50 transition-colors">
                    {/* Editable Ticker Input */}
                    <td className="px-6 py-4 w-28">
                      <input
                        defaultValue={item.ticker}
                        onChange={(e) => {
                          compAnalysisRef.current[index].ticker = e.target.value;
                        }}
                        className="text-sm font-medium text-gray-800 w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-left"
                        placeholder="Enter ticker"
                      />
                    </td>

                    {/* Non-editable Fields */}
                    <td className="px-6 py-4 text-sm font-medium text-gray-800" text-left>
                      {item.shortName || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 font-mono">
                      {item.revenue ? `$${convToMillion(item.revenue)}` : "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800  font-mono">
                      {item.ebit ? `$${convToMillion(item.ebit)}` : "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800  font-mono">
                      {item.ebitMargin ? `${convRound2Dp(item.ebitMargin)}%` : "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 font-mono">
                      {item.peRatio ? `${convRound2Dp(item.peRatio)}` : "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 font-mono">
                      {item.salesToCapital !== "N/A" ? `${item.salesToCapital}` : "—"}
                    </td>
                  </tr>
                ))}

                {/* Averages Row */}
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800" colSpan={2}>
                    Averages
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 font-mono">—</td>
                  <td className="px-6 py-4 text-sm text-gray-800 font-mono">—</td>
                  <td className="px-6 py-4 text-sm text-gray-800 font-mono">
                    {averages.avgEbitMargin !== "N/A" ? averages.avgEbitMargin : "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 font-mono">
                    {averages.avgPeRatio !== "N/A" ? averages.avgPeRatio : "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 font-mono">
                    {averages.avgSalesToCapital !== "N/A" ? averages.avgSalesToCapital : "-"}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Add New Row Button */}
            <div className="p-4 border-t">
              <button
                onClick={() => {
                  compAnalysisRef.current.push({
                    ticker: "",
                    shortName: "",
                    revenue: 0,
                    ebit: 0,
                    ebitMargin: 0,
                    peRatio: 0,
                    salesToCapital: "N/A",
                  });
                  triggerReRender(); // Force re-render
                }}
                className="flex items-center gap-2 transition-colors text-blue-600 hover:text-blue-800"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clipRule="evenodd"
                  />
                </svg>
                Add New Company
              </button>
            </div>
          </div>
          <div className="flex justify-center my-5">
            <button
              disabled={isFetchingCompAnalysis}
              className="bg-blue-500 px-4 py-2 text-white rounded-lg hover:bg-blue-600 transition-colors min-w-[100px] flex items-center justify-center"
              onClick={() => handleCompAnalysis()}
            >
              {isFetchingCompAnalysis ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                <div className="flex items-center">
                  <CiSearch className="w-4 h-4 dark:text-gray-100 mr-2" />
                  Search
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MarketInsightPopoutPage;
