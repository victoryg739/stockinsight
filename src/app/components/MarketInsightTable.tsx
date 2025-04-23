import React from "react";

const MarketInsightTable = ({ data }: any) => {
  // Helper function to format values properly
  const formatValue = (value: any) => {
    if (typeof value === "string" && (value.endsWith("%") || value === "N/A")) {
      return value;
    }

    // If it's a number, format it properly
    const num = parseFloat(value);
    if (!isNaN(num)) {
      return num.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }

    return value;
  };

  // Find the table header and section dividers
  const tableHeader = data.find((item: any) => item.isHeader && item.id !== "industry");
  const industrySection = data.find((item: any) => item.id === "industry");
  const industryIndex = data.findIndex((item: any) => item.id === "industry");

  // Group items into company metrics and industry metrics
  const companyMetrics = industryIndex > 0 ? data.slice(1, industryIndex) : data.filter((item: any) => !item.isHeader);

  const industryMetrics = industryIndex > 0 ? data.slice(industryIndex + 1) : [];

  return (
    <div className="overflow-hidden rounded-lg shadow-lg mt-8 border border-gray-200">
      {/* Title Header */}
      {tableHeader && (
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white px-6 py-2.5 font-semibold text-lg">
          {tableHeader.value}
        </div>
      )}

      <div className="divide-y divide-gray-200">
        {/* Company Metrics Section */}
        <div className="bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-3">
            {companyMetrics.map((item: any) => (
              <div key={item.id} className="flex flex-col p-2 rounded-md hover:bg-gray-50">
                <span className="text-sm text-gray-500 font-medium mb-1">{item.label}</span>
                <span className="text-md font-mono font-medium text-blue-600">{formatValue(item.value)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Industry Metrics Section */}
        {industrySection && industryMetrics.length > 0 && (
          <div className="bg-gray-50">
            <div className="px-6 py-1.5 font-semibold text-gray-700 bg-gray-100 border-b border-gray-200">
              {industrySection.value}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-3">
              {industryMetrics.map((item: any) => (
                <div key={item.id} className="flex flex-col p-1 rounded-md hover:bg-gray-100">
                  <span className="text-sm text-gray-500 font-medium mb-1">{item.label}</span>
                  <span className="text-md font-mono font-medium text-indigo-600">{formatValue(item.value)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketInsightTable;
