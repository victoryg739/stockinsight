import React, { useState } from "react";
import * as conv from "../utils/helper";
import { GoGraph } from "react-icons/go";

const PresentValueTable = ({ data, setIsPopoutOpen, setValuationModelLabel }: any) => {
  const years = ["", "Base year", ...Array.from({ length: 10 }, (_, i) => `Year ${i + 1}`), "Terminal Year"];

  const handlePopout = (label: String) => {
    setIsPopoutOpen(true);
    setValuationModelLabel(label);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right">
        <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
          <tr className="whitespace-nowrap">
            {years.map((year, index) => (
              <th key={index} scope="col" className="px-3 py-3">
                <div className="w-22 overflow-hidden text-ellipsis">{year}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row: any, rowIndex: number) => (
            <tr key={rowIndex} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700">
              <th scope="row" className="pl-3 py-3 font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap flex items-center">
                {row.label}
                <GoGraph
                  className="ml-5 text-gray-500 dark:text-gray-400 cursor-pointer hover:text-blue-500 dark:hover:text-blue-400"
                  onClick={() => handlePopout(row.label)}
                />
              </th>
              {(Array.isArray(row.value) ? row.value : [row.value]).map((col: any, colIndex: number) => (
                <React.Fragment key={colIndex}>
                  {(row.value.length === 11 || row.value.length === 10) && colIndex === 0 && (
                    <td className="px-3 py-3">
                      {" "}
                    </td>
                  )}
                  <td className="px-3 py-3">
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
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PresentValueTable;
