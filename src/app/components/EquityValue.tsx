import React from "react";
import * as conv from "../utils/helper";

const EquityValue = ({ data }: any) => {
  return (
    <div className="overflow-x-auto mt-10">
      <table className="min-w-full bg-white">
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.label}</td>
              <td className="px-6 py-4 text-sm text-gray-500 text-right">
                {item.id === "impliedSharePrice"
                  ? conv.convRound2Dp(item.value)
                  : item.id === "terminalCOC"
                  ? conv.convRound2Dp(item.value) + "%"
                  : conv.convToMillion(item.value)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EquityValue;
