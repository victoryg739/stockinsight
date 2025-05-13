"use client";

import React, { useRef, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import * as conv from "../../utils/helper";
import axios from "axios";

interface FundamentalDataPopoutPageProps {
  setIsPopoutOpen: (isOpen: boolean) => void;
  symbol: string;
  stockInfo: any[];
}

// Fields to exclude from display
const EXCLUDED_FIELDS = [
  "symbol",
  "reportedCurrency",
  "cik",
  "date",
  "acceptedDate",
  "fillingDate",
  "period",
  "calendarYear",
  "link",
  "finalLink",
  "grossProfitRatio",
  "netIncomeRatio",
  "ebitdaratio",
  "weightedAverageShsOut",
  "weightedAverageShsOutDil",
];

// Fields that should be displayed as percentages
const PERCENTAGE_FIELDS = ["operatingIncomeRatio"];

// Fields that should be bolded in Income Statement
const BOLD_INCOME_FIELDS = ["revenue", "grossProfit", "operatingIncome", "netIncome"];

// Fields that should be bolded in Balance Sheet
const BOLD_BALANCE_FIELDS = [
  "cashAndShortTermInvestments",
  "totalCurrentAssets",
  "totalAssets",
  "totalCurrentLiabilities",
  "totalLiabilities",
  "totalStockholdersEquity",
  "totalDebt",
  "netDebt",
];

const FundamentalDataPopoutPage: React.FC<FundamentalDataPopoutPageProps> = ({
  setIsPopoutOpen,
  symbol,
  stockInfo,
}) => {
  const popoutRef = useRef<HTMLDivElement>(null);
  const shortName = stockInfo.find((el: any) => el.id === "shortName")?.value || symbol;

  // Fetch income statement data
  const {
    data: incomeStatementData,
    isLoading: incomeLoading,
    error: incomeError,
  } = useQuery({
    queryKey: ["fmpIncomeStatement", symbol],
    queryFn: async () => {
      const { data } = await axios.get(`/api/fmp/income-statement?symbol=${symbol}`);
      return data;
    },
    enabled: !!symbol,
  });

  // Fetch balance sheet data
  const {
    data: balanceSheetData,
    isLoading: balanceLoading,
    error: balanceError,
  } = useQuery({
    queryKey: ["fmpBalanceSheet", symbol],
    queryFn: async () => {
      const { data } = await axios.get(`/api/fmp/balance-sheet?symbol=${symbol}`);
      return data;
    },
    enabled: !!symbol,
  });

  // Calculate key metrics from financial statements
  const calculateKeyMetrics = () => {
    if (
      !incomeStatementData ||
      !balanceSheetData ||
      incomeStatementData.length === 0 ||
      balanceSheetData.length === 0
    ) {
      return null;
    }

    const metrics = incomeStatementData
      .map((income: any, index: number) => {
        const balance = balanceSheetData[index];
        if (!balance) return null;

        // Calculate Net Debt to EBITDA
        const netDebt = balance.netDebt || balance.totalDebt - balance.cashAndShortTermInvestments;
        const ebitda = income.ebitda;
        const netDebtToEBITDA = ebitda !== 0 ? netDebt / ebitda : null;

        // Calculate Return on Invested Capital (ROIC)
        const operatingIncome = income.operatingIncome;
        const taxRate = income.incomeTaxExpense / income.incomeBeforeTax;
        const nopat = operatingIncome * (1 - taxRate);
        const investedCapital =
          balance.totalStockholdersEquity + balance.totalDebt - balance.cashAndShortTermInvestments;
        const roic = investedCapital !== 0 ? nopat / investedCapital : null;

        // Calculate Return on Equity (ROE)
        const netIncome = income.netIncome;
        const totalEquity = balance.totalStockholdersEquity;
        const roe = totalEquity !== 0 ? netIncome / totalEquity : null;

        // Calculate Debt to Equity
        const totalDebt = balance.totalDebt;
        const debtToEquity = totalEquity !== 0 ? totalDebt / totalEquity : null;

        return {
          year: new Date(income.date).getFullYear(),
          netDebtToEBITDA,
          roic,
          roe,
          debtToEquity,
          // Note: FCF Yield requires market cap and cash flow data which we don't have here
        };
      })
      .filter(Boolean);

    return metrics;
  };

  // Close when clicking outside
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

  // Format field names for display
  const formatFieldName = (field: string): string => {
    // Special cases for specific fields
    if (field === "operatingIncomeRatio") {
      return "Operating Margin";
    }

    if (field === "ebitda") {
      return "EBITDA";
    }
    if (field === "epsdiluted") {
      return "EPS Diluted";
    }
    if (field === "eps") {
      return "EPS";
    }

    return field
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  // Format values for display
  const formatValue = (key: string, value: any): string => {
    if (value === null || value === undefined) return "N/A";

    if (PERCENTAGE_FIELDS.includes(key)) {
      return `${conv.convDecimalToPercentage(value)}%`;
    }

    if (typeof value === "number") {
      // For large numbers, convert to millions
      if (Math.abs(value) >= 1000000) {
        return `$${conv.convToMillion(value)}`;
      }
      return conv.convRound2Dp(value);
    }

    return String(value);
  };

  // Format metric values
  const formatMetricValue = (value: any, isPercentage: boolean): string => {
    if (value === null || value === undefined) return "N/A";

    if (isPercentage) {
      return `${(value * 100).toFixed(2)}%`;
    }

    return conv.convRound2Dp(value);
  };

  // Check if a field should be bolded
  const shouldBeBold = (key: string, isBalanceSheet: boolean): boolean => {
    if (isBalanceSheet) {
      return BOLD_BALANCE_FIELDS.includes(key);
    }
    return BOLD_INCOME_FIELDS.includes(key);
  };

  // Loading state
  if (incomeLoading || balanceLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div
          ref={popoutRef}
          className="bg-white p-6 rounded-lg shadow-xl w-11/12 lg:w-4/5 xl:w-3/4 h-5/6 overflow-auto"
        >
          <div className="flex justify-center items-center h-full">
            <svg
              className="animate-spin h-10 w-10 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (incomeError || balanceError) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div
          ref={popoutRef}
          className="bg-white p-6 rounded-lg shadow-xl w-11/12 lg:w-4/5 xl:w-3/4 h-5/6 overflow-auto"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Error Loading Data</h2>
            <button onClick={() => setIsPopoutOpen(false)} className="text-gray-500 hover:text-gray-700">
              <RxCross1 size={24} />
            </button>
          </div>
          <div className="text-red-600 text-center mt-10">Failed to load financial data. Please try again later.</div>
        </div>
      </div>
    );
  }

  // Extract years from income statement data
  const years = incomeStatementData?.map((item: any) => new Date(item.date).getFullYear()) || [];
  const keyMetrics = calculateKeyMetrics();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div ref={popoutRef} className="bg-white p-6 rounded-lg shadow-xl w-11/12 h-[95vh] overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Image
              src={`https://img.logo.dev/ticker/${symbol}?token=${process.env.NEXT_PUBLIC_LOGODEV}&retina=true`}
              alt="logo"
              height={40}
              width={40}
              className="mr-2"
            />
            <h2 className="text-2xl font-bold">Fundamental Data - {shortName}</h2>
          </div>
          <button onClick={() => setIsPopoutOpen(false)} className="text-gray-500 hover:text-gray-700">
            <RxCross1 size={24} />
          </button>
        </div>

        {/* Key Financial Ratios Section */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Key Financial Ratios</h3>
          {keyMetrics && keyMetrics.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r">
                      Metric
                    </th>
                    {keyMetrics.map((metric: any) => (
                      <th
                        key={metric.year}
                        className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider"
                      >
                        {metric.year}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-white">
                    <td className="px-4 py-3 text-sm font-bold text-gray-900 border-r">Net Debt to EBITDA</td>
                    {keyMetrics.map((metric: any, index: number) => (
                      <td key={index} className="px-4 py-3 text-sm text-gray-600 text-right">
                        {formatMetricValue(metric.netDebtToEBITDA, false)}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm font-bold text-gray-900 border-r">
                      Return on Invested Capital (ROIC)
                    </td>
                    {keyMetrics.map((metric: any, index: number) => (
                      <td key={index} className="px-4 py-3 text-sm text-gray-600 text-right">
                        {formatMetricValue(metric.roic, true)}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 text-sm font-bold text-gray-900 border-r">Return on Equity (ROE)</td>
                    {keyMetrics.map((metric: any, index: number) => (
                      <td key={index} className="px-4 py-3 text-sm text-gray-600 text-right">
                        {formatMetricValue(metric.roe, true)}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm font-bold text-gray-900 border-r">Debt to Equity</td>
                    {keyMetrics.map((metric: any, index: number) => (
                      <td key={index} className="px-4 py-3 text-sm text-gray-600 text-right">
                        {formatMetricValue(metric.debtToEquity, false)}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          <div className="mt-2 text-sm text-gray-500 italic">
            Note: Free Cash Flow Yield requires cash flow statement data which is not available in current view.
          </div>
        </div>

        {/* Income Statement Section */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Income Statement</h3>
          {incomeStatementData && incomeStatementData.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r">
                      Item
                    </th>
                    {years.map((year: number) => (
                      <th
                        key={year}
                        className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider"
                      >
                        {year}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {Object.keys(incomeStatementData[0])
                    .filter((key) => !EXCLUDED_FIELDS.includes(key))
                    .map((key, index) => (
                      <tr key={key} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td
                          className={`px-4 py-3 text-sm ${
                            shouldBeBold(key, false) ? "font-bold" : "font-medium"
                          } text-gray-900 border-r`}
                        >
                          {formatFieldName(key)}
                        </td>
                        {incomeStatementData.map((yearData: any, yearIndex: number) => (
                          <td
                            key={yearIndex}
                            className={`px-4 py-3 text-sm ${
                              shouldBeBold(key, false) ? "font-bold" : ""
                            } text-gray-600 text-right`}
                          >
                            {formatValue(key, yearData[key])}
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Balance Sheet Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Balance Sheet</h3>
          {balanceSheetData && balanceSheetData.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r">
                      Item
                    </th>
                    {years.map((year: number) => (
                      <th
                        key={year}
                        className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider"
                      >
                        {year}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {Object.keys(balanceSheetData[0])
                    .filter((key) => !EXCLUDED_FIELDS.includes(key))
                    .map((key, index) => (
                      <tr key={key} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td
                          className={`px-4 py-3 text-sm ${
                            shouldBeBold(key, true) ? "font-bold" : "font-medium"
                          } text-gray-900 border-r`}
                        >
                          {formatFieldName(key)}
                        </td>
                        {balanceSheetData.map((yearData: any, yearIndex: number) => (
                          <td
                            key={yearIndex}
                            className={`px-4 py-3 text-sm ${
                              shouldBeBold(key, true) ? "font-bold" : ""
                            } text-gray-600 text-right`}
                          >
                            {formatValue(key, yearData[key])}
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FundamentalDataPopoutPage;
