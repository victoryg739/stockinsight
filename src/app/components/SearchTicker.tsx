import React, { useState, useEffect, useRef, useMemo } from "react";
import { CiSearch } from "react-icons/ci";
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

const SearchTicker = ({ symbol, setSymbol, setSymbolBtn, incomeStatementIsFetching }: any) => {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);

  // Sync inputValue when symbol is set externally (e.g., restored from URL/storage)
  useEffect(() => {
    if (symbol) setInputValue(symbol);
  }, [symbol]);

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
  });

  // Filter symbols based on input (performed client-side)
  const filteredSymbols = useMemo(() => {
    if (!stockSymbols || !inputValue || inputValue.length < 2) return [];

    const searchTerm = inputValue.toLowerCase();

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
  }, [stockSymbols, inputValue]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    // Don't update symbol here - only update when search button is clicked or suggestion is selected

    if (value.length >= 2) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (result: StockSymbol) => {
    setSymbol(result.symbol);
    setInputValue(result.symbol);
    setShowSuggestions(false);

    // Trigger search immediately when a suggestion is clicked
    setSymbolBtn((prevState: boolean) => !prevState);
  };

  // Handle search button click
  const handleSearch = () => {
    setSymbol(inputValue); // Set the symbol to trigger search
    setSymbolBtn((prevState: boolean) => !prevState);
    setShowSuggestions(false);
  };

  return (
    <div className="flex items-center max-w-sm mx-auto mt-10">
      <label htmlFor="simple-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <CiSearch className="w-4 h-4 dark:text-gray-100" />
        </div>
        <input
          type="text"
          id="simple-search"
          name="search"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => inputValue.length >= 2 && setShowSuggestions(true)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search by company name or ticker"
          autoComplete="off"
        />

        {/* Suggestions dropdown */}
        {showSuggestions && (
          <div
            ref={suggestionRef}
            className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-72 overflow-auto"
          >
            {isLoadingSymbols ? (
              <div className="p-3 text-sm text-gray-500 flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-500"
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
                Loading stock data...
              </div>
            ) : symbolsError ? (
              <div className="p-3 text-sm text-red-500">Error loading stock data. Please try again.</div>
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
                    <div className="text-xs text-gray-500">{stock.type}</div>
                  </li>
                ))}
              </ul>
            ) : inputValue.length >= 2 ? (
              <div className="p-3 text-sm text-gray-500">No results found</div>
            ) : null}
          </div>
        )}
      </div>
      <button
        type="submit"
        onClick={handleSearch}
        className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        disabled={incomeStatementIsFetching}
      >
        {incomeStatementIsFetching ? (
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
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        )}
        <span className="sr-only">Search</span>
      </button>
    </div>
  );
};

export default SearchTicker;
