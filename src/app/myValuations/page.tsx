"use client";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient, useQueries } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import StockLogo from "../components/StockLogo";
// Icons
import { MdDeleteOutline, MdSearch, MdOutlineSort, MdAdd, MdGridView, MdViewList, MdFolderOpen, MdEdit, MdClose } from "react-icons/md";
import { FaArrowUp, FaArrowDown, FaCalendarAlt, FaExclamationCircle } from "react-icons/fa";
import { FiClock } from "react-icons/fi";

// Components
import Navbar from "../components/Navbar";
import DeletePopoutPage from "../components/PopoutPage/DeletePopoutPage";
import CreateGroupPopout from "../components/PopoutPage/CreateGroupPopout";
import GroupPicker from "../components/GroupPicker";

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
  // Group states
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<{ id: number; name: string; color: string } | null>(null);
  const [confirmDeleteGroupId, setConfirmDeleteGroupId] = useState<number | null>(null);
  const [isAddingToGroup, setIsAddingToGroup] = useState(false);
  const [addGroupSearch, setAddGroupSearch] = useState("");
  const [addGroupSelected, setAddGroupSelected] = useState<Set<number>>(new Set());

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

  // Group queries and mutations
  const { data: groups = [] } = useQuery<any[]>({
    queryKey: ["valuationGroups"],
    queryFn: () => fetch("/api/valuation-groups").then((r) => r.json()),
    enabled: !!session?.user?.email && status === "authenticated",
  });

  const createGroupMutation = useMutation({
    mutationFn: async ({ name, color }: { name: string; color: string }) => {
      const res = await fetch("/api/valuation-groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, color }),
      });
      if (!res.ok) throw new Error("Failed to create group");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["valuationGroups"] });
      setIsCreateGroupOpen(false);
    },
  });

  const updateGroupMutation = useMutation({
    mutationFn: async ({ id, name, color }: { id: number; name: string; color: string }) => {
      const res = await fetch(`/api/valuation-groups/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, color }),
      });
      if (!res.ok) throw new Error("Failed to update group");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["valuationGroups"] });
      setEditingGroup(null);
    },
  });

  const deleteGroupMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/valuation-groups/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete group");
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["valuationGroups"] });
      if (selectedGroupId === id) setSelectedGroupId(null);
    },
  });

  const toggleMembershipMutation = useMutation({
    mutationFn: async ({ groupId, valuationId, add }: { groupId: number; valuationId: number; add: boolean }) => {
      const res = await fetch(`/api/valuation-groups/${groupId}/members`, {
        method: add ? "POST" : "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ valuationId }),
      });
      if (!res.ok) throw new Error("Failed to update membership");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["valuationGroups"] });
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

  const getTagLabel = (tag: string) => tag.split("|")[0];

  const getTagStyle = (tag: string) => {
    const [label, colorKey] = tag.split("|");
    switch (label) {
      case "Base Case":    return "bg-blue-100 text-blue-700";
      case "Bull Case":    return "bg-green-100 text-green-700";
      case "Bear Case":    return "bg-red-100 text-red-700";
      case "Conservative": return "bg-amber-100 text-amber-700";
    }
    const colorMap: Record<string, string> = {
      blue:   "bg-blue-100 text-blue-700",
      green:  "bg-green-100 text-green-700",
      red:    "bg-red-100 text-red-700",
      amber:  "bg-amber-100 text-amber-700",
      purple: "bg-purple-100 text-purple-700",
      pink:   "bg-pink-100 text-pink-700",
      teal:   "bg-teal-100 text-teal-700",
      gray:   "bg-gray-100 text-gray-600",
    };
    return colorKey && colorMap[colorKey] ? colorMap[colorKey] : "bg-gray-100 text-gray-600";
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

  // Membership map: valuationId -> Set of groupIds
  const membershipMap = React.useMemo(() => {
    const map: Record<number, Set<number>> = {};
    groups.forEach((g: any) => {
      (g.memberIds as number[]).forEach((vid) => {
        if (!map[vid]) map[vid] = new Set();
        map[vid].add(g.id);
      });
    });
    return map;
  }, [groups]);

  // Filter to group members only
  const displayedValuations = React.useMemo(() => {
    if (selectedGroupId === null) return sortedValuations;
    const selectedGroup = groups.find((g: any) => g.id === selectedGroupId);
    if (!selectedGroup) return sortedValuations;
    const memberIds = new Set(selectedGroup.memberIds as number[]);
    return sortedValuations.filter((v: any) => memberIds.has(v.id));
  }, [sortedValuations, selectedGroupId, groups]);

  // Valuations not yet in the selected group (for the add modal)
  const addableValuations = React.useMemo(() => {
    if (selectedGroupId === null) return [];
    const selectedGroup = groups.find((g: any) => g.id === selectedGroupId);
    const memberIds = new Set((selectedGroup?.memberIds as number[]) || []);
    return sortedValuations.filter((v: any) => !memberIds.has(v.id));
  }, [sortedValuations, selectedGroupId, groups]);

  // Authentication check
  if (status === "unauthenticated") {
    router.push("/");
    return null;
  }

  // Loading State Component
  const LoadingState = () => (
    <div className="mt-6 animate-pulse space-y-6">
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl w-2/3"></div>
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

        {/* Group chips bar */}
        {(() => {
          const GROUP_COLOR = {
            blue:   { dot: "bg-blue-500",   active: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-300 dark:border-blue-600" },
            green:  { dot: "bg-green-500",  active: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 border-green-300 dark:border-green-600" },
            red:    { dot: "bg-red-500",    active: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 border-red-300 dark:border-red-600" },
            amber:  { dot: "bg-amber-500",  active: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-amber-300 dark:border-amber-600" },
            purple: { dot: "bg-purple-500", active: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 border-purple-300 dark:border-purple-600" },
            pink:   { dot: "bg-pink-500",   active: "bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300 border-pink-300 dark:border-pink-600" },
            teal:   { dot: "bg-teal-500",   active: "bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300 border-teal-300 dark:border-teal-600" },
            gray:   { dot: "bg-gray-400",   active: "bg-gray-100 text-gray-700 dark:bg-gray-700/60 dark:text-gray-300 border-gray-300 dark:border-gray-600" },
          } as Record<string, { dot: string; active: string }>;
          const inactiveChip = "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700";

          return (
            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1 scroll-smooth">
              {/* All chip */}
              <button
                onClick={() => setSelectedGroupId(null)}
                className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium transition-colors whitespace-nowrap ${
                  selectedGroupId === null
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : inactiveChip
                }`}
              >
                All
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${selectedGroupId === null ? "bg-white/20 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"}`}>
                  {(valuationQuery || []).length}
                </span>
              </button>

              {/* Group chips */}
              {groups.map((g: any) => {
                const colors = GROUP_COLOR[g.color] || GROUP_COLOR.gray;
                const isActive = selectedGroupId === g.id;
                return (
                  <div key={g.id} className="group relative flex-shrink-0 flex items-center">
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setSelectedGroupId(isActive ? null : g.id)}
                      onKeyDown={(e) => e.key === "Enter" && setSelectedGroupId(isActive ? null : g.id)}
                      className={`flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full border text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                        isActive ? colors.active : inactiveChip
                      }`}
                    >
                      <span className={`h-2.5 w-2.5 rounded-full flex-shrink-0 ${colors.dot}`} />
                      {g.name}
                      <span className="text-xs opacity-70">{g.memberCount}</span>
                      {/* Edit / Delete — shown on chip hover */}
                      <span
                        className="hidden group-hover:flex items-center gap-0.5 border-l border-current border-opacity-30 pl-1.5 ml-0.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          title="Rename"
                          onClick={() => setEditingGroup({ id: g.id, name: g.name, color: g.color })}
                          className="hover:opacity-60 transition-opacity"
                        >
                          <MdEdit size={12} />
                        </button>
                        <button
                          title="Delete"
                          onClick={() => setConfirmDeleteGroupId(g.id)}
                          className="hover:opacity-60 transition-opacity"
                        >
                          <MdClose size={12} />
                        </button>
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* New Group button */}
              <button
                onClick={() => setIsCreateGroupOpen(true)}
                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-dashed border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-500 dark:text-gray-400 hover:border-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors whitespace-nowrap"
              >
                <MdAdd className="h-4 w-4" />
                New Group
              </button>
            </div>
          );
        })()}

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

        {/* Group action bar */}
        {selectedGroupId !== null && (() => {
          const g = groups.find((g: any) => g.id === selectedGroupId);
          if (!g) return null;
          return (
            <div className="flex items-center justify-between mb-5 px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <span className={`h-2.5 w-2.5 rounded-full flex-shrink-0 ${
                  { blue:"bg-blue-500", green:"bg-green-500", red:"bg-red-500", amber:"bg-amber-500", purple:"bg-purple-500", pink:"bg-pink-500", teal:"bg-teal-500", gray:"bg-gray-400" }[g.color as string] || "bg-gray-400"
                }`} />
                <span className="font-semibold text-gray-800 dark:text-white">{g.name}</span>
                <span className="text-gray-400 dark:text-gray-500">·</span>
                <span>{displayedValuations.length} valuation{displayedValuations.length !== 1 ? "s" : ""}</span>
              </div>
              {addableValuations.length > 0 && (
                <button
                  onClick={() => { setIsAddingToGroup(true); setAddGroupSelected(new Set()); setAddGroupSearch(""); }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors"
                >
                  <MdAdd className="h-4 w-4" />
                  Add Valuations
                </button>
              )}
            </div>
          );
        })()}

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
        ) : displayedValuations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-full mb-5">
              <MdFolderOpen className="h-14 w-14 text-indigo-400 dark:text-indigo-500" />
            </div>
            {selectedGroupId !== null ? (
              <>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">This group is empty</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mb-6">Add your saved valuations to start organising them into this group.</p>
                <button
                  onClick={() => { setIsAddingToGroup(true); setAddGroupSelected(new Set()); setAddGroupSearch(""); }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors"
                >
                  <MdAdd className="h-5 w-5" />
                  Add Valuations
                </button>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">No matching valuations</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">Try a different search term or clear your filter.</p>
              </>
            )}
          </div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedValuations.map((item: any) => {
              const marketPrice = marketPriceQueries[valuationQuery.findIndex((v: any) => v.id === item.id)]?.data || 0;

              const valuationDiff = calculateValuationDiff(Number(marketPrice), Number(item.implied_share_price));
              const isUndervalued = valuationDiff > 0;
              const stockName = item.stock_info.find((si: any) => si.id === "shortName")?.value || item.symbol;
              const mrq = getMostRecentQuarter(item.stock_info);

              return (
                <div
                  key={item.id}
                  className={`rounded-xl overflow-hidden shadow-sm bg-white dark:bg-gray-800 border hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
                    selectedItems.includes(item.id)
                      ? "border-indigo-500 ring-2 ring-indigo-200 dark:ring-indigo-800"
                      : "border-gray-200 dark:border-gray-700"
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

                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        {!isDeleteMode && (
                          <GroupPicker
                            groups={groups}
                            membershipSet={new Set<number>(membershipMap[item.id] || [])}
                            onToggle={(groupId, add) => toggleMembershipMutation.mutate({ groupId, valuationId: item.id, add })}
                            size="sm"
                          />
                        )}
                        {isDeleteMode && (
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item.id)}
                            onChange={(e) => handleCheckboxChange(item.id, e)}
                            className="h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300"
                          />
                        )}
                      </div>
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
                                {getTagLabel(tag)}
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
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-24"
                  >
                    Groups
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
                {displayedValuations.map((item: any) => {
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
                                {getTagLabel(tag)}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400 dark:text-gray-500">—</span>
                        )}
                      </td>


                      <td className="px-3 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <GroupPicker
                          groups={groups}
                          membershipSet={new Set<number>(membershipMap[item.id] || [])}
                          onToggle={(groupId, add) => toggleMembershipMutation.mutate({ groupId, valuationId: item.id, add })}
                          size="sm"
                        />
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

      {/* Create Group popout */}
      {isCreateGroupOpen && (
        <CreateGroupPopout
          onClose={() => setIsCreateGroupOpen(false)}
          onSave={async (name, color) => {
            await createGroupMutation.mutateAsync({ name, color });
          }}
          isLoading={createGroupMutation.isPending}
          error={createGroupMutation.error?.message}
          mode="create"
          existingNames={groups.map((g: any) => g.name)}
        />
      )}

      {/* Rename Group popout */}
      {editingGroup && (
        <CreateGroupPopout
          onClose={() => setEditingGroup(null)}
          onSave={async (name, color) => {
            await updateGroupMutation.mutateAsync({ id: editingGroup.id, name, color });
          }}
          isLoading={updateGroupMutation.isPending}
          error={updateGroupMutation.error?.message}
          initialName={editingGroup.name}
          initialColor={editingGroup.color}
          mode="rename"
          existingNames={groups.filter((g: any) => g.id !== editingGroup.id).map((g: any) => g.name)}
        />
      )}

      {/* Delete Group confirmation */}
      {confirmDeleteGroupId !== null && (
        <DeletePopoutPage
          setIsPopoutOpen={() => setConfirmDeleteGroupId(null)}
          handleDelete={() => {
            deleteGroupMutation.mutate(confirmDeleteGroupId);
            setConfirmDeleteGroupId(null);
          }}
        />
      )}

      {/* Add Valuations to Group modal */}
      {isAddingToGroup && selectedGroupId !== null && (() => {
        const g = groups.find((g: any) => g.id === selectedGroupId);
        const DOT: Record<string, string> = { blue:"bg-blue-500", green:"bg-green-500", red:"bg-red-500", amber:"bg-amber-500", purple:"bg-purple-500", pink:"bg-pink-500", teal:"bg-teal-500", gray:"bg-gray-400" };
        const filtered = addableValuations.filter((v: any) => {
          if (!addGroupSearch) return true;
          const name = v.stock_info.find((s: any) => s.id === "shortName")?.value || "";
          return v.symbol.toLowerCase().includes(addGroupSearch.toLowerCase()) || name.toLowerCase().includes(addGroupSearch.toLowerCase());
        });
        const handleConfirm = async () => {
          await Promise.all(
            Array.from(addGroupSelected).map((vid) =>
              toggleMembershipMutation.mutateAsync({ groupId: selectedGroupId, valuationId: vid, add: true })
            )
          );
          setIsAddingToGroup(false);
        };
        return (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col max-h-[80vh] border border-gray-200 dark:border-gray-700">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2.5">
                  {g && <span className={`h-3 w-3 rounded-full flex-shrink-0 ${DOT[g.color] || "bg-gray-400"}`} />}
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Add to <span className="text-indigo-600 dark:text-indigo-400">{g?.name}</span>
                  </h2>
                </div>
                <button onClick={() => setIsAddingToGroup(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                  <MdClose size={22} />
                </button>
              </div>

              {/* Search */}
              <div className="px-6 py-3 border-b border-gray-100 dark:border-gray-800">
                <div className="relative">
                  <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by ticker or name..."
                    value={addGroupSearch}
                    onChange={(e) => setAddGroupSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* List */}
              <div className="overflow-y-auto flex-1 px-3 py-2">
                {filtered.length === 0 ? (
                  <div className="py-12 text-center text-sm text-gray-400 dark:text-gray-500">No valuations found</div>
                ) : (
                  <div className="space-y-1">
                    {filtered.map((v: any) => {
                      const mktIdx = valuationQuery.findIndex((q: any) => q.id === v.id);
                      const mkt = marketPriceQueries[mktIdx]?.data || 0;
                      const diff = mkt ? calculateValuationDiff(Number(mkt), Number(v.implied_share_price)) : null;
                      const name = v.stock_info.find((s: any) => s.id === "shortName")?.value || v.symbol;
                      const checked = addGroupSelected.has(v.id);
                      return (
                        <button
                          key={v.id}
                          onClick={() => setAddGroupSelected((prev) => {
                            const next = new Set(prev);
                            next.has(v.id) ? next.delete(v.id) : next.add(v.id);
                            return next;
                          })}
                          className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all ${
                            checked
                              ? "bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700"
                              : "hover:bg-gray-50 dark:hover:bg-gray-800 border border-transparent"
                          }`}
                        >
                          <div className={`h-5 w-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                            checked ? "bg-indigo-600 border-indigo-600" : "border-gray-300 dark:border-gray-600"
                          }`}>
                            {checked && <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                          </div>
                          <StockLogo symbol={v.symbol} height={36} width={36} alt="logo" className="flex-shrink-0 rounded-lg" />
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-gray-900 dark:text-white text-sm">{v.symbol}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{name}</div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="text-sm font-semibold text-gray-900 dark:text-white">${convRound2Dp(Number(v.implied_share_price))}</div>
                            {diff !== null && (
                              <div className={`text-xs font-medium ${diff >= 0 ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>
                                {diff >= 0 ? "▲" : "▼"} {Math.abs(diff).toFixed(1)}%
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {addGroupSelected.size > 0 ? `${addGroupSelected.size} selected` : "Select valuations to add"}
                </span>
                <div className="flex gap-2">
                  <button onClick={() => setIsAddingToGroup(false)} className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirm}
                    disabled={addGroupSelected.size === 0 || toggleMembershipMutation.isPending}
                    className="px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50 transition-colors"
                  >
                    {toggleMembershipMutation.isPending ? "Adding…" : `Add ${addGroupSelected.size > 0 ? addGroupSelected.size : ""} Valuation${addGroupSelected.size !== 1 ? "s" : ""}`}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </>
  );
}
