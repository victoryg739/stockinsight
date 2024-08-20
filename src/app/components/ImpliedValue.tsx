import React from "react";
import { convRound2Dp } from "../utils/helper";

const ImpliedValue = ({ title, value, currentPrice }: any) => {
  // Calculate the valuation difference using the new formula
  const valuationDiff = (value / currentPrice - 1) * 100;
  const isOvervalued = valuationDiff < 0; // Negative value indicates overvaluation
  const absValuationDiff = Math.abs(valuationDiff).toFixed(1);

  // Calculate the widths for the bars
  const maxWidth = 100; // Maximum width for the larger value
  const minWidth = 20; // Minimum width for the smaller value to ensure visibility
  let impliedWidth, currentWidth;

  if (isOvervalued) {
    currentWidth = maxWidth;
    impliedWidth = Math.max(minWidth, maxWidth * (value / currentPrice));
  } else {
    impliedWidth = maxWidth;
    currentWidth = Math.max(minWidth, maxWidth * (currentPrice / value));
  }

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md my-16 ">
      <h2 className="text-xl font-bold text-gray-800 mb-4">{title} DCF Value</h2>

      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">Implied Value</span>
          <span className="text-sm font-semibold text-blue-900">${convRound2Dp(value)}</span>
        </div>
        <div className="h-4 bg-blue-500 rounded-full" style={{ width: `${impliedWidth}%` }}></div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">Current Price</span>
          <span className="text-sm font-semibold text-blue-900">${convRound2Dp(currentPrice)}</span>
        </div>
        <div className="h-4 bg-green-500 rounded-full" style={{ width: `${currentWidth}%` }}></div>
      </div>

      <div className={`text-right text-sm font-semibold ${isOvervalued ? "text-red-500" : "text-green-500"}`}>
        {isOvervalued ? "OVERVALUED" : "UNDERVALUED"} by {absValuationDiff}%
      </div>
    </div>
  );
};

export default ImpliedValue;
