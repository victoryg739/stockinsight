"use client";

import React, { useState, useRef, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { convRound2Dp, convToMillionNumber } from "../../utils/helper";
import StockLogo from "../StockLogo";

const PresentValuePopoutPage = ({ setIsPopoutOpen, data, valuationModelLabel, searchedSymbol, stockInfo }: any) => {
  const shortName = stockInfo.find((el: any) => el.id === "shortName").value;

  const keysToStartWithBaseYear = ["Revenue", "EBIT Margin", "EBIT", "Tax Rate", "EBIT After Tax"];
  const keysValueToMillions = [
    "Revenue",
    "EBIT",
    "EBIT After Tax",
    "Reinvestment",
    "Free Cash Flow to Firm",
    "Present Value of FCFF",
  ];
  const colors = ["#3d37ae", "#82ca9d", "#ff7300", "#413ea0", "#ff6384"];
  const [selectedDataKeys, setSelectedDataKeys] = useState<string[]>([valuationModelLabel]);
  const popoutRef = useRef<HTMLDivElement>(null);

  const handleCheckboxChange = (key: string) => {
    setSelectedDataKeys((prevKeys) =>
      prevKeys.includes(key) ? prevKeys.filter((item) => item !== key) : [...prevKeys, key]
    );
  };

  const transformDataForRecharts = (data: any[]) => {
    const transformedData = [];
    const maxYears = Math.max(...data.map((item) => item.value.length));

    for (let yearIndex = 0; yearIndex < maxYears; yearIndex++) {
      const entry: any = {
        name: yearIndex === 0 ? "Base Year" : yearIndex === maxYears - 1 ? "Terminal Year" : `Y${yearIndex}`,
      };

      data.forEach((item) => {
        const isMillions = keysValueToMillions.includes(item.label);
        const formatter = isMillions ? convToMillionNumber : convRound2Dp;

        if (keysToStartWithBaseYear.includes(item.label)) {
          if (item.value[yearIndex] !== undefined) {
            entry[item.label] = formatter(item.value[yearIndex]);
          }
        } else {
          const adjustedIndex = yearIndex - 1;
          if (adjustedIndex >= 0 && item.value[adjustedIndex] !== undefined) {
            entry[item.label] = formatter(item.value[adjustedIndex]);
          }
        }
      });

      transformedData.push(entry);
    }

    return transformedData;
  };

  const chartData = transformDataForRecharts(data);

  // Close when clicking outside the popout
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoutRef.current && !popoutRef.current.contains(event.target as Node)) {
        setIsPopoutOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsPopoutOpen]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div ref={popoutRef} className="bg-white p-6 rounded-lg shadow-xl w-11/12 h-5/6 overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center ">
            <StockLogo symbol={searchedSymbol} height={50} width={50} className="mr-2" alt="logo" />

            <div className="text-2xl font-bold ml-2">{shortName}</div>
          </div>
          <button onClick={() => setIsPopoutOpen(false)} className="text-gray-500 hover:text-gray-700">
            <RxCross1 size={24} />
          </button>
        </div>

        {/* Checkboxes for Data Selection */}
        <div className="mt-8 flex flex-wrap gap-5">
          {data.map((item: any) => (
            <label key={item.label} className="flex items-center space-x-1 text-sm">
              <input
                type="checkbox"
                checked={selectedDataKeys.includes(item.label)}
                onChange={() => handleCheckboxChange(item.label)}
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>

        <ResponsiveContainer width="100%" height={500} className="mt-8">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" className="text-xs font-semibold" />
            <YAxis yAxisId="left" orientation="left" className="text-xs font-semibold" />
            <YAxis yAxisId="right" orientation="right" className="text-xs font-semibold" />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: "14px" }} />
            {selectedDataKeys.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                fill={colors[index % colors.length]}
                yAxisId={keysValueToMillions.includes(key) ? "left" : "right"}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PresentValuePopoutPage;
