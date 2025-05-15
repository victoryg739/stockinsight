"use client";

import React, { useRef, useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import * as conv from "../../utils/helper";
import { fetchYahooAnnualIncomeStatement, fetchYahooAnnualBalanceSheet } from "../../utils/queryAPIFunctions";
import * as queryFn from "../../utils/queryAPIFunctions";
import { AiOutlineStock } from "react-icons/ai";
import { TbAlpha } from "react-icons/tb";
import StockLogo from "../StockLogo";

interface FundamentalDataPopoutPageProps {
  setIsPopoutOpen: (isOpen: boolean) => void;
  symbol: string;
  stockInfo: any[];
}

// Fields to exclude from display
const EXCLUDED_FIELDS = ["date"];

// Income statement specific fields to exclude
const EXCLUDED_INCOME_FIELDS = [
  // Redundant net income variations
  "Net Income Common Stockholders",
  "Net Income Continuous Operations",
  "Net Income From Continuing And Discontinued Operation",
  "Net Income From Continuing Operation Net Minority Interest",
  "Net Income Including Noncontrolling Interests",
  "Normalized EBITDA",
  "Normalized Income",
  // Share count fields
  "Basic Average Shares",
  "Diluted Average Shares",
  "Diluted NI Availto Com Stockholders",
  // Redundant operating income
  "Total Operating Income As Reported",
  "Operating Revenue",
  // Tax calculation fields
  "Tax Rate For Calcs",
  "Tax Effect Of Unusual Items",
  // Redundant interest fields
  "Interest Income Non Operating",
  "Interest Expense Non Operating",
  "Net Interest Income",
  "Net Non Operating Interest Income Expense",
  // Other redundant fields
  "Total Expenses",
  "Cost Of Revenue", // Keep only Reconciled Cost Of Revenue
];

// Balance sheet specific fields to exclude
const EXCLUDED_BALANCE_FIELDS = [
  "Cash Equivalents",
  "Cash Financial",
  "Share Issued",
  "Ordinary Shares Number",
  "Capital Lease Obligations",
  "Capital Stock",
  // Additional clutter fields
  "Available For Sale Securities", // Redundant with Long-term Investments
  "Payables And Accrued Expenses", // Redundant with Accounts Payable
  "Other Equity Adjustments", // Redundant with other comprehensive income
  "Current Deferred Liabilities", // Redundant with Current Deferred Revenue
  "Gross PPE", // Keep only Net PPE
  "Accumulated Depreciation", // Keep only Net PPE
  "Payables", // Redundant with Accounts Payable
  "Investments And Advances", // Redundant with Long-term Investments
  "Other Current Borrowings", // Too specific
  "Total Tax Payable", // Redundant with Income Tax Payable
  "Current Debt And Capital Lease Obligation", // Keep just Current Debt
  "Long Term Debt And Capital Lease Obligation", // Keep just Long Term Debt
  "Non Current Deferred Assets", // Keep only Deferred Tax Assets
  "Tangible Book Value", // Not commonly shown
  "Net Tangible Assets", // Not commonly shown
  "Total Capitalization", // Not needed
  "Invested Capital", // Not needed
  "Working Capital", // Can be calculated
  "Treasury Shares Number", // Too detailed
  "Land And Improvements", // Too detailed
  "Machinery Furniture Equipment", // Too detailed
  "Other Properties", // Too detailed
  "Leases", // Too detailed
  "Properties", // Too detailed
  "Commercial Paper", // Can keep under short-term debt
  "Tradeand Other Payables Non Current", // Too specific
  // New exclusions for other stocks
  "Accrued Interest Receivable", // Too specific
  "Buildings And Improvements", // Keep Net PPE instead
  "Common Stock Equity", // Redundant with Stockholders Equity
  "Construction In Progress", // Too specific
  "Current Accrued Expenses", // Redundant with Other Current Liabilities
  "Due from Related Parties Current", // Too specific
  "Due to Related Parties Current", // Too specific
  "Foreign Currency Translation Adjustments", // Very specific
  "Other Equity Interest", // Redundant
  "Other Payable", // Redundant with Accounts Payable
  "Preferred Securities Outside Stock Equity", // Rare
  "Prepaid Assets",
];

// Fields that should be displayed as percentages
const PERCENTAGE_FIELDS = ["operatingIncomeRatio", "grossProfitRatio"];

// Fields that should be bolded in Income Statement
const BOLD_INCOME_FIELDS = [
  "Total Revenue",
  "Gross Profit",
  "Operating Income",
  "EBIT",
  "Pretax Income",
  "Net Income",
  "Basic EPS",
  "Diluted EPS",
];

// Fields that should be bolded in Balance Sheet
const BOLD_BALANCE_FIELDS = [
  // Section Headers and Subtotals
  "Current Assets",
  "Total Non Current Assets",
  "Total Assets",
  "Current Liabilities",
  "Total Non Current Liabilities Net Minority Interest",
  "Total Liabilities Net Minority Interest",
  "Total Equity Gross Minority Interest",
  "Stockholders Equity",
  // Key Metrics
  "Total Debt",
  "Net Debt",
];

// Required fields for data completeness check
const REQUIRED_INCOME_FIELDS = ["Total Revenue", "Gross Profit", "Operating Income", "Net Income"];
const REQUIRED_BALANCE_FIELDS = ["Total Assets", "Total Liabilities Net Minority Interest", "Stockholders Equity"];

const FundamentalDataPopoutPage: React.FC<FundamentalDataPopoutPageProps> = ({
  setIsPopoutOpen,
  symbol,
  stockInfo,
}) => {
  const popoutRef = useRef<HTMLDivElement>(null);
  const shortName = stockInfo.find((el: any) => el.id === "shortName")?.value || symbol;
  const [activeTab, setActiveTab] = useState<"income" | "balance">("income");
  const [historicalSalesToCap, setHistoricalSalesToCap] = useState<{ date: string; salesToCap: number | string }[]>([]);

  // Fetch income statement data from Yahoo Finance
  const {
    data: incomeStatementData,
    isLoading: incomeLoading,
    error: incomeError,
  } = useQuery({
    queryKey: ["yahooAnnualIncomeStatement", symbol],
    queryFn: async () => {
      return await fetchYahooAnnualIncomeStatement(symbol);
    },
    enabled: !!symbol,
  });

  // Fetch balance sheet data from Yahoo Finance
  const {
    data: balanceSheetData,
    isLoading: balanceLoading,
    error: balanceError,
  } = useQuery({
    queryKey: ["yahooAnnualBalanceSheet", symbol],
    queryFn: async () => {
      return await fetchYahooAnnualBalanceSheet(symbol);
    },
    enabled: !!symbol,
  });

  // Fetch historical revenue data
  const { data: revQuery, isFetching: revIsFetching } = useQuery({
    queryKey: ["historicalRevenue", symbol],
    queryFn: async () => await queryFn.fetchDCFHistoricalRev(symbol),
    enabled: !!symbol,
  });

  // Fetch historical invested capital data
  const { data: investedCapitalQuery, isFetching: investedCapitalIsFetching } = useQuery({
    queryKey: ["historicalInvestedCapital", symbol],
    queryFn: async () => await queryFn.fetchDCFHistoricalInvestedCap(symbol),
    enabled: !!symbol,
  });

  // Calculate historical sales to capital ratios
  useEffect(() => {
    if (revQuery && investedCapitalQuery) {
      const updatedSalesToCap = [];
      for (let a = 0; a < revQuery.length; a++) {
        for (let b = 0; b < investedCapitalQuery.length; b++) {
          //same date
          if (revQuery[a].date === investedCapitalQuery[b].date) {
            const curSalesToCap = revQuery[a].revenue / investedCapitalQuery[b].investedCapital;
            updatedSalesToCap.push({ date: revQuery[a].date, salesToCap: curSalesToCap });
          }
        }
      }
      // Sort by date in descending order (latest first)
      updatedSalesToCap.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setHistoricalSalesToCap(updatedSalesToCap);
    }
  }, [revQuery, investedCapitalQuery]);

  // Calculate statistics for sales to capital
  const validSalesToCap = historicalSalesToCap
    .map((item) => item.salesToCap)
    .filter((value) => typeof value === "number" && !isNaN(value)) as number[];

  const average =
    validSalesToCap.length > 0 ? validSalesToCap.reduce((sum, val) => sum + val, 0) / validSalesToCap.length : null;

  const stdDev =
    validSalesToCap.length > 0 && average !== null
      ? Math.sqrt(validSalesToCap.reduce((sum, val) => sum + Math.pow(val - average, 2), 0) / validSalesToCap.length)
      : null;

  // Check if a year has complete data for required fields
  const isYearComplete = (yearData: any, requiredFields: string[]) => {
    if (!yearData || !yearData.values) return false;

    for (const field of requiredFields) {
      const value = yearData.values[field];
      if (value === null || value === undefined || value === "N/A") {
        return false;
      }
    }
    return true;
  };

  // Get common years between income statement and balance sheet with complete data
  const getCommonYears = () => {
    if (!incomeStatementData || !balanceSheetData) return [];

    // Filter income statement data to only include years with complete data
    const completeIncomeData = incomeStatementData.filter((item: any) => isYearComplete(item, REQUIRED_INCOME_FIELDS));

    // Filter balance sheet data to only include years with complete data
    const completeBalanceData = balanceSheetData.filter((item: any) => isYearComplete(item, REQUIRED_BALANCE_FIELDS));

    // Get years from complete data
    const incomeYears = completeIncomeData.map((item: any) => new Date(item.date).getFullYear());
    const balanceYears = completeBalanceData.map((item: any) => new Date(item.date).getFullYear());

    // Find common years
    const commonYears = incomeYears.filter((year: number) => balanceYears.includes(year));

    // Sort in descending order
    return commonYears.sort((a: number, b: number) => b - a);
  };

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

    const commonYears = getCommonYears();

    const metrics = commonYears
      .map((year: number) => {
        // Find data for this specific year
        const income = incomeStatementData.find((item: any) => new Date(item.date).getFullYear() === year);
        const balance = balanceSheetData.find((item: any) => new Date(item.date).getFullYear() === year);

        if (!income || !balance) return null;

        const incomeValues = income.values;
        const balanceValues = balance.values;

        // Calculate Net Debt to EBITDA
        const netDebt =
          balanceValues["Net Debt"] || balanceValues["Total Debt"] - balanceValues["Cash And Cash Equivalents"];
        const ebitda = incomeValues["EBITDA"];
        const netDebtToEBITDA = ebitda !== 0 ? netDebt / ebitda : null;

        // Calculate Return on Invested Capital (ROIC)
        const operatingIncome = incomeValues["Operating Income"];
        const taxProvision = incomeValues["Tax Provision"];
        const pretaxIncome = incomeValues["Pretax Income"];
        const taxRate = pretaxIncome !== 0 ? taxProvision / pretaxIncome : 0;
        const nopat = operatingIncome * (1 - taxRate);

        const totalEquity =
          balanceValues["Stockholders Equity"] || balanceValues["Total Equity Gross Minority Interest"];
        const totalDebt = balanceValues["Total Debt"];
        const cash = balanceValues["Cash And Cash Equivalents"];
        const investedCapital = totalEquity + totalDebt - cash;

        const roic = investedCapital !== 0 ? nopat / investedCapital : null;

        // Calculate Return on Equity (ROE)
        const netIncome = incomeValues["Net Income"];
        const roe = totalEquity !== 0 ? netIncome / totalEquity : null;

        // Calculate Debt to Equity
        const debtToEquity = totalEquity !== 0 ? totalDebt / totalEquity : null;

        return {
          year,
          netDebtToEBITDA,
          roic,
          roe,
          debtToEquity,
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
    // Map specific field names to cleaner display names
    const fieldNameMapping: { [key: string]: string } = {
      // Balance Sheet Mappings
      "Total Non Current Liabilities Net Minority Interest": "Total Non Current Liabilities",
      "Total Liabilities Net Minority Interest": "Total Liabilities",
      "Total Equity Gross Minority Interest": "Total Equity",
      "Cash Cash Equivalents And Short Term Investments": "Cash and Short-term Investments",
      "Other Short Term Investments": "Short-term Investments",
      "Net PPE": "Property, Plant & Equipment (Net)",
      "Investmentin Financial Assets": "Long-term Investments",
      "Non Current Deferred Taxes Assets": "Deferred Tax Assets",
      "Accounts Payable": "Accounts Payable",
      "Current Debt": "Short-term Debt",
      "Long Term Debt": "Long-term Debt",
      "Current Deferred Revenue": "Deferred Revenue (Current)",
      "Income Tax Payable": "Income Taxes Payable",
      "Gains Losses Not Affecting Retained Earnings": "Accumulated Other Comprehensive Income (Loss)",
      "Total Non Current Assets": "Non-Current Assets",
      "Current Assets": "Current Assets",
      "Current Liabilities": "Current Liabilities",
      "Total Assets": "Assets",
      "Total Liabilities": "Liabilities",
      "Total Equity": "Equity",
      "Stockholders Equity": "Stockholders' Equity",
      // New field mappings
      "Additional Paid In Capital": "Additional Paid-In Capital",
      Goodwill: "Goodwill",
      "Other Intangible Assets": "Other Intangible Assets",
      "Goodwill And Other Intangible Assets": "Goodwill and Intangible Assets",
      "Long Term Equity Investment": "Long-term Equity Investments",
      "Minority Interest": "Minority Interest",
      "Non Current Deferred Revenue": "Deferred Revenue (Non-Current)",
      "Non Current Deferred Taxes Liabilities": "Deferred Tax Liabilities",
      "Non Current Prepaid Assets": "Prepaid Assets (Non-Current)",
      "Prepaid Expenses": "Prepaid Expenses",
      "Current Deferred Assets": "Deferred Assets (Current)",
      "Restricted Cash": "Restricted Cash",
      "Taxes Receivable": "Taxes Receivable",
      "Non Current Deferred Liabilities": "Deferred Liabilities (Non-Current)",
      // Income Statement Mappings
      "Total Revenue": "Revenue",
      "Reconciled Cost Of Revenue": "Cost of Revenue",
      "Gross Profit": "Gross Profit",
      "Selling General And Administration": "Selling, General and Administrative Expenses",
      "Research And Development": "Research and Development Expenses",
      "Reconciled Depreciation": "Depreciation and Amortization",
      EBIT: "EBIT",
      "Other Income Expense": "Other Income/Expenses (Net)",
      "Other Non Operating Income Expenses": "Other Non-Operating Income/Expenses",
      "Operating Expense": "Operating Expenses",
      "Pretax Income": "Earnings Before Taxes (EBT)",
      "Tax Provision": "Income Tax Expense",
      "Basic EPS": "Earnings per Share (Basic)",
      "Diluted EPS": "Earnings per Share (Diluted)",
      EBITDA: "EBITDA",
    };

    if (fieldNameMapping[field]) {
      return fieldNameMapping[field];
    }

    // Default formatting for fields not in mapping
    return field
      .split(/[\s_]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
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

  // Transform Yahoo Finance data to table format
  const transformDataToTableFormat = (data: any[], isBalanceSheet: boolean = false) => {
    if (!data || data.length === 0) return { years: [], fields: [], data: [] };

    const commonYears = getCommonYears();

    // Filter data to only include common years with complete data
    const filteredData = data.filter((item: any) => {
      const year = new Date(item.date).getFullYear();
      if (!commonYears.includes(year)) return false;

      // Check if this year has complete data for required fields
      const requiredFields = isBalanceSheet ? REQUIRED_BALANCE_FIELDS : REQUIRED_INCOME_FIELDS;
      return isYearComplete(item, requiredFields);
    });

    // Sort filtered data by date in descending order
    const sortedData = filteredData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Get all unique fields from all years
    const allFields = new Set<string>();
    sortedData.forEach((item) => {
      Object.keys(item.values).forEach((field) => {
        if (
          !EXCLUDED_FIELDS.includes(field) &&
          (!isBalanceSheet || !EXCLUDED_BALANCE_FIELDS.includes(field)) &&
          (isBalanceSheet || !EXCLUDED_INCOME_FIELDS.includes(field))
        ) {
          allFields.add(field);
        }
      });
    });

    // Convert to array and sort fields
    const fields = Array.from(allFields).sort((a, b) => {
      // Additional ordering for specific fields
      const fieldOrder = isBalanceSheet
        ? [
            // Current Assets Section
            "Current Assets", // Section header
            "Cash And Cash Equivalents",
            "Restricted Cash",
            "Other Short Term Investments",
            "Cash Cash Equivalents And Short Term Investments",
            "Receivables",
            "Accounts Receivable",
            "Taxes Receivable",
            "Other Receivables",
            "Inventory",
            "Prepaid Expenses",
            "Current Deferred Assets",
            "Other Current Assets",

            // Non-Current Assets Section
            "Total Non Current Assets", // Section header
            "Net PPE",
            "Goodwill",
            "Other Intangible Assets",
            "Goodwill And Other Intangible Assets",
            "Long Term Equity Investment",
            "Investmentin Financial Assets",
            "Investments And Advances",
            "Non Current Deferred Taxes Assets",
            "Non Current Prepaid Assets",
            "Other Non Current Assets",

            // Total Assets
            "Total Assets",

            // Current Liabilities Section
            "Current Liabilities", // Section header
            "Current Debt",
            "Current Capital Lease Obligation",
            "Accounts Payable",
            "Current Deferred Revenue",
            "Income Tax Payable",
            "Other Current Liabilities",

            // Non-Current Liabilities Section
            "Total Non Current Liabilities Net Minority Interest", // Section header
            "Long Term Debt",
            "Long Term Capital Lease Obligation",
            "Non Current Deferred Revenue",
            "Non Current Deferred Taxes Liabilities",
            "Non Current Deferred Liabilities",
            "Other Non Current Liabilities",

            // Total Liabilities
            "Total Liabilities Net Minority Interest",

            // Equity Section
            "Total Equity Gross Minority Interest", // Section header
            "Common Stock",
            "Additional Paid In Capital",
            "Retained Earnings",
            "Gains Losses Not Affecting Retained Earnings",
            "Stockholders Equity",
            "Minority Interest",

            // Additional Metrics
            "Total Debt",
            "Net Debt",
          ]
        : [
            // Income Statement Order
            "Total Revenue",
            "Reconciled Cost Of Revenue",
            "Gross Profit",
            "Selling General And Administration",
            "Research And Development",
            "Reconciled Depreciation",
            "EBIT",
            "Other Operating Income Expenses",
            "Operating Income",
            "Interest Income",
            "Interest Expense",
            "Other Income Expense",
            "Other Non Operating Income Expenses",
            "Pretax Income",
            "Tax Provision",
            "Net Income",
            "Basic EPS",
            "Diluted EPS",
          ];

      const aIndex = fieldOrder.indexOf(a);
      const bIndex = fieldOrder.indexOf(b);

      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex;
      }
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;

      return a.localeCompare(b);
    });

    return { years: commonYears, fields, data: sortedData };
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

  // Transform data for display
  const incomeTableData = transformDataToTableFormat(incomeStatementData, false);
  const balanceTableData = transformDataToTableFormat(balanceSheetData, true);
  const keyMetrics = calculateKeyMetrics();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div ref={popoutRef} className="bg-white p-6 rounded-lg shadow-xl w-11/12 h-[95vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <StockLogo symbol={symbol} height={50} width={50} className="mr-2" alt="logo" />

            <h2 className="text-2xl font-bold">Fundamental Data - {shortName}</h2>
          </div>
          <button onClick={() => setIsPopoutOpen(false)} className="text-gray-500 hover:text-gray-700">
            <RxCross1 size={24} />
          </button>
        </div>

        {/* External Resources Buttons Section */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 mb-3">View additional insights on external platforms:</p>
          <div className="flex gap-4">
            <button
              onClick={() => window.open("https://app.stocksentinel.ai/", "_blank", "noopener,noreferrer")}
              className="flex items-center bg-blue-600 text-white px-4 py-2.5 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
            >
              <AiOutlineStock className="mr-2 text-lg" />
              Stock Sentinel
            </button>
            <button
              onClick={() =>
                window.open(
                  `https://www.alphaspread.com/security/nasdaq/${symbol}/analyst-estimates`,
                  "_blank",
                  "noopener,noreferrer"
                )
              }
              className="flex items-center bg-indigo-600 text-white px-4 py-2.5 rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium shadow-sm"
            >
              <TbAlpha className="mr-2 text-lg" />
              Alpha Spread
            </button>
          </div>
        </div>

        {/* Note about data alignment */}
        {incomeStatementData && balanceSheetData && getCommonYears().length === 0 && (
          <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-sm text-yellow-800">
              No complete years found between income statement and balance sheet data. Some years may have been excluded
              due to missing key financial data.
            </p>
          </div>
        )}

        {/* Tabs Container */}
        <div className="mb-16">
          {/* Tab Headers */}
          <div className="flex border-b border-gray-200">
            <button
              className={`px-6 py-3 font-medium text-sm transition-colors duration-200 ${
                activeTab === "income"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              onClick={() => setActiveTab("income")}
            >
              Income Statement
            </button>
            <button
              className={`px-6 py-3 font-medium text-sm transition-colors duration-200 ${
                activeTab === "balance"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              onClick={() => setActiveTab("balance")}
            >
              Balance Sheet
            </button>
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {/* Income Statement Tab */}
            {activeTab === "income" && incomeTableData.fields.length > 0 && (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r">
                        Item
                      </th>
                      {incomeTableData.years.map((year: number) => (
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
                    {incomeTableData.fields.map((field: string, index: number) => (
                      <tr key={field} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td
                          className={`px-4 py-3 text-sm ${
                            shouldBeBold(field, false) ? "font-bold" : "font-medium pl-8"
                          } text-gray-900 border-r`}
                        >
                          {formatFieldName(field)}
                        </td>
                        {incomeTableData.data.map((yearData: any, yearIndex: number) => (
                          <td
                            key={yearIndex}
                            className={`px-4 py-3 text-sm ${
                              shouldBeBold(field, false) ? "font-bold" : ""
                            } text-gray-600 text-right`}
                          >
                            {formatValue(field, yearData.values[field])}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Balance Sheet Tab */}
            {activeTab === "balance" && balanceTableData.fields.length > 0 && (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r">
                        Item
                      </th>
                      {balanceTableData.years.map((year: number) => (
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
                    {balanceTableData.fields.map((field: string, index: number) => (
                      <tr key={field} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td
                          className={`px-4 py-3 text-sm ${
                            shouldBeBold(field, true) ? "font-bold" : "font-medium pl-8"
                          } text-gray-900 border-r`}
                        >
                          {formatFieldName(field)}
                        </td>
                        {balanceTableData.data.map((yearData: any, yearIndex: number) => (
                          <td
                            key={yearIndex}
                            className={`px-4 py-3 text-sm ${
                              shouldBeBold(field, true) ? "font-bold" : ""
                            } text-gray-600 text-right`}
                          >
                            {formatValue(field, yearData.values[field])}
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

        {/* Historical Sales to Capital Ratio Section */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Historical Sales to Capital Ratio</h3>
          <div className="overflow-x-auto">
            {investedCapitalIsFetching || revIsFetching ? (
              <div className="w-full bg-white p-4 rounded-lg">
                <div className="animate-pulse space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-full"></div>
                  <div className="h-8 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ) : (
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r"></th>
                    {historicalSalesToCap.map((item, index) => (
                      <th
                        key={index}
                        className={`py-3 px-4 text-right text-xs font-medium text-gray-700 uppercase tracking-wider ${
                          index === historicalSalesToCap.length - 1 ? "" : ""
                        }`}
                      >
                        {item.date}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-white">
                    <td className="py-3 px-4 text-sm font-bold text-gray-900 border-r">Sales to Capital</td>
                    {historicalSalesToCap.map((item, index) => (
                      <td key={index} className="py-3 px-4 text-sm text-gray-600 text-right">
                        {typeof item.salesToCap === "number" && !isNaN(item.salesToCap) ? (
                          <span className="font-medium">{item.salesToCap.toFixed(2)}</span>
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  {/* Average Row */}
                  <tr className="bg-gray-50">
                    <td className="py-3 px-4 text-sm font-bold text-gray-900 border-r">Average</td>
                    <td colSpan={historicalSalesToCap.length} className="py-3 px-4 text-sm text-center">
                      {average !== null ? (
                        <span className="font-medium">{average.toFixed(2)}</span>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                  </tr>
                  {/* Standard Deviation Row */}
                  <tr className="bg-white">
                    <td className="py-3 px-4 text-sm font-bold text-gray-900 border-r">Standard Deviation</td>
                    <td colSpan={historicalSalesToCap.length} className="py-3 px-4 text-sm text-center">
                      {stdDev !== null ? (
                        <span className="font-medium">{stdDev.toFixed(2)}</span>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Key Financial Ratios Section*/}
        <div className="">
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
                    <td className="px-4 py-3 text-sm font-bold text-gray-900 border-r">
                      Return on Invested Capital (ROIC)
                    </td>
                    {keyMetrics.map((metric: any, index: number) => (
                      <td key={index} className="px-4 py-3 text-sm text-gray-600 text-right">
                        {formatMetricValue(metric.roic, true)}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm font-bold text-gray-900 border-r">Return on Equity (ROE)</td>
                    {keyMetrics.map((metric: any, index: number) => (
                      <td key={index} className="px-4 py-3 text-sm text-gray-600 text-right">
                        {formatMetricValue(metric.roe, true)}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 text-sm font-bold text-gray-900 border-r">Debt to Equity</td>
                    {keyMetrics.map((metric: any, index: number) => (
                      <td key={index} className="px-4 py-3 text-sm text-gray-600 text-right">
                        {formatMetricValue(metric.debtToEquity, false)}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm font-bold text-gray-900 border-r">Net Debt to EBITDA</td>
                    {keyMetrics.map((metric: any, index: number) => (
                      <td key={index} className="px-4 py-3 text-sm text-gray-600 text-right">
                        {formatMetricValue(metric.netDebtToEBITDA, false)}
                      </td>
                    ))}
                  </tr>
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
