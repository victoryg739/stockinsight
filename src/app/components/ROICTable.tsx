import React from "react";
import * as conv from "../utils/helper";
import CustomTooltip from "./CustomTooltip";

const ROIC_TOOLTIP_EARLY = `**Too high?** Lower your Sales to Capital ratio.

**Too low?** Increase your Sales to Capital ratio.`;

const ROIC_TOOLTIP_YR10 = `## Year 10 ROIC Check
Compare with **industry average ROIC** and **terminal year ROIC**.

If Year 10 ROIC is significantly higher than both benchmarks, review your assumptions.`;

const ROIC_TOOLTIP_TERMINAL = `## Terminal ROIC Default
By default, companies cannot maintain excess returns indefinitely:
- **Terminal ROIC = Year 10 WACC** (Cost of Capital)

If your company has a **strong moat**, you can override this in the Terminal Year ROIC field.`;

const ROICTable = ({ data }: any) => {
  const salesToCap = data.salesToCap || [];
  const investedCapital = data.investedCapital || [];
  const roic = data.roic || [];

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
          {/* Sales to Capital row */}
          <tr className="bg-white border-b hover:bg-gray-200">
            <th scope="row" className="pl-4 py-3 font-medium text-gray-900 whitespace-nowrap">
              Sales to Capital
            </th>
            {years.map((_, index) => (
              <td key={index} className="px-4 py-3">
                {index === 0
                  ? "-"
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
              let tooltipContent = "";
              if (index === 10) {
                tooltipContent = ROIC_TOOLTIP_YR10;
              } else if (index === 11) {
                tooltipContent = ROIC_TOOLTIP_TERMINAL;
              } else if (index >= 0 && index <= 9) {
                tooltipContent = ROIC_TOOLTIP_EARLY;
              }

              return (
                <td key={index} className="px-4 py-3">
                  {index < roic.length ? (
                    <CustomTooltip content={tooltipContent} placement="right">
                      <span className="cursor-help border-b border-dotted border-gray-400">
                        {conv.convRound2Dp(roic[index]) + "%"}
                      </span>
                    </CustomTooltip>
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
