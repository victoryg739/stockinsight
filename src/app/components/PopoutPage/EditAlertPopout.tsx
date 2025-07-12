import React, { useState, useRef, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

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

interface EditAlertPopoutProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (alertData: any) => Promise<void>;
  isLoading?: boolean;
  error?: string;
  alert: PriceAlert;
}

export default function EditAlertPopout({
  isOpen,
  onClose,
  onSave,
  isLoading = false,
  error,
  alert,
}: EditAlertPopoutProps) {
  const [targetPrice, setTargetPrice] = useState(alert.target_price.toString());
  const [condition, setCondition] = useState(alert.condition);
  const [expirationDate, setExpirationDate] = useState(alert.expires_at ? alert.expires_at.split("T")[0] : "");
  const [hasExpiration, setHasExpiration] = useState(!!alert.expires_at);
  const [localError, setLocalError] = useState("");

  const popoutRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside the popout
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoutRef.current && !popoutRef.current.contains(event.target as Node)) {
        onClose();
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
        targetPrice: parseFloat(targetPrice),
        condition,
        expiresAt: hasExpiration ? expirationDate : null,
      };

      await onSave(alertData);
    } catch (err) {
      // Error will be handled by the parent component
      console.error("Error in form submission:", err);
    }
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
          <h2 className="text-2xl font-bold text-gray-900">Edit Alert</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <RxCross1 size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Stock Symbol (Read-only) */}
          <div>
            <label htmlFor="symbol" className="block text-sm font-medium text-gray-700 mb-2">
              Stock Symbol
            </label>
            <input
              type="text"
              id="symbol"
              value={alert.symbol}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed"
              disabled
            />
            <p className="text-xs text-gray-500 mt-1">Stock symbol cannot be changed</p>
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

          {/* Alert Type */}
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

          {/* Expiration */}
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
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
