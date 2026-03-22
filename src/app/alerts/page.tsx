"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useQuery, useMutation, useQueryClient, useQueries } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import NewAlertPopout from "../components/PopoutPage/NewAlertPopout";
import EditAlertPopout from "../components/PopoutPage/EditAlertPopout";
import DeletePopoutPage from "../components/PopoutPage/DeletePopoutPage";
import Navbar from "../components/Navbar";
import StockLogo from "../components/StockLogo";
import { fetchMarketPrice, fetchValuations } from "../utils/queryAPIFunctions";

interface PriceAlert {
  id: number;
  email: string;
  symbol: string;
  target_price: number;
  condition: string;
  status: string;
  created_at: string;
  expires_at: string | null;
  triggered_at: string | null;
}

// API Functions
const fetchPriceAlerts = async (): Promise<PriceAlert[]> => {
  const response = await fetch("/api/price-alerts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized");
    }
    throw new Error("Failed to fetch price alerts");
  }

  return response.json();
};

const createPriceAlert = async (alertData: any) => {
  const response = await fetch("/api/price-alerts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(alertData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create price alert");
  }

  return response.json();
};

const updatePriceAlert = async (id: number, alertData: any) => {
  const response = await fetch(`/api/price-alerts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(alertData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to update price alert");
  }

  return response.json();
};

const deletePriceAlert = async (id: number) => {
  const response = await fetch(`/api/price-alerts/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to delete price alert");
  }

  return response.json();
};

