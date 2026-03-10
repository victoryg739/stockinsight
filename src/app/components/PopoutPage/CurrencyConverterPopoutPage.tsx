"use client";

import React, { useState, useRef, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import Image from "next/image";
import * as conv from "../../utils/helper";
import { MdCurrencyExchange } from "react-icons/md";
import StockLogo from "../StockLogo";
// List of available currencies for conversion
const CURRENCIES = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "CAD", name: "Canadian Dollar", symbol: "$" },
  { code: "AUD", name: "Australian Dollar", symbol: "$" },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "$" },
  { code: "SGD", name: "Singapore Dollar", symbol: "$" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
  { code: "MXN", name: "Mexican Peso", symbol: "$" },
  { code: "ZAR", name: "South African Rand", symbol: "R" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr" },
  { code: "DKK", name: "Danish Krone", symbol: "kr" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "$" },
  { code: "RUB", name: "Russian Ruble", symbol: "₽" },
  { code: "KRW", name: "South Korean Won", symbol: "₩" },
  { code: "TWD", name: "Taiwan New Dollar", symbol: "$" },
];

interface CurrencyConverterPopoutPageProps {
  setIsPopoutOpen: (isOpen: boolean) => void;
  symbol: string;
  stockInfo: any[];
  fetchedInputs: any[];
  handleInputChange?: (
    id: string,
    newValue: any,
    type: "inputs" | "fetchedInputs" | "stockInfo",
    isAutoFill?: boolean
  ) => void;
  setCurrencyConverted?: (converted: boolean) => void;
}

// Helper function to convert MM/DD/YYYY to YYYY-MM-DD
function convertDateFormat(dateString: string): string {
  // Handle different date formats
  if (!dateString) return new Date().toISOString().split("T")[0];

  try {
    // If already in YYYY-MM-DD format
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString;
    }

    // For MM/DD/YYYY or DD/MM/YYYY format
    const parts = dateString.split("/");
    if (parts.length === 3) {
      let month, day, year;

      // Check if the first part could be a month (1-12)
      if (parseInt(parts[0]) <= 12) {
        // Assume MM/DD/YYYY
        month = parts[0].padStart(2, "0");
        day = parts[1].padStart(2, "0");
        year = parts[2];
      } else {
        // Assume DD/MM/YYYY
        day = parts[0].padStart(2, "0");
        month = parts[1].padStart(2, "0");
        year = parts[2];
      }

      // Validate the resulting date
      const dateObj = new Date(`${year}-${month}-${day}`);
      if (isNaN(dateObj.getTime())) {
        throw new Error("Invalid date");
      }

      return `${year}-${month}-${day}`;
    }

    // If format doesn't match, try to parse as date
    const dateObj = new Date(dateString);
    if (!isNaN(dateObj.getTime())) {
      return dateObj.toISOString().split("T")[0];
    }

    // As a last resort, return today's date
    return new Date().toISOString().split("T")[0];
  } catch (e) {
    console.error("Date conversion error:", e);
    return new Date().toISOString().split("T")[0];
  }
}

