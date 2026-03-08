import React from "react";
import * as conv from "../utils/helper";

const EquityValue = ({ data }: any) => {
  return (
    <div className="overflow-x-auto mt-10">
      <table className="min-w-full bg-white dark:bg-gray-800">
        <tbody>
          {data.map((item: any, index: number) => (
            <tr key={index} className={index % 2 === 0 ? "bg-zinc-200 dark:bg-gray-700" : "bg-white dark:bg-gray-800"}>
              <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">{item.label}</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 text-right">
                {item.id === "impliedSharePrice"
                  ? conv.convRound2Dp(item.value)
                  : item.id === "terminalWACC"
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
