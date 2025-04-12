import React from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css"; // Keep this for basic tooltip styling

const InputBox = ({ id, label, value, question, unit, onChange, firstElement }: any) => {
  const isValidNumber = (val: any) => {
    return !isNaN(parseFloat(val)) && isFinite(val);
  };

  return (
    <div className={`relative ${firstElement ? "col-start-1" : ""}`}>
      <div className="flex items-center">
        <label htmlFor={id} className="block text-xs font-medium text-gray-700 mb-1">
          {label}
        </label>
        <Tooltip
          placement="right"
          overlay={
            <div className="max-w-xs bg-gray-800 text-white p-2 rounded shadow-lg">
              <p className="text-sm">
                {question.split("\n").map((line: String, index: any) => (
                  <React.Fragment key={index}>
                    <div style={{ marginBottom: "6px" }}>{line}</div>
                  </React.Fragment>
                ))}
              </p>
            </div>
          }
        >
          <span className="ml-2 cursor-pointer">
            <FaRegQuestionCircle className="text-gray-500" />
          </span>
        </Tooltip>
      </div>
      <div className="relative inline-block w-full">
        <input
          type="text"
          id={id}
          value={value}
          onChange={onChange}
          className={`w-full rounded-md py-2 pl-3 pr-12 ${
            value === 0
              ? "border-amber-400 border-2"
              : isValidNumber(value)
              ? "border-gray-300 border"
              : "border-red-400 border-2"
          }`}
        />
        <span className="absolute right-0 top-0 bottom-0 flex items-center px-2 md:px-3 bg-gray-100 rounded-r-md border">
          {unit}
        </span>
      </div>
    </div>
  );
};

export default InputBox;