const CurrencyConverterPopoutPage: React.FC<CurrencyConverterPopoutPageProps> = ({
  setIsPopoutOpen,
  symbol,
  stockInfo,
  fetchedInputs,
  handleInputChange,
  setCurrencyConverted,
}) => {
  const popoutRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Get company name and financial currency from stockInfo
  const shortName = stockInfo.find((el) => el.id === "shortName")?.value || symbol;
  const financialCurrency = stockInfo.find((el) => el.id === "currency")?.value || "USD";

  // State to track if conversion has been applied
  const [isConverted, setIsConverted] = useState<boolean>(false);
  const [originalValues, setOriginalValues] = useState<Record<string, number>>({});

  // State for currency conversion settings
  const [sourceCurrency, setSourceCurrency] = useState<string>(financialCurrency);
  const [targetCurrency, setTargetCurrency] = useState<string>("USD");

  // First, get the MRQ date during initialization
  const mrqDate = stockInfo.find((el) => el.id === "mostRecentQuarter")?.value;
  const initialDate =
    mrqDate && typeof mrqDate === "string" && mrqDate.includes("/")
      ? convertDateFormat(mrqDate)
      : mrqDate || new Date().toISOString().split("T")[0];

  // Initialize state with the processed date
  const [conversionDate, setConversionDate] = useState<string>(initialDate);
  const [exchangeRate, setExchangeRate] = useState<number>(1.0);

  // State to track historical rates
  const [historicalRates, setHistoricalRates] = useState<{ date: string; rate: number }[]>([]);
  const [showHistoricalRates, setShowHistoricalRates] = useState<boolean>(false);

  // Financial data to preview conversion - only include the specified fields
  const [previewData, setPreviewData] = useState<{ label: string; id: string; original: number; converted: number }[]>([
    { label: "Base Revenue", id: "baseRevenue", original: 0, converted: 0 },
    { label: "EBIT", id: "calculatedEbit", original: 0, converted: 0 }, // Will calculate from baseRevenue and baseEbitMargin
    { label: "Total Debt", id: "totalDebt", original: 0, converted: 0 },
    { label: "Cash", id: "cash", original: 0, converted: 0 },
    { label: "Total Equity", id: "totalEquity", original: 0, converted: 0 },
    { label: "Minority Interest", id: "minorityInterest", original: 0, converted: 0 },
    { label: "Interest Expense", id: "interestExpense", original: 0, converted: 0 },
  ]);

  // Fetch exchange rate from API
  const fetchExchangeRate = async (from: string, to: string, date: string): Promise<number> => {
    setIsLoading(true);
    setError(null);

    try {
      // Format the API URL with the currency pair and date range
      // We're using a broader date range to ensure we have data surrounding the requested date
      const startDate = new Date(date);
      startDate.setMonth(startDate.getMonth() - 1); // Get data from 1 month before

      const endDate = new Date(date);
      endDate.setMonth(endDate.getMonth() + 1); // Get data up to 1 month after

      const formattedStartDate = startDate.toISOString().split("T")[0];
      const formattedEndDate = endDate.toISOString().split("T")[0];

      // Call your actual API
      const response = await fetch(
        `/api/currency-conversion?source=${from}&target=${to}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();

      if (!data || data.length === 0) {
        throw new Error("No exchange rate data available");
      }

      // Sort the data by date
      const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      // Find the exchange rate closest to the requested date
      const requestedTimestamp = new Date(date).getTime();
      let closestEntry = sortedData[0];
      let closestDistance = Math.abs(new Date(closestEntry.date).getTime() - requestedTimestamp);

      for (const entry of sortedData) {
        const distance = Math.abs(new Date(entry.date).getTime() - requestedTimestamp);
        if (distance < closestDistance) {
          closestEntry = entry;
          closestDistance = distance;
        }
      }

      // Use the Close price as the exchange rate
      const rate = closestEntry.values.Close;

      // For debugging
      console.log(`Found exchange rate for ${from}/${to} on ${closestEntry.date}: ${rate}`);

      return rate;
    } catch (err) {
      console.error("Error fetching exchange rate:", err);
      setError(`Failed to fetch exchange rate: ${err instanceof Error ? err.message : "Unknown error"}`);
      return 1.0; // Default fallback rate
    } finally {
      setIsLoading(false);
    }
  };

  // Load financial data from inputs and store original values
  useEffect(() => {
    if (fetchedInputs && fetchedInputs.length > 0) {
      // Store original values if we haven't already
      if (Object.keys(originalValues).length === 0) {
        const originals: Record<string, number> = {};

        // Store original values for all relevant fields
        previewData.forEach((item) => {
          if (item.id === "calculatedEbit") {
            const baseRevenue = fetchedInputs.find((input) => input.id === "baseRevenue")?.value || 0;
            const baseEbitMargin = fetchedInputs.find((input) => input.id === "baseEbitMargin")?.value || 0;
            originals[item.id] = baseRevenue * (baseEbitMargin / 100);
          } else {
            const input = fetchedInputs.find((input) => input.id === item.id);
            if (input) {
              originals[item.id] = typeof input.value === "string" ? parseFloat(input.value) : input.value;
            }
          }
        });

        setOriginalValues(originals);
      }

      const updatedPreviewData = previewData.map((item) => {
        // Special handling for EBIT which we calculate from baseRevenue and baseEbitMargin
        if (item.id === "calculatedEbit") {
          const baseRevenue = fetchedInputs.find((input) => input.id === "baseRevenue")?.value || 0;
          const baseEbitMargin = fetchedInputs.find((input) => input.id === "baseEbitMargin")?.value || 0;
          const ebitValue = baseRevenue * (baseEbitMargin / 100);

          return {
            ...item,
            original: isConverted ? originalValues[item.id] || ebitValue : ebitValue,
            converted: ebitValue,
          };
        }

        // Normal handling for other items
        const input = fetchedInputs.find((input) => input.id === item.id);
        const value = input ? (typeof input.value === "string" ? parseFloat(input.value) : input.value) : 0;

        return {
          ...item,
          original: isConverted ? originalValues[item.id] || value : value,
          converted: value,
        };
      });

      setPreviewData(updatedPreviewData);
    }
  }, [fetchedInputs, isConverted, originalValues, previewData]);

  // Update conversion preview when exchange rate changes (but only if not already converted)
  useEffect(() => {
    if (!isConverted && fetchedInputs && fetchedInputs.length > 0) {
      setPreviewData((prev) =>
        prev.map((item) => ({
          ...item,
          converted: item.original * exchangeRate,
        }))
      );
    }
  }, [exchangeRate, isConverted, fetchedInputs]);

  // Fetch exchange rate when source/target/date changes
  useEffect(() => {
    const getExchangeRate = async () => {
      if (sourceCurrency === targetCurrency) {
        setExchangeRate(1.0);
        return;
      }

      const rate = await fetchExchangeRate(sourceCurrency, targetCurrency, conversionDate);
      setExchangeRate(rate);
    };

    getExchangeRate();
  }, [sourceCurrency, targetCurrency, conversionDate]);

  // Fetch historical rates for the chart
  useEffect(() => {
    const fetchHistoricalRates = async () => {
      if (sourceCurrency === targetCurrency) return;

      // Generate dates for the last 12 months
      const dates = [];
      const today = new Date();

      for (let i = 0; i < 12; i++) {
        const pastDate = new Date(today);
        pastDate.setMonth(today.getMonth() - i);
        dates.push(pastDate.toISOString().split("T")[0]);
      }

      // Fetch rates for each date
      const rates = [];
      for (const date of dates) {
        const rate = await fetchExchangeRate(sourceCurrency, targetCurrency, date);
        rates.push({ date, rate });
      }

      setHistoricalRates(rates.reverse());
    };

    if (showHistoricalRates) {
      fetchHistoricalRates();
    }
  }, [showHistoricalRates, sourceCurrency, targetCurrency]);

  // Apply the conversion to specified financial data
  const applyConversion = () => {
    if (!handleInputChange) {
      setError("Cannot apply conversion: update function not available");
      return;
    }

    if (isConverted) {
      setError("Conversion has already been applied. Refresh the page to convert again.");
      return;
    }

    // List of IDs to convert
    const idsToConvert = ["baseRevenue", "totalEquity", "totalDebt", "cash", "minorityInterest", "interestExpense"];

    // Update each field in fetchedInputs
    idsToConvert.forEach((id) => {
      const input = fetchedInputs.find((input) => input.id === id);
      if (input) {
        const originalValue = typeof input.value === "string" ? parseFloat(input.value) : input.value;
        const convertedValue = originalValue * exchangeRate;

        // Update the value using the provided handler
        handleInputChange(id, convertedValue, "fetchedInputs", true);
      }
    });

    // Mark as converted
    setIsConverted(true);

    // Notify parent component that conversion has been applied
    if (setCurrencyConverted) {
      setCurrencyConverted(true);
    }

    // Show success message
    setSuccess(`Conversion applied: 1 ${sourceCurrency} = ${exchangeRate.toFixed(4)} ${targetCurrency}`);

    // Hide success message after 3 seconds
    setTimeout(() => {
      setSuccess(null);
    }, 3000);
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div ref={popoutRef} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-11/12 lg:w-3/4 xl:w-2/3 h-5/6 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <StockLogo symbol={symbol} height={50} width={50} className="mr-2" alt="logo" />

            <h2 className="text-2xl font-bold dark:text-white">Currency Converter - {shortName}</h2>
          </div>
          <button onClick={() => setIsPopoutOpen(false)} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            <RxCross1 size={24} />
          </button>
        </div>

        {error && <div className="bg-red-50 border border-red-400 text-red-700 p-4 rounded-md mb-4">{error}</div>}

        {success && (
          <div className="bg-green-50 border border-green-400 text-green-700 p-4 rounded-md mb-4">{success}</div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
          {/* Configuration Panel */}
          <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Conversion Settings</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Financial Statement Currency</label>
              <div className="w-full rounded-md border border-gray-300 dark:border-gray-600 py-2 px-3 bg-gray-100 dark:bg-gray-600 dark:text-gray-200 flex items-center">
                {CURRENCIES.find((c) => c.code === sourceCurrency)?.symbol || ""}
                <span className="ml-2 font-medium">{sourceCurrency}</span>
                <span className="ml-2 text-gray-500">
                  - {CURRENCIES.find((c) => c.code === sourceCurrency)?.name || ""}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Original currency used in financial statements</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Convert To</label>
              <select
                value={targetCurrency}
                onChange={(e) => setTargetCurrency(e.target.value)}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 py-2 px-3"
                disabled={isConverted}
              >
                {CURRENCIES.map((currency) => (
                  <option key={`target_${currency.code}`} value={currency.code}>
                    {currency.code} - {currency.name} ({currency.symbol})
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Conversion Date</label>
              <input
                type="date"
                value={conversionDate}
                onChange={(e) => setConversionDate(e.target.value)}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 py-2 px-3"
                max={new Date().toISOString().split("T")[0]}
                disabled={isConverted}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Exchange rate as of this date will be used</p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-4 border dark:border-gray-600 rounded-md mb-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <MdCurrencyExchange className="text-blue-500 mr-2" size={24} />
                  <span className="text-sm font-medium dark:text-gray-200">Exchange Rate:</span>
                </div>
                {isLoading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin h-5 w-5 text-blue-500 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span className="text-sm text-gray-500">Loading...</span>
                  </div>
                ) : (
                  <div className="text-lg font-semibold dark:text-white">
                    1 {sourceCurrency} = {exchangeRate.toFixed(4)} {targetCurrency}
                  </div>
                )}
              </div>

              <div className="mt-2 text-center">
                <button
                  onClick={() => setShowHistoricalRates(!showHistoricalRates)}
                  className="text-xs text-blue-600 hover:text-blue-800 underline"
                  disabled={isLoading || isConverted}
                >
                  {showHistoricalRates ? "Hide historical rates" : "Show historical rates"}
                </button>
              </div>

              {showHistoricalRates && (
                <div className="mt-4 h-40 border-t dark:border-gray-600 pt-4">
                  {historicalRates.length > 0 ? (
                    <div className="grid grid-cols-3 gap-2">
                      {historicalRates.map((item, index) => (
                        <div key={index} className="text-xs">
                          <span className="text-gray-500">
                            {new Date(item.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}:{" "}
                          </span>
                          <span className="font-medium">{item.rate.toFixed(4)}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex justify-center items-center h-full">
                      <svg
                        className="animate-spin h-5 w-5 text-blue-500 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span className="text-sm text-gray-500">Loading historical rates...</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={applyConversion}
              disabled={isLoading || !handleInputChange || isConverted}
              className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300 flex items-center justify-center"
              title={
                !handleInputChange ? "Update function not available" : isConverted ? "Conversion already applied" : ""
              }
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : isConverted ? (
                "Conversion Already Applied"
              ) : (
                "Apply Conversion to Values"
              )}
            </button>
          </div>

          {/* Preview Panel */}
          <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Conversion Preview</h3>

            {isConverted && (
              <div className="mt-4 bg-yellow-50 border border-yellow-200 p-3 rounded-md mb-4">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-yellow-500 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm text-yellow-700 font-medium">
                    Conversion has been applied. The preview shows original values and current converted values.
                  </p>
                </div>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Financial Metric
                    </th>
                    <th className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {isConverted ? `Original (${sourceCurrency})` : `Original (${sourceCurrency})`}
                    </th>
                    <th className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {isConverted ? `Converted (${targetCurrency})` : `Preview (${targetCurrency})`}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {previewData.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-50 dark:bg-gray-700/50" : "bg-white dark:bg-gray-800"}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{item.label}</td>
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-right">
                        {`${CURRENCIES.find((c) => c.code === sourceCurrency)?.symbol || ""}${conv.convToMillion(
                          item.original
                        )}`}
                      </td>
                      <td className="px-4 py-3 text-sm text-blue-400 font-medium text-right">
                        {`${CURRENCIES.find((c) => c.code === targetCurrency)?.symbol || ""}${conv.convToMillion(
                          item.converted
                        )}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-md">
              <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Notes on Currency Conversion</h4>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1 list-disc pl-5">
                <li>All values shown in millions except for share price</li>
                <li>Consider using average rates for income statement items</li>
                <li>Consider using spot rates for balance sheet items</li>
                <li>Historical exchange rates may fluctuate significantly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverterPopoutPage;