export default function AlertsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isNewAlertOpen, setIsNewAlertOpen] = useState(false);
  const [isEditAlertOpen, setIsEditAlertOpen] = useState(false);
  const [editingAlert, setEditingAlert] = useState<PriceAlert | null>(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [alertToDelete, setAlertToDelete] = useState<PriceAlert | null>(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedAlerts, setSelectedAlerts] = useState<Set<number>>(new Set());
  const [isMassDeletePopupOpen, setIsMassDeletePopupOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"ALL" | "ACTIVE" | "TRIGGERED" | "CANCELLED">("ALL");
  const [groupFilter, setGroupFilter] = useState<number | null>(null);

  // Debug logging (remove in production)
  React.useEffect(() => {
    console.log("Session status:", status);
    console.log("Session data:", session);
  }, [status, session]);

  const {
    data: alerts,
    isLoading: alertsLoading,
    error: alertsError,
  } = useQuery({
    queryKey: ["priceAlerts"],
    queryFn: fetchPriceAlerts,
    enabled: !!session?.user?.email && status === "authenticated",
    retry: (failureCount, error) => {
      // Don't retry on auth errors
      if (error.message === "Unauthorized") {
        return false;
      }
      return failureCount < 3;
    },
  });

  const { data: groups } = useQuery({
    queryKey: ["valuationGroups"],
    queryFn: () => fetch("/api/valuation-groups").then((r) => r.json()),
    enabled: !!session?.user?.email && status === "authenticated",
  });

  const { data: allValuations } = useQuery({
    queryKey: ["allValuations"],
    queryFn: () => fetchValuations(""),
    enabled: !!session?.user?.email && status === "authenticated",
  });

  // Fetch market prices for all alerts
  const marketPriceQueries = useQueries({
    queries: (alerts || []).map((alert: PriceAlert) => ({
      queryKey: ["marketPrice", alert.symbol],
      queryFn: () => fetchMarketPrice(alert.symbol),
      enabled: !!alert.symbol,
    })),
  });

  // Create alert mutation
  const createAlertMutation = useMutation({
    mutationFn: createPriceAlert,
    onSuccess: async () => {
      // Invalidate and refetch the alerts
      await queryClient.invalidateQueries({ queryKey: ["priceAlerts"] });
      await queryClient.refetchQueries({ queryKey: ["priceAlerts"] });
      setIsNewAlertOpen(false);
    },
    onError: (error) => {
      console.error("Error creating alert:", error);
    },
  });

  // Update alert mutation
  const updateAlertMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => updatePriceAlert(id, data),
    onSuccess: async () => {
      // Invalidate and refetch the alerts
      await queryClient.invalidateQueries({ queryKey: ["priceAlerts"] });
      await queryClient.refetchQueries({ queryKey: ["priceAlerts"] });
      setIsEditAlertOpen(false);
      setEditingAlert(null);
    },
    onError: (error) => {
      console.error("Error updating alert:", error);
    },
  });

  // Delete alert mutation
  const deleteAlertMutation = useMutation({
    mutationFn: deletePriceAlert,
    onSuccess: async () => {
      // Invalidate and refetch the alerts
      await queryClient.invalidateQueries({ queryKey: ["priceAlerts"] });
      await queryClient.refetchQueries({ queryKey: ["priceAlerts"] });
      setIsDeletePopupOpen(false);
      setAlertToDelete(null);
    },
    onError: (error) => {
      console.error("Error deleting alert:", error);
    },
  });

  // Additional debug logging for alerts data
  React.useEffect(() => {
    console.log("Alerts loading:", alertsLoading);
    console.log("Alerts data:", alerts);
    console.log("Alerts error:", alertsError);
  }, [alertsLoading, alerts, alertsError]);

  const handleEditAlert = (alert: PriceAlert) => {
    setEditingAlert(alert);
    setIsEditAlertOpen(true);
  };

  const handleDeleteAlert = (alert: PriceAlert) => {
    setAlertToDelete(alert);
    setIsDeletePopupOpen(true);
  };

  const confirmDelete = () => {
    if (alertToDelete) {
      deleteAlertMutation.mutate(alertToDelete.id);
    }
  };

  const toggleDeleteMode = () => {
    setIsDeleteMode((prev) => !prev);
    setSelectedAlerts(new Set());
  };

  // Derived data
  const marketPriceBySymbol: Record<string, number> = {};
  (alerts || []).forEach((alert, i) => {
    const price = marketPriceQueries[i]?.data;
    if (price !== undefined) marketPriceBySymbol[alert.symbol] = price;
  });

  // Build a set of symbols in the selected group
  const groupFilterSymbols: Set<string> | null = (() => {
    if (groupFilter === null || !groups || !allValuations) return null;
    const group = (groups as any[]).find((g) => g.id === groupFilter);
    if (!group) return null;
    const idToSymbol: Record<number, string> = {};
    (allValuations as any[]).forEach((v) => {
      idToSymbol[v.id] = v.symbol;
    });
    return new Set<string>(group.memberIds.map((id: number) => idToSymbol[id]).filter(Boolean));
  })();

  const filteredAlerts = (alerts || []).filter((a) => {
    if (statusFilter !== "ALL" && a.status !== statusFilter) return false;
    if (groupFilterSymbols !== null && !groupFilterSymbols.has(a.symbol)) return false;
    return true;
  });

  const toggleSelectAll = () => {
    if (selectedAlerts.size === filteredAlerts.length) {
      setSelectedAlerts(new Set());
    } else {
      setSelectedAlerts(new Set(filteredAlerts.map((a) => a.id)));
    }
  };

  const toggleSelectAlert = (id: number) => {
    setSelectedAlerts((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const confirmMassDelete = async () => {
    await Promise.all([...selectedAlerts].map((id) => deletePriceAlert(id)));
    await queryClient.invalidateQueries({ queryKey: ["priceAlerts"] });
    await queryClient.refetchQueries({ queryKey: ["priceAlerts"] });
    setIsMassDeletePopupOpen(false);
    setSelectedAlerts(new Set());
    setIsDeleteMode(false);
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case "ACTIVE":
        return `${baseClasses} bg-green-100 text-green-800`;
      case "TRIGGERED":
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case "CANCELLED":
        return `${baseClasses} bg-gray-100 text-gray-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getConditionIcon = (condition: string) => {
    return condition === "ABOVE" ? <FaArrowUp className="text-green-500" /> : <FaArrowDown className="text-red-500" />;
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "No expiration";
    return new Date(dateString).toLocaleDateString();
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  // Authentication check
  if (status === "unauthenticated") {
    router.push("/");
    return null;
  }

  // Loading State Component (using the same design as myValuations)
  const LoadingState = () => (
    <div className="mt-10 animate-pulse space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-28 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
        ))}
      </div>
      <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-xl mb-6"></div>
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <div className="h-64 bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </div>
  );

  // Error State Component
  const ErrorState = ({ error }: { error: any }) => (
    <div className="mt-10 text-center">
      <div className="bg-red-100 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Alerts</h3>
        <p className="text-red-600">{error?.message || "An unexpected error occurred"}</p>
        <button
          onClick={() => queryClient.invalidateQueries({ queryKey: ["priceAlerts"] })}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Price Alerts</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Monitor your stocks and get notified when they reach your target prices
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => queryClient.refetchQueries({ queryKey: ["priceAlerts"] })}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Refresh
            </button>
            {isDeleteMode && selectedAlerts.size > 0 && (
              <button
                onClick={() => setIsMassDeletePopupOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <MdDelete className="mr-1 h-4 w-4" />
                Delete ({selectedAlerts.size})
              </button>
            )}
            <button
              onClick={toggleDeleteMode}
              className={`inline-flex items-center px-4 py-2 border text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors ${
                isDeleteMode
                  ? "border-red-500 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30"
                  : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              <MdDelete className="mr-1 h-4 w-4" />
              {isDeleteMode ? "Cancel" : "Select"}
            </button>
            <button
              onClick={() => setIsNewAlertOpen(true)}
              className="inline-flex items-center px-5 py-2.5 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <MdAdd className="mr-1 h-5 w-5" />
              New Alert
            </button>
          </div>
        </div>

        {/* Loading State */}
        {(alertsLoading || status === "loading") && <LoadingState />}

        {/* Error State */}
        {alertsError && !alertsLoading && <ErrorState error={alertsError} />}

        {/* Status filter pills + group filter */}
        {!alertsLoading && !alertsError && status === "authenticated" && (
          <div className="flex flex-col gap-4 mb-4">
            <div className="flex items-center gap-3 flex-wrap">
              {(["ALL", "ACTIVE", "TRIGGERED", "CANCELLED"] as const).map((s) => {
                const count = s === "ALL" ? (alerts || []).length : (alerts || []).filter((a) => a.status === s).length;
                const active = statusFilter === s;
                return (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      active
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {s === "ALL" ? "All" : s.charAt(0) + s.slice(1).toLowerCase()}
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded-full ${active ? "bg-white/20 text-white" : "bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400"}`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
            {(groups as any[] | undefined)?.length
              ? (() => {
                  const GROUP_COLOR = {
                    blue: {
                      dot: "bg-blue-500",
                      active:
                        "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-300 dark:border-blue-600",
                    },
                    green: {
                      dot: "bg-green-500",
                      active:
                        "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 border-green-300 dark:border-green-600",
                    },
                    red: {
                      dot: "bg-red-500",
                      active:
                        "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 border-red-300 dark:border-red-600",
                    },
                    amber: {
                      dot: "bg-amber-500",
                      active:
                        "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-amber-300 dark:border-amber-600",
                    },
                    purple: {
                      dot: "bg-purple-500",
                      active:
                        "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 border-purple-300 dark:border-purple-600",
                    },
                    pink: {
                      dot: "bg-pink-500",
                      active:
                        "bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300 border-pink-300 dark:border-pink-600",
                    },
                    teal: {
                      dot: "bg-teal-500",
                      active:
                        "bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300 border-teal-300 dark:border-teal-600",
                    },
                    gray: {
                      dot: "bg-gray-400",
                      active:
                        "bg-gray-100 text-gray-700 dark:bg-gray-700/60 dark:text-gray-300 border-gray-300 dark:border-gray-600",
                    },
                  } as Record<string, { dot: string; active: string }>;
                  const inactiveChip =
                    "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700";
                  return (
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 scroll-smooth flex-wrap">
                      <button
                        onClick={() => setGroupFilter(null)}
                        className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium transition-colors whitespace-nowrap ${
                          groupFilter === null ? "bg-indigo-600 text-white border-indigo-600" : inactiveChip
                        }`}
                      >
                        All Groups
                      </button>
                      {(groups as any[]).map((group) => {
                        const colors = GROUP_COLOR[group.color] || GROUP_COLOR.gray;
                        const isActive = groupFilter === group.id;
                        return (
                          <button
                            key={group.id}
                            onClick={() => setGroupFilter(isActive ? null : group.id)}
                            className={`flex-shrink-0 flex items-center gap-2 pl-3 pr-3 py-1.5 rounded-full border text-sm font-medium transition-colors whitespace-nowrap ${
                              isActive ? colors.active : inactiveChip
                            }`}
                          >
                            <span className={`h-2.5 w-2.5 rounded-full flex-shrink-0 ${colors.dot}`} />
                            {group.name}
                          </button>
                        );
                      })}
                    </div>
                  );
                })()
              : null}
          </div>
        )}

        {/* Main Content */}
        {!alertsLoading && !alertsError && status === "authenticated" && (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    {isDeleteMode && (
                      <th className="px-4 py-3 w-10">
                        <input
                          type="checkbox"
                          checked={filteredAlerts.length > 0 && selectedAlerts.size === filteredAlerts.length}
                          onChange={toggleSelectAll}
                          className="h-4 w-4 text-red-600 border-gray-300 dark:border-gray-600 rounded"
                        />
                      </th>
                    )}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Current Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Target Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Alert Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Expires
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredAlerts.length === 0 ? (
                    <tr>
                      <td
                        colSpan={isDeleteMode ? 9 : 8}
                        className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                      >
                        <div className="flex flex-col items-center">
                          <div className="bg-indigo-100 dark:bg-indigo-900/30 p-6 rounded-full mb-6">
                            <MdAdd className="h-16 w-16 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          {statusFilter !== "ALL" ? (
                            <>
                              <p className="text-lg font-medium">No {statusFilter.toLowerCase()} alerts</p>
                              <p className="text-sm">Try a different filter or create a new alert</p>
                            </>
                          ) : (
                            <>
                              <p className="text-lg font-medium">No alerts yet</p>
                              <p className="text-sm">Create your first price alert to get started</p>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredAlerts.map((alert) => {
                      const marketPrice = marketPriceBySymbol[alert.symbol] || 0;

                      return (
                        <tr
                          key={alert.id}
                          onClick={isDeleteMode ? () => toggleSelectAlert(alert.id) : undefined}
                          className={`${isDeleteMode ? "cursor-pointer select-none" : ""} hover:bg-gray-50 dark:hover:bg-gray-700/50 ${isDeleteMode && selectedAlerts.has(alert.id) ? "bg-red-50 dark:bg-red-900/10" : ""}`}
                        >
                          {isDeleteMode && (
                            <td className="px-4 py-4 w-10">
                              <input
                                type="checkbox"
                                checked={selectedAlerts.has(alert.id)}
                                onChange={() => toggleSelectAlert(alert.id)}
                                className="h-4 w-4 text-red-600 border-gray-300 dark:border-gray-600 rounded"
                              />
                            </td>
                          )}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 relative mr-3">
                                <StockLogo
                                  symbol={alert.symbol}
                                  height={40}
                                  width={40}
                                  className="rounded-lg"
                                  alt={`${alert.symbol} logo`}
                                />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">{alert.symbol}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">Stock Symbol</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                            {marketPrice ? (
                              formatPrice(marketPrice)
                            ) : (
                              <div className="animate-pulse">
                                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-16"></div>
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                            {formatPrice(Number(alert.target_price))}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {getConditionIcon(alert.condition)}
                              <span className="ml-2 text-sm text-gray-900 dark:text-gray-100">
                                {alert.condition === "ABOVE" ? "Above" : "Below"}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={getStatusBadge(alert.status)}>{alert.status}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(alert.created_at)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(alert.expires_at)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditAlert(alert)}
                                className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                                title="Edit alert"
                              >
                                <MdEdit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteAlert(alert)}
                                className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                                title="Delete alert"
                                disabled={deleteAlertMutation.isPending}
                              >
                                <MdDelete className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* New Alert Popout */}
      {isNewAlertOpen && (
        <NewAlertPopout
          isOpen={isNewAlertOpen}
          onClose={() => setIsNewAlertOpen(false)}
          onSave={async (alertData: any) => {
            try {
              await createAlertMutation.mutateAsync(alertData);
            } catch (error) {
              console.error("Error creating alert:", error);
              // Error will be handled by the mutation's onError callback
            }
          }}
          isLoading={createAlertMutation.isPending}
          error={createAlertMutation.error?.message}
        />
      )}

      {/* Edit Alert Popout */}
      {isEditAlertOpen && editingAlert && (
        <EditAlertPopout
          isOpen={isEditAlertOpen}
          onClose={() => {
            setIsEditAlertOpen(false);
            setEditingAlert(null);
          }}
          onSave={async (alertData: any) => {
            try {
              await updateAlertMutation.mutateAsync({
                id: editingAlert.id,
                data: alertData,
              });
            } catch (error) {
              console.error("Error updating alert:", error);
              // Error will be handled by the mutation's onError callback
            }
          }}
          isLoading={updateAlertMutation.isPending}
          error={updateAlertMutation.error?.message}
          alert={editingAlert}
        />
      )}

      {/* Delete Confirmation Popout */}
      {isDeletePopupOpen && alertToDelete && (
        <DeletePopoutPage setIsPopoutOpen={setIsDeletePopupOpen} handleDelete={confirmDelete} />
      )}

      {/* Mass Delete Confirmation Popout */}
      {isMassDeletePopupOpen && (
        <DeletePopoutPage setIsPopoutOpen={setIsMassDeletePopupOpen} handleDelete={confirmMassDelete} />
      )}
    </>
  );
}
