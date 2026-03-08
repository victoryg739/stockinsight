import React, { useEffect } from "react";
import ReadMoreText from "./ReadMoreText";
import StockLogo from "./StockLogo"; 

export default function StockInfo({ stockInfo, setStockInfo, searchedSymbol }: any) {
  return (
    <div>
      {stockInfo.map((item: any, index: number) => {
        if (item.keyStats === false) {
          if (item.id === "shortName") {
            return (
              <div className="flex items-center" key={item.id}>
                <StockLogo symbol={searchedSymbol} height={64} width={64} alt={`${item.value} logo`} />
                <div key={index} className="text-2xl font-bold ml-2">
                  {item.value}
                </div>
              </div>
            );
          } else if (item.id === "country") {
            // Find the currency value
            const currencyItem = stockInfo.find((el: any) => el.id === "currency");
            const currency = currencyItem ? currencyItem.value : "";

            return (
              <div className="mt-2" key={index}>
                {item.value} {currency ? `($${currency})` : ""}
              </div>
            );
          } else if (item.id === "longBusinessSummary") {
            return <ReadMoreText key={index} text={item.value} />;
          }
        }
      })}

      <div className="font-semibold mt-10 dark:text-white">Key Stats:</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-5">
        {stockInfo.map((item: any, index: number) => {
          if (item.keyStats === true) {
            return (
              <div key={index} className="border border-blue-100 dark:border-gray-600 rounded-lg p-2 flex justify-between text-sm bg-blue-50 dark:bg-blue-900/20 dark:text-gray-200">
                <span>{item.label}</span>
                <span className="font-medium">{item.value !== null ? item.value : "--"}</span>
              </div>
            );
          }
          return null; // Make sure to return null if item.keyStats is not true
        })}
      </div>
    </div>
  );
}
