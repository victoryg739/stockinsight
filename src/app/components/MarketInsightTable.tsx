import React from "react";

const TableHeader = ({ children, rowSpan = 1, colSpan = 1 }) => (
  <th
    rowSpan={rowSpan}
    colSpan={colSpan}
    className="bg-gray-200 text-gray-700 font-semibold px-4 py-2 border-b border-gray-300"
  >
    {children}
  </th>
);

const TableCell = ({ children, isHeader = false, id }) => {
  const baseClass = "px-4 py-3 border-b border-gray-200 text-center";
  const headerClass = "font-medium text-gray-700 bg-gray-100";
  const industryClass = "font-medium text-gray-700 bg-gray-100 w-24";

  return id === "industry" ? (
    <td className={`${baseClass} ${industryClass}`}>{children}</td>
  ) : isHeader ? (
    <td className={`${baseClass} ${headerClass}`}>{children}</td>
  ) : (
    <td className={baseClass}>{children}</td>
  );
};

const MarketInsightTable = ({ data }) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg mt-14">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {data.map((header, index) => (
              <TableHeader key={index} colSpan={header.colSpan || 1}>
                {header.label}
              </TableHeader>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-600">
          <tr>
            {data.map((cell, index) => (
              <TableCell key={index} isHeader={cell.isHeader} id={cell.id}>
                {cell.value}
              </TableCell>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MarketInsightTable;
