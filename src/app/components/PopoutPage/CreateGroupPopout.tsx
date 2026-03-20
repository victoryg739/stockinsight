"use client";

import React, { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";

const COLORS = [
  { key: "blue",   dot: "bg-blue-500",   ring: "ring-blue-500" },
  { key: "green",  dot: "bg-green-500",  ring: "ring-green-500" },
  { key: "red",    dot: "bg-red-500",    ring: "ring-red-500" },
  { key: "amber",  dot: "bg-amber-500",  ring: "ring-amber-500" },
  { key: "purple", dot: "bg-purple-500", ring: "ring-purple-500" },
  { key: "pink",   dot: "bg-pink-500",   ring: "ring-pink-500" },
  { key: "teal",   dot: "bg-teal-500",   ring: "ring-teal-500" },
  { key: "gray",   dot: "bg-gray-400",   ring: "ring-gray-400" },
];

interface Props {
  onClose: () => void;
  onSave: (name: string, color: string) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  initialName?: string;
  initialColor?: string;
  mode?: "create" | "rename";
  existingNames?: string[];
}

export default function CreateGroupPopout({
  onClose,
  onSave,
  isLoading,
  error,
  initialName = "",
  initialColor = "blue",
  mode = "create",
  existingNames = [],
}: Props) {
  const [name, setName] = useState(initialName);
  const [color, setColor] = useState(initialColor);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    setName(initialName);
    setColor(initialColor);
  }, [initialName, initialColor]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setLocalError("Group name is required.");
      return;
    }
    if (existingNames.some((n) => n.toLowerCase() === name.trim().toLowerCase())) {
      setLocalError("A group with this name already exists.");
      return;
    }
    setLocalError(null);
    await onSave(name.trim(), color);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-[420px] relative border border-gray-200 dark:border-gray-700 mx-4">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {mode === "rename" ? "Rename Group" : "New Group"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <RxCross1 size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              maxLength={50}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Tech Stocks, Favourites, Growth..."
              autoFocus
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Color
            </label>
            <div className="flex gap-2 flex-wrap">
              {COLORS.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setColor(c.key)}
                  className={`h-7 w-7 rounded-full ${c.dot} transition-transform hover:scale-110 ${
                    color === c.key ? `ring-2 ring-offset-2 ${c.ring} dark:ring-offset-gray-800 scale-110` : ""
                  }`}
                  title={c.key}
                />
              ))}
            </div>
          </div>

          {(localError || error) && (
            <p className="text-sm text-red-600 dark:text-red-400 mb-4">{localError || error}</p>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-60 transition-colors"
            >
              {isLoading ? "Saving..." : mode === "rename" ? "Save" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
