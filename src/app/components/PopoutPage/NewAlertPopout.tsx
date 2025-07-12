import React, { useState, useRef, useEffect, useMemo } from "react";
import { RxCross1 } from "react-icons/rx";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface StockSymbol {
  currency: string;
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
  mic: string;
}

interface NewAlertPopoutProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (alertData: any) => Promise<void>;
  isLoading?: boolean;
  error?: string;
}

export default function NewAlertPopout({ isOpen, onClose, onSave, isLoading = false, error }: NewAlertPopoutProps) {
  const [symbol, setSymbol] = useState("");
  const [targetPrice, setTargetPrice] = useState("");
  const [condition, setCondition] = useState("ABOVE");
  const [expirationDate, setExpirationDate] = useState("");
  const [hasExpiration, setHasExpiration] = useState(false);
  const [localError, setLocalError] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const popoutRef = useRef<HTMLDivElement>(null);
  const suggestionRef = useRef<HTMLDivElement>(null);

  // Fetch ALL stock symbols once
  const {
    data: stockSymbols,
    isLoading: isLoadingSymbols,
    error: symbolsError,
  } = useQuery({
    queryKey: ["stockSymbols"],
    queryFn: async () => {
      const { data } = await axios.get("/api/finnhub/stock-symbols");
      return data.symbols as StockSymbol[];
    },
    staleTime: Infinity, // Don't refetch during session
    enabled: isOpen, // Only fetch when popout is open
  });

  // Filter symbols based on input (performed client-side)
  const filteredSymbols = useMemo(() => {
    if (!stockSymbols || !symbol || symbol.length < 2) return [];

    const searchTerm = symbol.toLowerCase();

    return stockSymbols
      .filter(
        (stock) =>
          // Only include "Common Stock" and "ADR" types
          (stock.type === "Common Stock" || stock.type === "ADR") &&
          (stock.symbol.toLowerCase().includes(searchTerm) || stock.description.toLowerCase().includes(searchTerm))
      )
      .sort((a, b) => {
        // First prioritize exact symbol matches
        if (a.symbol.toLowerCase() === searchTerm) return -1;
        if (b.symbol.toLowerCase() === searchTerm) return 1;

        // Then prioritize symbols starting with the search term
        if (a.symbol.toLowerCase().startsWith(searchTerm) && !b.symbol.toLowerCase().startsWith(searchTerm)) return -1;
        if (!a.symbol.toLowerCase().startsWith(searchTerm) && b.symbol.toLowerCase().startsWith(searchTerm)) return 1;

        // Finally sort by symbol length (shorter first)
        return a.symbol.length - b.symbol.length;
      })
      .slice(0, 10); // Limit results to 10 items
  }, [stockSymbols, symbol]);

  // Close when clicking outside the popout
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoutRef.current && !popoutRef.current.contains(event.target as Node)) {
        onClose();
      }
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");

    // Validation
    if (!symbol.trim()) {
      setLocalError("Please enter a stock symbol");
      return;
    }

    if (!targetPrice || parseFloat(targetPrice) <= 0) {
      setLocalError("Please enter a valid target price");
      return;
    }

    if (hasExpiration && !expirationDate) {
      setLocalError("Please select an expiration date");
      return;
    }

    if (hasExpiration && new Date(expirationDate) <= new Date()) {
      setLocalError("Expiration date must be in the future");
      return;
    }

    try {
      const alertData = {
        symbol: symbol.toUpperCase().trim(),
        targetPrice: parseFloat(targetPrice),
        condition,
        expiresAt: hasExpiration ? expirationDate : null,
      };

      await onSave(alertData);

      // Reset form on success
      setSymbol("");
      setTargetPrice("");
      setCondition("ABOVE");
      setExpirationDate("");
      setHasExpiration(false);
    } catch (err) {
      // Error will be handled by the parent component
      console.error("Error in form submission:", err);
    }
  };

  const handleSymbolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setSymbol(value);

    if (value.length >= 2) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (result: StockSymbol) => {
    setSymbol(result.symbol);
    setShowSuggestions(false);
  };

  const handleTargetPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setTargetPrice(value);
    }
  };

  if (!isOpen) return null;

  const displayError = error || localError;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div ref={popoutRef} className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-4 relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Create New Alert</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <RxCross1 size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Stock Symbol with Autocomplete */}
          <div>
            <label htmlFor="symbol" className="block text-sm font-medium text-gray-700 mb-2">
              Stock Symbol
            </label>
            <div className="relative">
              <input
                type="text"
                id="symbol"
                value={symbol}
                onChange={handleSymbolChange}
                onFocus={() => symbol.length >= 2 && setShowSuggestions(true)}
                placeholder="e.g., AAPL"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                autoComplete="off"
              />

              {/* Suggestions dropdown */}
              {showSuggestions && (
                <div
                  ref={suggestionRef}
                  className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-auto"
                >
                  {isLoadingSymbols ? (
                    <div className="p-3 text-sm text-gray-500 flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-500"
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
                      Loading...
                    </div>
                  ) : symbolsError ? (
                    <div className="p-3 text-sm text-red-500">Error loading stock data</div>
                  ) : filteredSymbols && filteredSymbols.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                      {filteredSymbols.map((stock) => (
                        <li
                          key={stock.symbol}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleSuggestionClick(stock)}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-blue-600">{stock.symbol}</span>
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">{stock.mic}</span>
                          </div>
                          <div className="text-sm text-gray-700 truncate">{stock.description}</div>
                        </li>
                      ))}
                    </ul>
                  ) : symbol.length >= 2 ? (
                    <div className="p-3 text-sm text-gray-500">No results found</div>
                  ) : null}
                </div>
              )}
            </div>
          </div>

          {/* Target Price */}
          <div>
            <label htmlFor="targetPrice" className="block text-sm font-medium text-gray-700 mb-2">
              Target Price ($)
            </label>
            <input
              type="text"
              id="targetPrice"
              value={targetPrice}
              onChange={handleTargetPriceChange}
              placeholder="0.00"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Alert Type - Improved Design */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Alert Type</label>
            <div className="space-y-3">
              <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="condition"
                  value="ABOVE"
                  checked={condition === "ABOVE"}
                  onChange={(e) => setCondition(e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <div className="ml-3 flex items-center">
                  <FaArrowUp className="text-green-500 mr-2" />
                  <span className="text-sm font-medium">Alert when price goes above target</span>
                </div>
              </label>
              <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="condition"
                  value="BELOW"
                  checked={condition === "BELOW"}
                  onChange={(e) => setCondition(e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <div className="ml-3 flex items-center">
                  <FaArrowDown className="text-red-500 mr-2" />
                  <span className="text-sm font-medium">Alert when price goes below target</span>
                </div>
              </label>
            </div>
          </div>

          {/* Expiration - Improved Design */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Expiration</label>
            <div className="space-y-3">
              <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="expiration"
                  checked={!hasExpiration}
                  onChange={() => setHasExpiration(false)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-3 text-sm font-medium">No expiration</span>
              </label>
              <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="expiration"
                  checked={hasExpiration}
                  onChange={() => setHasExpiration(true)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-3 text-sm font-medium">Set expiration date</span>
              </label>
              {hasExpiration && (
                <div className="ml-6 mt-2">
                  <input
                    type="date"
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Error Message */}
          {displayError && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-600">{displayError}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating..." : "Create Alert"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
