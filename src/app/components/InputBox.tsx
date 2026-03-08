import React from "react";
import CustomTooltip from "./CustomTooltip";

const InputBox = ({ id, label, value, question, unit, onChange, firstElement }: any) => {
  const isValidNumber = (val: any) => {
    return !isNaN(parseFloat(val)) && isFinite(val);
  };

  return (
    <div className={`relative ${firstElement ? "col-start-1" : ""}`}>
      <div className="flex items-center">
        <label htmlFor={id} className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
        <CustomTooltip content={question} placement="right" />
      </div>
      <div className="relative inline-block w-full">
        <input
          type="text"
          id={id}
          value={value}
          onChange={onChange}
          className={`w-full rounded-md py-2 pl-3 pr-12 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
            value === 0
              ? "border-amber-400 border-2"
              : isValidNumber(value)
              ? "border-gray-300 dark:border-gray-500 border"
              : "border-red-400 border-2"
          }`}
        />
        <span className="absolute right-0 top-0 bottom-0 flex items-center px-2 md:px-3 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-r-md border border-gray-300 dark:border-gray-500">
          {unit}
        </span>
      </div>
    </div>
  );
};

export default InputBox;
