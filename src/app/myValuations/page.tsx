"use client";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient, useQueries } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import StockLogo from "../components/StockLogo";
import { HiOutlineCollection } from "react-icons/hi";
// Icons
import { MdDeleteOutline, MdSearch, MdFilterAlt, MdOutlineSort, MdAdd, MdGridView, MdViewList } from "react-icons/md";
import { FaArrowUp, FaArrowDown, FaCalendarAlt, FaExclamationCircle } from "react-icons/fa";
import { FiClock } from "react-icons/fi";

// Components
import Navbar from "../components/Navbar";
import DeletePopoutPage from "../components/PopoutPage/DeletePopoutPage";

// Utils
import { fetchValuations, deleteValuationById, fetchMarketPrice } from "../utils/queryAPIFunctions";
import { epochToDateTime, convRound2Dp } from "../utils/helper";

export default function MyValuationsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  // States
  const [symbol, setSymbol] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [deletePage, setDeletePage] = useState(false);
  const [sortField, setSortField] = useState<string>("valued_date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");

  // Queries
  const { data: valuationQuery, isFetching: valuationIsFetching } = useQuery({
    queryKey: ["valuations", symbol],
    queryFn: async () => fetchValuations(symbol),
  });

  const marketPriceQueries = useQueries({
    queries: (valuationQuery || []).map((item: any) => ({
      queryKey: ["marketPrice", item.symbol],
      queryFn: () => fetchMarketPrice(item.symbol),
      enabled: !!item.symbol,
    })),
  });

  // Mutation for delete
  const deleteValuationMutation = useMutation({
    mutationFn: async (ids: any) => {
      await deleteValuationById(ids);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["valuations"] });
      setSelectedItems([]);
      setIsDeleteMode(false);
    },
  });

  // Helpers
  const calculateValuationDiff = (marketPrice: number, impliedPrice: number) => {
    if (!marketPrice) return 0;
    return (impliedPrice / marketPrice - 1) * 100;
  };

  const formatValuationDiff = (diff: number) => {
    return `${Math.abs(diff).toFixed(2)}%`;
  };

  const handleCheckboxChange = (id: string, e?: React.MouseEvent | React.ChangeEvent<HTMLInputElement>) => {
    // If event exists, stop propagation to prevent conflicts
    if (e) {
      e.stopPropagation();
    }

    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(id)) {
        return prevSelectedItems.filter((item) => item !== id);
      } else {
        return [...prevSelectedItems, id];
      }
    });
  };

  const handleDelete = () => {
    deleteValuationMutation.mutate(selectedItems);
    setDeletePage(false);
  };

  const handleViewDetails = (id: string) => {
    router.push(`/myValuations/${id}`);
  };

  const formatValuationDate = (epochTimestamp: number): string => {
    const date = new Date(epochTimestamp * 1000);
    return date.toLocaleDateString(); // Returns only the date in a format like MM/DD/YYYY
  };

  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // Function to get MRQ from stock_info
  const getMostRecentQuarter = (stockInfo: any[]): string => {
    const mrqInfo = stockInfo.find((item: any) => item.id === "mostRecentQuarter");
    return mrqInfo ? mrqInfo.value : "N/A";
  };

  // Parse a locale date string (DD/MM/YYYY or MM/DD/YYYY) into a Date
  const parseMrqDate = (dateStr: string): Date | null => {
    if (!dateStr || dateStr === "N/A") return null;
    const parts = dateStr.split("/");
    if (parts.length !== 3) return null;
    const [a, b, year] = parts.map(Number);
    // MRQ is always end-of-quarter: month is 3,6,9,12. Use that to detect format.
    if ([3, 6, 9, 12].includes(b)) {
      // a=day, b=month (DD/MM/YYYY)
      return new Date(year, b - 1, a);
    } else if ([3, 6, 9, 12].includes(a)) {
      // a=month, b=day (MM/DD/YYYY)
      return new Date(year, a - 1, b);
    }
    // Fallback: try Date constructor
    return new Date(dateStr);
  };

  // Get quarter label from MRQ date string (e.g., "Q4 2025")
  const getQuarterLabel = (mrqDateStr: string): string => {
    const date = parseMrqDate(mrqDateStr);
    if (!date || isNaN(date.getTime())) return mrqDateStr;
    const month = date.getMonth() + 1;
    const quarter = Math.ceil(month / 3);
    return `Q${quarter} ${date.getFullYear()}`;
  };

  const getTagStyle = (tag: string) => {
    switch (tag) {
      case "Base Case":    return "bg-blue-100 text-blue-700";
      case "Bull Case":    return "bg-green-100 text-green-700";
      case "Bear Case":    return "bg-red-100 text-red-700";
      case "Conservative": return "bg-amber-100 text-amber-700";
      case "Aggressive":   return "bg-purple-100 text-purple-700";
      default:             return "bg-gray-100 text-gray-600";
    }
  };

  // Get staleness: how many new quarters have been reported since the valuation was saved?
  // Compares today vs saved date — if 4+ months have passed, at least one new quarter's report is likely out
  const getStaleStatus = (valuedDateEpoch: number): { quartersBehind: number; level: "fresh" | "yellow" | "red" } => {
    const savedDate = new Date(valuedDateEpoch * 1000);
    const now = new Date();
    const monthsSinceSave = (now.getFullYear() - savedDate.getFullYear()) * 12 + (now.getMonth() - savedDate.getMonth());
    // A quarter's report typically drops ~4 months after the previous quarter end
    const quartersBehind = Math.max(0, Math.floor((monthsSinceSave - 1) / 3));
    if (quartersBehind >= 3) return { quartersBehind, level: "red" };
    if (quartersBehind >= 1) return { quartersBehind, level: "yellow" };
    return { quartersBehind: 0, level: "fresh" };
  };

  // Relative time format (e.g., "2d ago", "3mo ago")
  const getRelativeTime = (epochTimestamp: number): string => {
    const now = Math.floor(Date.now() / 1000);
    const diffSec = now - epochTimestamp;
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHr / 24);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);
    if (diffDays < 1) return "Today";
    if (diffDays === 1) return "1d ago";
    if (diffDays < 30) return `${diffDays}d ago`;
    if (diffMonths < 12) return `${diffMonths}mo ago`;
    return `${diffYears}y ago`;
  };

  // Sort valuations
  const sortedValuations = React.useMemo(() => {
    if (!valuationQuery) return [];

    return [...valuationQuery].sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case "symbol":
          comparison = a.symbol.localeCompare(b.symbol);
          break;
        case "implied_share_price":
          comparison = Number(a.implied_share_price) - Number(b.implied_share_price);
          break;
        case "valued_date":
          comparison = a.valued_date - b.valued_date;
          break;
        case "mrq":
          const aMRQ = getMostRecentQuarter(a.stock_info);
          const bMRQ = getMostRecentQuarter(b.stock_info);
          comparison = aMRQ.localeCompare(bMRQ);
          break;
        case "diff":
          const aIndex = valuationQuery.findIndex((v: any) => v.id === a.id);
          const bIndex = valuationQuery.findIndex((v: any) => v.id === b.id);

          const aMarketPrice =
            aIndex >= 0 && aIndex < marketPriceQueries.length ? marketPriceQueries[aIndex].data || 0 : 0;

          const bMarketPrice =
            bIndex >= 0 && bIndex < marketPriceQueries.length ? marketPriceQueries[bIndex].data || 0 : 0;

          const aDiff = aMarketPrice ? calculateValuationDiff(Number(aMarketPrice), Number(a.implied_share_price)) : 0;
          const bDiff = bMarketPrice ? calculateValuationDiff(Number(bMarketPrice), Number(b.implied_share_price)) : 0;
          comparison = aDiff - bDiff;
          break;
        default:
          comparison = 0;
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [valuationQuery, sortField, sortDirection, marketPriceQueries]);

  // Stats calculation
  const stats = React.useMemo(() => {
    if (!valuationQuery || valuationQuery.length === 0 || !marketPriceQueries) {
      return {
        totalValuations: 0,
        undervaluedCount: 0,
        overvaluedCount: 0,
      };
    }

    let undervaluedCount = 0;
    let overvaluedCount = 0;

    valuationQuery.forEach((item: any, index: any) => {
      const marketPrice = marketPriceQueries[index]?.data || 0;
      if (marketPrice) {
        const diff = calculateValuationDiff(Number(marketPrice), Number(item.implied_share_price));
        if (diff > 0) {
          undervaluedCount++;
        } else {
          overvaluedCount++;
        }
      }
    });

    return {
      totalValuations: valuationQuery.length,
      undervaluedCount,
      overvaluedCount,
    };
  }, [valuationQuery, marketPriceQueries]);

  // Authentication check
  if (status === "unauthenticated") {
    router.push("/");
    return null;
  }

  // Loading State Component
  const LoadingState = () => (
    <div className="mt-10 animate-pulse space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-28 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
        ))}
      </div>
      <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-xl mb-6"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-60 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
        ))}
      </div>
    </div>
  );

  // Empty State Component
  const EmptyState = ({ searchTerm }: { searchTerm: string }) => (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="bg-indigo-100 dark:bg-indigo-900/30 p-6 rounded-full mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-indigo-600 dark:text-indigo-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        {searchTerm ? "No matching valuations found" : "Your valuation portfolio is empty"}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        {searchTerm
          ? `We couldn't find any valuations matching "${searchTerm}". Try another search term or clear your filter.`
          : "Get started by creating your first valuation. Track your investment ideas and monitor their performance over time."}
      </p>
      <button
        onClick={() => (window.location.href = "/fcff")}
        className="flex items-center bg-indigo-600 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-indigo-700 transition-colors"
      >
        <MdAdd className="mr-2 h-5 w-5" />
        Create Your First Valuation
      </button>
    </div>
  );

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Valuations</h1>

          <button
            onClick={() => (window.location.href = "/fcff")}
            className="inline-flex items-center px-5 py-2.5 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <MdAdd className="mr-1 h-5 w-5" />
            New Valuation
          </button>
        </div>

        {/* Stats Cards */}
        {!valuationIsFetching && valuationQuery && valuationQuery.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Total Valuations Card */}
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-4">
                  <HiOutlineCollection className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Valuations</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalValuations}</p>
                </div>
              </div>
            </div>

            {/* Undervalued Card */}
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 mr-4">
                  <FaArrowUp className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Undervalued</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.undervaluedCount}</p>
                </div>
              </div>
            </div>

            {/* Overvalued Card */}
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 mr-4">
                  <FaArrowDown className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Overvalued</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.overvaluedCount}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex flex-wrap gap-4 items-center justify-between mb-8">
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MdSearch className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Search by ticker symbol..."
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
              <button
                onClick={() => setView("grid")}
                className={`p-2.5 ${view === "grid" ? "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400" : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300"}`}
              >
                <MdGridView className="h-5 w-5" />
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-2.5 ${view === "list" ? "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400" : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300"}`}
              >
                <MdViewList className="h-5 w-5" />
              </button>
            </div>

            <button
              onClick={() => toggleSort(sortField)}
              className="flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <MdOutlineSort className="mr-1 h-5 w-5" />
              Sort
            </button>

            <button
              onClick={() => setIsDeleteMode(!isDeleteMode)}
              className={`inline-flex items-center px-3 py-2 border rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                ${
                  isDeleteMode
                    ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700 hover:bg-red-200 dark:hover:bg-red-900/50"
                    : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                }`}
            >
              <MdDeleteOutline className="mr-2 h-5 w-5" />
              {isDeleteMode ? "Cancel" : "Delete"}
            </button>

            {isDeleteMode && selectedItems.length > 0 && (
              <button
                onClick={() => setDeletePage(true)}
                className="inline-flex items-center px-3 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete {selectedItems.length}
              </button>
            )}
          </div>
        </div>

        {/* Sort info */}
        <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          Sorting by:{" "}
          {sortField === "valued_date"
            ? "Date"
            : sortField === "symbol"
            ? "Symbol"
            : sortField === "implied_share_price"
            ? "Implied Price"
            : sortField === "diff"
            ? "Valuation Difference"
            : sortField === "mrq"
            ? "Most Recent Quarter"
            : "Date"}{" "}
          ({sortDirection === "desc" ? "descending" : "ascending"})
        </div>

        {/* Main content */}
        {valuationIsFetching || status === "loading" ? (
          <LoadingState />
        ) : !valuationQuery || valuationQuery.length === 0 ? (
          <EmptyState searchTerm={symbol} />
        ) : view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedValuations.map((item, index) => {
              const marketPrice = marketPriceQueries[valuationQuery.findIndex((v: any) => v.id === item.id)]?.data || 0;
              const valuationDiff = calculateValuationDiff(Number(marketPrice), Number(item.implied_share_price));
              const isUndervalued = valuationDiff > 0;
              const stockName = item.stock_info.find((si: any) => si.id === "shortName")?.value || item.symbol;
              const mrq = getMostRecentQuarter(item.stock_info);

              return (
                <div
                  key={item.id}
                  className={`rounded-xl overflow-hidden shadow-sm bg-white dark:bg-gray-800 border hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
                    selectedItems.includes(item.id) ? "border-indigo-500 ring-2 ring-indigo-200 dark:ring-indigo-800" : "border-gray-200 dark:border-gray-700"
                  } cursor-pointer`}
                  onClick={isDeleteMode ? () => handleCheckboxChange(item.id) : () => handleViewDetails(item.id)}
                >
                  {/* Top section with valuation status */}
                  <div className={`h-2 ${isUndervalued ? "bg-green-500" : "bg-red-500"}`}></div>

                  {/* Company info */}
                  <div className="py-5 px-4 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div className="mr-3 relative w-12 h-12">
                          <StockLogo symbol={item.symbol} height={50} width={50} className="mr-2" alt="logo" />
                        </div>
                        <div>
                          <h3 className="font-bold text-xl text-gray-900 dark:text-white">{item.symbol}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[180px]">{stockName}</p>
                        </div>
                      </div>

                      {isDeleteMode && (
                        <div onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item.id)}
                            onChange={(e) => handleCheckboxChange(item.id, e)}
                            className="h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300"
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5 mt-4">
                      <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300" title={formatValuationDate(item.valued_date)}>
                        <div className="flex items-center">
                          <FaCalendarAlt className="mr-1.5 text-indigo-400 text-xs" />
                          <span className="font-medium">Saved {getRelativeTime(item.valued_date)}</span>
                        </div>
                        {item.tags && item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 justify-end">
                            {item.tags.map((tag: string) => (
                              <span
                                key={tag}
                                className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${getTagStyle(tag)}`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center flex-wrap gap-1.5">
                        <FiClock className="text-gray-400 dark:text-gray-500 text-xs" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">Last Qtr: {getQuarterLabel(mrq)}</span>
                        {(() => {
                          const stale = getStaleStatus(item.valued_date);
                          if (stale.level === "fresh") return null;
                          return (
                            <span
                              className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium ${
                                stale.level === "red"
                                  ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                                  : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                              }`}
                            >
                              <FaExclamationCircle className="mr-0.5" />
                              {stale.level === "red" ? `${stale.quartersBehind}+ qtrs old` : `${stale.quartersBehind} qtr${stale.quartersBehind > 1 ? "s" : ""} old`}
                            </span>
                          );
                        })()}
                      </div>
                    </div>
                  </div>

                  {/* Valuation data */}
                  <div className="py-2 px-4">
                    <div className="flex justify-between mb-4">
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Implied Value</div>
                        <div className="text-lg font-bold dark:text-white">${convRound2Dp(Number(item.implied_share_price))}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Market Price</div>
                        <div className="text-lg font-bold dark:text-white">
                          ${marketPrice ? convRound2Dp(Number(marketPrice)) : "--"}
                        </div>
                      </div>
                    </div>

                    <div
                      className={`${
                        isUndervalued
                          ? "bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800 text-green-800 dark:text-green-300"
                          : "bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800 text-red-800 dark:text-red-300"
                      } rounded-lg border p-3 text-center`}
                    >
                      <div className="flex items-center justify-center">
                        {isUndervalued ? (
                          <FaArrowUp className="mr-2 text-green-600" />
                        ) : (
                          <FaArrowDown className="mr-2 text-red-600" />
                        )}
                        <span className="font-bold">{formatValuationDiff(valuationDiff)}</span>
                        <span className="ml-1 text-sm">{isUndervalued ? "Undervalued" : "Overvalued"}</span>
                      </div>
                    </div>

                    {getStaleStatus(item.valued_date).level !== "fresh" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/fcff?symbol=${item.symbol}&fresh=1`);
                        }}
                        className="mt-2 w-full text-center text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg py-1.5 transition-colors"
                      >
                        Re-value with latest data
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // List view
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  {isDeleteMode && (
                    <th scope="col" className="pl-6 py-3 w-10">
                      <span className="sr-only">Select</span>
                    </th>
                  )}
                  <th
                    scope="col"
                    className="pl-6 pr-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                    onClick={() => toggleSort("symbol")}
                  >
                    <div className="flex items-center">
                      Company
                      {sortField === "symbol" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer w-32"
                    onClick={() => toggleSort("implied_share_price")}
                  >
                    <div className="flex items-center justify-end">
                      <span>Implied</span>
                      {sortField === "implied_share_price" && (
                        <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer w-32"
                  >
                    Market
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer w-40"
                    onClick={() => toggleSort("diff")}
                  >
                    <div className="flex items-center justify-end">
                      <span>Difference</span>
                      {sortField === "diff" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer w-36"
                    onClick={() => toggleSort("mrq")}
                  >
                    <div className="flex items-center justify-end">
                      <span>Last Qtr</span>
                      {sortField === "mrq" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-44"
                  >
                    Tags
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer w-40"
                    onClick={() => toggleSort("valued_date")}
                  >
                    <div className="flex items-center justify-end">
                      <span>Saved</span>
                      {sortField === "valued_date" && (
                        <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {sortedValuations.map((item, index) => {
                  const marketPrice =
                    marketPriceQueries[valuationQuery.findIndex((v: any) => v.id === item.id)]?.data || 0;
                  const valuationDiff = calculateValuationDiff(Number(marketPrice), Number(item.implied_share_price));
                  const isUndervalued = valuationDiff > 0;
                  const stockName = item.stock_info.find((si: any) => si.id === "shortName")?.value || item.symbol;
                  const mrq = getMostRecentQuarter(item.stock_info);

                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer`}
                      onClick={isDeleteMode ? () => handleCheckboxChange(item.id) : () => handleViewDetails(item.id)}
                    >
                      {isDeleteMode && (
                        <td className="pl-6 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item.id)}
                            onChange={(e) => handleCheckboxChange(item.id, e)}
                            className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300 dark:border-gray-600"
                          />
                        </td>
                      )}

                      <td className="pl-6 pr-3 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 relative">
                            <StockLogo symbol={item.symbol} height={50} width={50} className="mr-2" alt="logo" />
                          </div>
                          <div className="ml-4">
                            <div className="font-bold text-gray-900 dark:text-white">{item.symbol}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[200px]">{stockName}</div>
                          </div>
                        </div>
                      </td>

                      <td className="px-3 py-4 whitespace-nowrap text-right">
                        <div className="text-sm font-bold text-gray-900 dark:text-white">
                          ${convRound2Dp(Number(item.implied_share_price))}
                        </div>
                      </td>

                      <td className="px-3 py-4 whitespace-nowrap text-right">
                        <div className="text-sm font-bold text-gray-900 dark:text-white">
                          ${marketPrice ? convRound2Dp(Number(marketPrice)) : "--"}
                        </div>
                      </td>

                      <td className="px-3 py-4 whitespace-nowrap text-right">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            isUndervalued ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300" : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                          }`}
                        >
                          {isUndervalued ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                          {formatValuationDiff(valuationDiff)}
                        </span>
                      </td>

                      <td className="px-3 py-4 whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400 font-medium">
                        <div className="flex items-center justify-end gap-1.5">
                          <span>{getQuarterLabel(mrq)}</span>
                          {(() => {
                            const stale = getStaleStatus(item.valued_date);
                            if (stale.level === "fresh") return null;
                            return (
                              <span
                                className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium ${
                                  stale.level === "red"
                                    ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                                    : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                                }`}
                              >
                                <FaExclamationCircle className="mr-0.5" />
                                {stale.level === "red" ? `${stale.quartersBehind}+ qtrs old` : `${stale.quartersBehind} qtr${stale.quartersBehind > 1 ? "s" : ""} old`}
                              </span>
                            );
                          })()}
                        </div>
                      </td>

                      <td className="px-3 py-4">
                        {item.tags && item.tags.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {item.tags.map((tag: string) => (
                              <span
                                key={tag}
                                className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${getTagStyle(tag)}`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400 dark:text-gray-500">—</span>
                        )}
                      </td>

                      <td className="px-5 py-4 whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400" title={formatValuationDate(item.valued_date)}>
                        {getRelativeTime(item.valued_date)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete confirmation popup */}
      {deletePage && <DeletePopoutPage setIsPopoutOpen={setDeletePage} handleDelete={handleDelete} />}
    </>
  );
}
