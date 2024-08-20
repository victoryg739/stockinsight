import React from "react";
import * as conv from "../utils/helper";

const PresentValueTable = ({ data }: any) => {
  const years = ["", "Base year", ...Array.from({ length: 10 }, (_, i) => `Year ${i + 1}`), "Terminal Year"];
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr className="whitespace-nowrap">
            {years.map((year, index) => (
              <th key={index} scope="col" className="px-6 py-3">
                <div className="w-22 overflow-hidden text-ellipsis">{year}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row: any, rowIndex: number) => (
            <tr key={rowIndex} className="bg-white border-b hover:bg-gray-50">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {row.label}
              </th>
              {(Array.isArray(row.value) ? row.value : [row.value]).map((col: any, colIndex: number) => (
                <>
                  {(row.value.length === 11 || row.value.length === 10) && colIndex === 0 && (
                    <td key={`empty-${colIndex}`} className="px-6 py-4">
                      {" "}
                    </td>
                  )}
                  <td key={colIndex} className="px-6 py-4">
                    {row.id === "revenue" ||
                    row.id === "ebit" ||
                    row.id === "ebitAfterTax" ||
                    row.id === "reinvestment" ||
                    row.id === "fcff" ||
                    row.id === "pvFcff"
                      ? conv.convToMillion(col)
                      : row.id === "cumulatedDiscountFactor"
                      ? conv.convRound2Dp(col)
                      : row.id === "ebitMargin" || row.id === "taxRate" || row.id === "wacc" || row.id === "growthRates"
                      ? conv.convRound2Dp(col) + "%"
                      : col}
                  </td>
                </>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PresentValueTable;
