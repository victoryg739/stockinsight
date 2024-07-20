import React from "react";

const DCFTable = ({ data }: any) => {
  return (
    <div className="overflow-x-auto w-4/6 mt-10">
      <table className="min-w-full bg-white">
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.label}</td>
              <td className="px-6 py-4 text-sm text-gray-500 text-right">
                {typeof item.value === "number" ? Number(item.value).toFixed(2) : item.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DCFTable;
