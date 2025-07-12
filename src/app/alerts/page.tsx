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
import { fetchMarketPrice } from "../utils/queryAPIFunctions";

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

  // Test alerts mutation
  const testAlertsMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/test-alerts", {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Failed to test alerts");
      }
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["priceAlerts"] });
      console.log("Test alerts result:", data);
      alert(
        `Alert check completed! Checked: ${data.result.checked} symbols, Triggered: ${data.result.triggered} alerts`
      );
    },
    onError: (error) => {
      console.error("Test alerts error:", error);
      alert("Error testing alerts. Check console for details.");
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
          <div key={i} className="h-28 bg-gray-200 rounded-xl"></div>
        ))}
      </div>
      <div className="h-16 bg-gray-200 rounded-xl mb-6"></div>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="h-64 bg-gray-200"></div>
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
            <h1 className="text-3xl font-bold text-gray-900">Price Alerts</h1>
            <p className="mt-1 text-sm text-gray-500">
              Monitor your stocks and get notified when they reach your target prices
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => queryClient.refetchQueries({ queryKey: ["priceAlerts"] })}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Refresh
            </button>
            <button
              onClick={() => testAlertsMutation.mutate()}
              disabled={testAlertsMutation.isPending}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {testAlertsMutation.isPending ? "Testing..." : "Test Alerts"}
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

        {/* Main Content */}
        {!alertsLoading && !alertsError && status === "authenticated" && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Current Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Target Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Alert Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Expires
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {!alerts || alerts.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center">
                          <div className="bg-indigo-100 p-6 rounded-full mb-6">
                            <MdAdd className="h-16 w-16 text-indigo-600" />
                          </div>
                          <p className="text-lg font-medium">No alerts yet</p>
                          <p className="text-sm">Create your first price alert to get started</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    alerts.map((alert, index) => {
                      const marketPrice = marketPriceQueries[index]?.data || 0;

                      return (
                        <tr key={alert.id} className="hover:bg-gray-50">
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
                                <div className="text-sm font-medium text-gray-900">{alert.symbol}</div>
                                <div className="text-sm text-gray-500">Stock Symbol</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {marketPrice ? (
                              formatPrice(marketPrice)
                            ) : (
                              <div className="animate-pulse">
                                <div className="h-4 bg-gray-200 rounded w-16"></div>
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatPrice(Number(alert.target_price))}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {getConditionIcon(alert.condition)}
                              <span className="ml-2 text-sm text-gray-900">
                                {alert.condition === "ABOVE" ? "Above" : "Below"}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={getStatusBadge(alert.status)}>{alert.status}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(alert.created_at)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(alert.expires_at)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditAlert(alert)}
                                className="text-blue-600 hover:text-blue-900"
                                title="Edit alert"
                              >
                                <MdEdit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteAlert(alert)}
                                className="text-red-600 hover:text-red-900"
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
    </>
  );
}
