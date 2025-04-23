import React, { useState, useRef, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import * as conv from "../../utils/helper";

export default function SaveValuationPopoutPage({
  setIsPopoutOpen,
  symbol,
  email,
  inputs,
  fetchedInputs,
  stockInfo,
  valuationModel,
  valuationOutput,
  impliedSharePrice,
  mutation,
}: any) {
  const [description, setDescription] = useState("");
  const popoutRef = useRef<HTMLDivElement>(null);

  // Helper function to extract values
  const getInputValue = (id: string, inputArray: any[]): any => {
    const input = inputArray.find((input) => input.id === id);
    return input ? input.value : "N/A";
  };

  // Helper function to get values from valuationModel
  const getModelValue = (id: string, index: number): any => {
    const model = valuationModel.find((m: any) => m.id === id);
    if (!model || !model.value || model.value.length <= index) return "N/A";
    return model.value[index];
  };

  // Helper function to format values
  const formatValue = (value: any, type: string): string => {
    if (value === "N/A") return "N/A";

    switch (type) {
      case "percentage":
        return `${typeof value === "number" ? conv.convRound2Dp(value) : value}%`;
      case "currency":
        return `$${typeof value === "number" ? conv.convToMillion(value) : value}`;
      case "number":
        return typeof value === "number" ? conv.convRound2Dp(value) : value;
      default:
        return String(value);
    }
  };

  // Revenue Growth Values
  const revGrowthY1 = getInputValue("revGrowthYr1", inputs);
  const revGrowthY2to5 = getInputValue("revGrowthYr2to5", inputs);
  const baseRevenue = getInputValue("baseRevenue", fetchedInputs);

  // Margins
  const opMarginYr1 = getInputValue("opMarginYr1", inputs);
  const opMarginYr10 = getInputValue("opMarginYr10", inputs);

  // Sales to Capital
  const salesToCapYr1 = getInputValue("salesToCapYr1", inputs);
  const salesToCapYr2to5 = getInputValue("salesToCapYr2to5", inputs);
  const salesToCapYr6to10 = getInputValue("salesToCapYr6to10", inputs);

  // Calculate sum of PV of FCFF
  const sumOfPVFCFF = valuationOutput.find((output: any) => output.id === "sumOfPVFcff10Yrs")?.value || 0;

  // Get EBIT After Tax values for years 1-10
  const ebitAfterTaxModel = valuationModel.find((m: any) => m.id === "ebitAfterTax");
  const ebitAfterTaxValues = ebitAfterTaxModel?.value || [];

  // Get discount factors for proper PV calculation
  const cumulatedDiscountFactorModel = valuationModel.find((m: any) => m.id === "cumulatedDiscountFactor");
  const cumulatedDiscountFactorValues = cumulatedDiscountFactorModel?.value || [];

  // Calculate sum of PV of EBIT After Tax for years 1-10
  let sumOfEbitAfterTax = 0;
  if (ebitAfterTaxValues.length > 1 && cumulatedDiscountFactorValues.length > 0) {
    // Skip base year (index 0) and take next 10 years
    for (let i = 1; i < Math.min(ebitAfterTaxValues.length, 11); i++) {
      // For each year, multiply EBIT After Tax by the corresponding discount factor
      // Note: cumulatedDiscountFactor array starts at year 1, so we need to use i-1 as index
      const yearEbitAfterTax = ebitAfterTaxValues[i] || 0;
      const discountFactor = cumulatedDiscountFactorValues[i - 1] || 0;
      console.log(yearEbitAfterTax);
      console.log(discountFactor);
      sumOfEbitAfterTax += yearEbitAfterTax * discountFactor;
    }
  }

  // Calculate reinvestment effect
  const reinvestmentEffect = sumOfEbitAfterTax - sumOfPVFCFF;
  const reinvestmentPercentage = sumOfEbitAfterTax !== 0 ? (reinvestmentEffect / sumOfEbitAfterTax) * 100 : 0;

  // WACC values
  const waccValues = valuationModel.find((m: any) => m.id === "wacc")?.value || [];
  const initialWacc = waccValues.length > 0 ? waccValues[0] : getInputValue("initialWacc", fetchedInputs);
  const terminalWacc = waccValues.length > 10 ? waccValues[10] : "N/A";

  const handleSave = () => {
    const nowEpochSeconds = Math.floor(Date.now() / 1000);
    const data = {
      symbol,
      email,
      inputs,
      fetchedInputs,
      stockInfo,
      valuationModel,
      valuationOutput,
      impliedSharePrice,
      description,
      valuedDate: nowEpochSeconds,
    };

    mutation.mutate(data);
    setIsPopoutOpen(false);
  };

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
      <div ref={popoutRef} className="bg-white p-6 rounded-lg shadow-xl w-[800px] h-[700px] overflow-auto relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Valuation Review & Save</h2>

          <button
            onClick={() => {
              setIsPopoutOpen(false);
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <RxCross1 size={24} />
          </button>
        </div>

        <div className="space-y-8 mb-20">
          {/* 1. Revenue Growth Rate */}
          <section>
            <h3 className="text-lg font-semibold mb-3 border-b pb-2">1. Check Revenue Growth Rate</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-gray-100 p-3 rounded-md">
                <div className="text-sm text-gray-600">Year 1</div>
                <div className="text-lg font-semibold">{formatValue(revGrowthY1, "percentage")}</div>
              </div>
              <div className="bg-gray-100 p-3 rounded-md">
                <div className="text-sm text-gray-600">Years 2-5</div>
                <div className="text-lg font-semibold">{formatValue(revGrowthY2to5, "percentage")}</div>
              </div>
              <div className="bg-gray-100 p-3 rounded-md">
                <div className="text-sm text-gray-600">Industry Average</div>
                <div className="text-lg font-semibold">N/A</div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">Key Questions</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>If growth exceeds the industry average, is the company smaller or in a high-growth phase?</li>
                <li>
                  If growth diverges sharply from recent performance, what justifies this change (e.g., new markets,
                  product launches)?
                </li>
              </ul>
            </div>
          </section>

          {/* 2. Dollar Revenues */}
          <section>
            <h3 className="text-lg font-semibold mb-3 border-b pb-2">2.Check Dollar Revenues</h3>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="bg-gray-100 p-3 rounded-md">
                <div className="text-sm text-gray-600">Base Year</div>
                <div className="text-lg font-semibold">{formatValue(baseRevenue, "currency")}</div>
              </div>
              <div className="bg-gray-100 p-3 rounded-md">
                <div className="text-sm text-gray-600">Next Year</div>
                <div className="text-lg font-semibold">{formatValue(getModelValue("revenue", 1), "currency")}</div>
              </div>
              <div className="bg-gray-100 p-3 rounded-md">
                <div className="text-sm text-gray-600">Year 5</div>
                <div className="text-lg font-semibold">{formatValue(getModelValue("revenue", 5), "currency")}</div>
              </div>
              <div className="bg-gray-100 p-3 rounded-md">
                <div className="text-sm text-gray-600">Year 10</div>
                <div className="text-lg font-semibold">{formatValue(getModelValue("revenue", 10), "currency")}</div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">Key Questions</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>What is the total addressable market (TAM) today?</li>
                <li>How do projected revenues compare to current market leaders?</li>
                <li>What market share is assumed by Year 10?</li>
              </ul>
            </div>
          </section>

          {/* 3. Margins */}
          <section>
            <h3 className="text-lg font-semibold mb-3 border-b pb-2">3. Check Your Margins</h3>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="bg-gray-100 p-3 rounded-md">
                <div className="text-sm text-gray-600">Base Year</div>
                <div className="text-lg font-semibold">{formatValue(getModelValue("ebitMargin", 0), "percentage")}</div>
              </div>
              <div className="bg-gray-100 p-3 rounded-md">
                <div className="text-sm text-gray-600">Next Year</div>
                <div className="text-lg font-semibold">{formatValue(getModelValue("ebitMargin", 1), "percentage")}</div>
              </div>
              <div className="bg-gray-100 p-3 rounded-md">
                <div className="text-sm text-gray-600">Year 5</div>
                <div className="text-lg font-semibold">{formatValue(getModelValue("ebitMargin", 5), "percentage")}</div>
              </div>
              <div className="bg-gray-100 p-3 rounded-md">
                <div className="text-sm text-gray-600">Year 10</div>
                <div className="text-lg font-semibold">
                  {formatValue(getModelValue("ebitMargin", 10), "percentage")}
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">Key Questions</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>How do margins compare to industry peers?</li>
                <li>What are the unit economics (cost to produce/sell incremental units)?</li>
                <li>What competitive dynamics could pressure margins (e.g., pricing wars)?</li>
              </ul>
            </div>
          </section>

          {/* 4. Reinvestment Efficiency */}
          <section>
            <h3 className="text-lg font-semibold mb-3 border-b pb-2">4. Check Reinvestment Efficiency</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-gray-100 p-3 rounded-md">
                <div className="text-sm text-gray-600">Sales to Capital (Yr 1)</div>
                <div className="text-lg font-semibold">{formatValue(salesToCapYr1, "number")}</div>
              </div>
              <div className="bg-gray-100 p-3 rounded-md">
                <div className="text-sm text-gray-600">Sales to Capital (Yr 2-5)</div>
                <div className="text-lg font-semibold">{formatValue(salesToCapYr2to5, "number")}</div>
              </div>
              <div className="bg-gray-100 p-3 rounded-md">
                <div className="text-sm text-gray-600">Sales to Capital (Yr 6-10)</div>
                <div className="text-lg font-semibold">{formatValue(salesToCapYr6to10, "number")}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-100 p-3 rounded-md">
                <div className="text-sm text-gray-600">Sum of PV of EBIT After Tax (10 Years)</div>
                <div className="text-lg font-semibold">{formatValue(sumOfEbitAfterTax, "currency")}</div>
              </div>
              <div className="bg-gray-100 p-3 rounded-md">
                <div className="text-sm text-gray-600">Sum of PV of FCFF (10 Years)</div>
                <div className="text-lg font-semibold">{formatValue(sumOfPVFCFF, "currency")}</div>
              </div>
            </div>

            <div className="bg-amber-100 p-3 rounded-md mb-4">
              <div className="text-sm text-gray-800">t Value Effecof Reinvestment (10 Years)</div>
              <div className="text-lg font-semibold">
                {formatValue(reinvestmentEffect, "currency")} ({formatValue(reinvestmentPercentage, "percentage")} of
                EBIT After Tax)
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">Key Questions</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>
                  Is your reinvestment <strong>consistent</strong> with your revenue growth forecast? (high revenue
                  growth should expect significant reinvestment unless asset-light tech companies)
                </li>
                <li>How does return on capital (ROIC) in Year 10 look? (higher ROIC suggests stronger moat)</li>
              </ul>
            </div>
          </section>

          {/* 5. Risk Metrics */}
          <section>
            <h3 className="text-lg font-semibold mb-3 border-b pb-2">5. Risk Metrics</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-gray-100 p-3 rounded-md">
                <div className="text-sm text-gray-600">WACC (Years 1-5)</div>
                <div className="text-lg font-semibold">{formatValue(initialWacc, "percentage")}</div>
              </div>
              <div className="bg-gray-100 p-3 rounded-md">
                <div className="text-sm text-gray-600">Terminal WACC</div>
                <div className="text-lg font-semibold">{formatValue(terminalWacc, "percentage")}</div>
              </div>
              <div className="bg-gray-100 p-3 rounded-md">
                <div className="text-sm text-gray-600">Industry WACC</div>
                <div className="text-lg font-semibold">N/A</div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">Key Questions</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>How does your cost of capital compare to the industry average?</li>
                <li>Is the cost of capital changing over time? If so, why?</li>
              </ul>
            </div>
          </section>

          {/* 6. Description */}
          <section>
            <h3 className="text-lg font-semibold mb-3 border-b pb-2">6. Add Your Analysis</h3>
            <p className="text-sm text-gray-600 mb-3">
              Use this space to document your thoughts on the valuation. Consider addressing the key questions from the
              sections above or any specific insights about this company&apos;s valuation.
            </p>
            <textarea
              className="w-full h-32 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Enter your story for your valuation here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </section>
        </div>

        {/* Save Button (always visible) */}
        <div className=" flex justify-center p-4 bg-white border-t">
          <button
            onClick={handleSave}
            className="bg-green-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-600 transition-colors"
          >
            Save Valuation
          </button>
        </div>
      </div>
    </div>
  );
}
