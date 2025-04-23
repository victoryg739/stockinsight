import React from "react";
import * as conv from "../utils/helper";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css"; // Keep this for basic tooltip styling

const ROICTable = ({ data }: any) => {
  // Extract data from props
  const salesToCap = data.salesToCap || [];
  const investedCapital = data.investedCapital || [];
  const roic = data.roic || [];

  // Create years array for column headers (including Base Year)
  const years = ["Base Year", ...Array.from({ length: 10 }, (_, i) => `Year ${i + 1}`), "Terminal Year"];

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right">
        <thead className="text-xs uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-4 py-3">
              Metric
            </th>
            {years.map((year, index) => (
              <th key={index} scope="col" className="px-4 py-3">
                {year}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Sales to Capital row (skip only base year value) */}
          <tr className="bg-white border-b hover:bg-gray-200">
            <th scope="row" className="pl-4 py-3 font-medium text-gray-900 whitespace-nowrap">
              Sales to Capital
            </th>
            {years.map((_, index) => (
              <td key={index} className="px-4 py-3">
                {index === 0
                  ? "-" // Empty cell for base year
                  : index - 1 < salesToCap.length
                  ? conv.convRound2Dp(salesToCap[index - 1])
                  : "-"}
              </td>
            ))}
          </tr>

          {/* Invested Capital row */}
          <tr className="bg-white border-b hover:bg-gray-200">
            <th scope="row" className="pl-4 py-3 font-medium text-gray-900 whitespace-nowrap">
              Invested Capital
            </th>
            {years.map((_, index) => (
              <td key={index} className="px-4 py-3">
                {index < investedCapital.length ? conv.convToMillion(investedCapital[index]) : "-"}
              </td>
            ))}
          </tr>

          {/* ROIC row with tooltips */}
          <tr className="bg-white border-b hover:bg-gray-200">
            <th scope="row" className="pl-4 py-3 font-medium text-gray-900 whitespace-nowrap">
              Return on Invested Capital
            </th>
            {years.map((_, index) => {
              // Define tooltip content based on year index
              let tooltipContent = "";

              // For Year 10 ROIC cell (index 10)
              if (index === 10) {
                tooltipContent =
                  "Compare with industry average ROIC and terminal year ROIC.\nIf Year 10 ROIC is significantly higher than both benchmarks, check your assumptions.";
              } else if (index == 11) {
                tooltipContent = `By default, we assume companies cannot maintain excess returns indefinitely, hence:
• Terminal ROIC = Year 10 WACC (Cost of Capital)
If your company has a strong moat,you can change this assumption in Terminal Year ROIC`;
              }
              // For Base Year to Year 9 ROIC cells (index 0-9)
              else if (index >= 0 && index <= 9) {
                tooltipContent =
                  "If ROIC is too high: lower your Sales to Capital ratio.\nIf ROIC is too low: increase your Sales to Capital ratio.";
              }

              return (
                <td key={index} className="px-4 py-3">
                  {index < roic.length ? (
                    <Tooltip
                      placement="right"
                      overlay={
                        <div className="max-w-xs bg-gray-800 text-white p-2 rounded shadow-lg">
                          <p className="text-sm">
                            {tooltipContent.split("\n").map((line, i) => (
                              <React.Fragment key={i}>
                                <div style={{ marginBottom: "6px" }}>{line}</div>
                              </React.Fragment>
                            ))}
                          </p>
                        </div>
                      }
                    >
                      <span className="cursor-help">{conv.convRound2Dp(roic[index]) + "%"}</span>
                    </Tooltip>
                  ) : (
                    "-"
                  )}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ROICTable;
