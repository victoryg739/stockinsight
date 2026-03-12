import React, { useState, useRef, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import * as conv from "../../utils/helper";
import { useQuery } from "@tanstack/react-query";
import * as queryFn from "../../utils/queryAPIFunctions";
import * as finCalc from "../../utils/financialCalculations";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

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
  industryOptions,
  roicData,
  mutation,
}: any) {
  const [description, setDescription] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [customTagInput, setCustomTagInput] = useState("");
  const [customTagColor, setCustomTagColor] = useState("blue");

  const PRESET_TAGS = [
    { label: "Base Case",    style: "bg-blue-100 text-blue-700 border-blue-300" },
    { label: "Bull Case",    style: "bg-green-100 text-green-700 border-green-300" },
    { label: "Bear Case",    style: "bg-red-100 text-red-700 border-red-300" },
    { label: "Conservative", style: "bg-amber-100 text-amber-700 border-amber-300" },
  ];

  const TAG_COLORS = [
    { key: "blue",   style: "bg-blue-100 text-blue-700 border-blue-300",     dot: "bg-blue-500" },
    { key: "green",  style: "bg-green-100 text-green-700 border-green-300",   dot: "bg-green-500" },
    { key: "red",    style: "bg-red-100 text-red-700 border-red-300",         dot: "bg-red-500" },
    { key: "amber",  style: "bg-amber-100 text-amber-700 border-amber-300",   dot: "bg-amber-500" },
    { key: "purple", style: "bg-purple-100 text-purple-700 border-purple-300", dot: "bg-purple-500" },
    { key: "pink",   style: "bg-pink-100 text-pink-700 border-pink-300",      dot: "bg-pink-500" },
    { key: "teal",   style: "bg-teal-100 text-teal-700 border-teal-300",      dot: "bg-teal-500" },
    { key: "gray",   style: "bg-gray-100 text-gray-600 border-gray-300",      dot: "bg-gray-400" },
  ];

  const getTagDisplayLabel = (tag: string) => tag.split("|")[0];

  const getTagColorStyle = (tag: string) => {
    const [label, colorKey] = tag.split("|");
    const preset = PRESET_TAGS.find((p) => p.label === label);
    if (preset) return preset.style;
    const color = TAG_COLORS.find((c) => c.key === colorKey);
    return color ? color.style : "bg-gray-100 text-gray-600 border-gray-300";
  };

  const togglePresetTag = (label: string) => {
    setTags((prev) => prev.includes(label) ? prev.filter((t) => t !== label) : [...prev, label]);
  };

  const addCustomTag = () => {
    const trimmed = customTagInput.trim();
    if (!trimmed) return;
    const alreadyExists = tags.some((t) => t.split("|")[0] === trimmed);
    if (!alreadyExists) {
      setTags((prev) => [...prev, trimmed + "|" + customTagColor]);
    }
    setCustomTagInput("");
  };
  const popoutRef = useRef<HTMLDivElement>(null);

  // Get industry from stockInfo for API calls
  const { data: roicStats } = useQuery({
    queryKey: ["roic", industryOptions],
    queryFn: async () => {
      return queryFn.fetchRoic(industryOptions);
    },
  });

  const { data: inputStats } = useQuery({
    queryKey: ["inputStats", industryOptions],
    queryFn: async () => {
      return queryFn.fetchInputStats(industryOptions);
    },
  });

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
    if (value === "N/A" || value === undefined || value === null) return "N/A";

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

  // Calculate sum of PV of FCFF
  const sumOfPVFCFF = valuationOutput.find((output: any) => output.id === "sumOfPVFcff10Yrs")?.value || 0;

  // Get EBIT After Tax values for years 1-10
  const ebitAfterTaxModel = valuationModel.find((m: any) => m.id === "ebitAfterTax");
  const ebitAfterTaxValues = ebitAfterTaxModel?.value || [];

  const cumulatedDiscountFactorModel = valuationModel.find((m: any) => m.id === "cumulatedDiscountFactor");
  const cumulatedDiscountFactorValues = cumulatedDiscountFactorModel?.value || [];

  // Calculate sum of PV of EBIT After Tax for years 1-10
  let sumOfEbitAfterTax = 0;
  if (ebitAfterTaxValues.length > 1 && cumulatedDiscountFactorValues.length > 0) {
    // Skip base year (index 0) and take next 10 years
    for (let i = 1; i < Math.min(ebitAfterTaxValues.length, 11); i++) {
      // For each year, multiply EBIT After Tax by the corresponding discount factor
      const yearEbitAfterTax = ebitAfterTaxValues[i] || 0;
      const discountFactor = cumulatedDiscountFactorValues[i - 1] || 0;
      sumOfEbitAfterTax += yearEbitAfterTax * discountFactor;
    }
  }

  // Calculate reinvestment effect
  const reinvestmentEffect = sumOfEbitAfterTax - sumOfPVFCFF;
  const reinvestmentPercentage = sumOfEbitAfterTax !== 0 ? (reinvestmentEffect / sumOfEbitAfterTax) * 100 : 0;

  //Calculate
  const marginalRoic = finCalc.calcMarginalRoic(
    valuationModel.find((m: any) => m.id === "ebitAfterTax")?.value,
    roicData.investedCapital
  );

  // Get terminal WACC for ROIC comparison
  const terminalWACC = getModelValue("wacc", 10);

  const generateTemplate = () => {
    // Get key values for the framework
    const revGrowthYr1 = getInputValue("revGrowthYr1", inputs);
    const revGrowthYr2to5 = getInputValue("revGrowthYr2to5", inputs);
    const termGrowthRate = getInputValue("revGrowthPerpetuity", inputs);
    const opMargin = getInputValue("opMarginYr1", inputs);
    const opMarginYr10 = getInputValue("opMarginYr10", inputs);
    const terminalWACC = valuationOutput?.find((item: any) => item.id === "terminalWACC")?.value || 0;
    const equityValue = valuationOutput?.find((item: any) => item.id === "equityValueCommonStock")?.value || 0;
    const currentPrice = getInputValue("currentSharePrice", fetchedInputs);
    const shareCount = getInputValue("impliedSharesOutstanding", fetchedInputs);

    // Calculate values
    const impliedSharePrice = equityValue / shareCount;
    const valGap = (impliedSharePrice / currentPrice - 1) * 100;

    const framework = `## Growth Story (Revenue)
The company is expected to grow revenues at ${revGrowthYr1}% in year 1 and ${revGrowthYr2to5}% in years 2-5, before converging to a terminal growth rate of ${termGrowthRate}%.

[Explain what drives this growth - new products, market expansion, etc.]
[Discuss how this growth compares to ${industryOptions} peers and historical performance]

## Profitability Story (Margin)
Starting from a base operating margin of ${
      typeof opMargin === "number" ? opMargin.toFixed(2) : opMargin
    }%, the company is expected to reach ${
      typeof opMarginYr10 === "number" ? opMarginYr10.toFixed(2) : opMarginYr10
    }% in year 10.

[Explain what will drive margin improvement/deterioration - economies of scale, competition, etc.]
[Address any operational efficiencies or challenges]

## Growth Efficiency Story
The company's Sales to Capital ratio indicates how efficiently it converts invested capital into revenue.

[Discuss the company's Sales to Capital ratio in Years 1, 2-5, and 6-10]
[Explain how these ratios compare to industry averages]

## Competitive Advantages
The company's Terminal ROIC of ${formatValue(
      roicData.roic[roicData.roic.length - 1],
      "percentage"
    )} and ROIC (Yr 10) of ${formatValue(roicData.roic[roicData.roic.length - 2], "percentage")} 

The Marginal ROIC of ${formatValue(marginalRoic, "percentage")} is ${
      marginalRoic > terminalWACC ? "greater than" : "less than"
    } its Terminal WACC of ${formatValue(terminalWACC, "percentage")}, suggesting that investments are ${
      marginalRoic > terminalWACC ? "creating" : "destroying"
    } shareholder value.

[Describe how ROIC reflects the company's competitive moat]
[Discuss threats to maintaining this competitive advantage]

## Risk Story
The company has a terminal WACC of ${typeof terminalWACC === "number" ? terminalWACC.toFixed(2) : terminalWACC}%.

[Discuss specific risks to the business model]
[Explain how sensitive the valuation is to key assumptions]

## Valuation Summary
Our DCF valuation yields an intrinsic value of $${
      typeof impliedSharePrice === "number" ? impliedSharePrice.toFixed(2) : impliedSharePrice
    } per share, compared to the current market price of $${
      typeof currentPrice === "number" ? currentPrice.toFixed(2) : currentPrice
    }.

The valuation suggests the stock is ${valGap > 0 ? "undervalued" : "overvalued"} by ${Math.abs(
      typeof valGap === "number" ? valGap : 0
    ).toFixed(2)}%.

[Explain what catalysts might help the market recognize this value gap]`;

    setDescription(framework);
    // Switch to preview mode after generating framework
    setShowPreview(true);
  };

  const handleSave = () => {
    const nowEpochSeconds = Math.floor(Date.now() / 1000);
    const data = {
      symbol: symbol.toUpperCase(),
      email,
      inputs,
      fetchedInputs,
      stockInfo,
      valuationModel,
      valuationOutput,
      impliedSharePrice,
      roic_data: roicData,
      description,
      tags,
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

  const renderMarkdown = (markdown: string) => {
    if (!markdown) return null;

    // Split the content into lines
    const lines = markdown.split("\n");
    const result: React.ReactElement[] = [];

    let currentList: string[] = [];
    let currentListType: "ordered" | "unordered" | null = null;

    // Process each line and convert to JSX
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Check if the line is part of a list
      const orderedListMatch = line.match(/^\s*(\d+)\.\s(.+)$/);
      const unorderedListMatch = line.match(/^\s*[-*]\s(.+)$/);

      // Handle ordered list items
      if (orderedListMatch) {
        if (currentListType !== "ordered" && currentList.length) {
          // We were in a different type of list, so finalize the previous list
          if (currentListType === "unordered") {
            result.push(
              <ul key={`ul-${result.length}`} className="list-disc pl-6 mb-4">
                {currentList.map((item, idx) => (
                  <li key={idx} className="mb-1">
                    {item}
                  </li>
                ))}
              </ul>
            );
          }
          currentList = [];
        }

        currentListType = "ordered";
        currentList.push(orderedListMatch[2]);
      }
      // Handle unordered list items
      else if (unorderedListMatch) {
        if (currentListType !== "unordered" && currentList.length) {
          // We were in a different type of list, so finalize the previous list
          if (currentListType === "ordered") {
            result.push(
              <ol key={`ol-${result.length}`} className="list-decimal pl-6 mb-4">
                {currentList.map((item, idx) => (
                  <li key={idx} className="mb-1">
                    {item}
                  </li>
                ))}
              </ol>
            );
          }
          currentList = [];
        }

        currentListType = "unordered";
        currentList.push(unorderedListMatch[1]);
      }
      // Handle non-list content
      else {
        // If we were in a list, finalize it
        if (currentList.length) {
          if (currentListType === "ordered") {
            result.push(
              <ol key={`ol-${result.length}`} className="list-decimal pl-6 mb-4">
                {currentList.map((item, idx) => (
                  <li key={idx} className="mb-1">
                    {item}
                  </li>
                ))}
              </ol>
            );
          } else {
            result.push(
              <ul key={`ul-${result.length}`} className="list-disc pl-6 mb-4">
                {currentList.map((item, idx) => (
                  <li key={idx} className="mb-1">
                    {item}
                  </li>
                ))}
              </ul>
            );
          }
          currentList = [];
          currentListType = null;
        }

        // Handle headers - check for each header style
        if (line.trim().startsWith("# ")) {
          result.push(
            <h1 key={`h1-${i}`} className="text-2xl font-bold mb-3">
              {line.trim().substring(2)}
            </h1>
          );
        } else if (line.trim().startsWith("## ")) {
          result.push(
            <h2 key={`h2-${i}`} className="text-xl font-semibold mt-4 mb-2">
              {line.trim().substring(3)}
            </h2>
          );
        } else if (line.trim().startsWith("### ")) {
          result.push(
            <h3 key={`h3-${i}`} className="text-lg font-medium mt-4 mb-2">
              {line.trim().substring(4)}
            </h3>
          );
        }
        // Handle empty lines
        else if (line.trim() === "") {
          result.push(<br key={`br-${i}`} />);
        }
        // Regular paragraph
        else {
          result.push(
            <p key={`p-${i}`} className="mb-2">
              {line}
            </p>
          );
        }
      }
    }

    // If we have any remaining list items at the end, finalize that list
    if (currentList.length) {
      if (currentListType === "ordered") {
        result.push(
          <ol key={`ol-${result.length}`} className="list-decimal pl-6 mb-4">
            {currentList.map((item, idx) => (
              <li key={idx} className="mb-1">
                {item}
              </li>
            ))}
          </ol>
        );
      } else {
        result.push(
          <ul key={`ul-${result.length}`} className="list-disc pl-6 mb-4">
            {currentList.map((item, idx) => (
              <li key={idx} className="mb-1">
                {item}
              </li>
            ))}
          </ul>
        );
      }
    }

    return result;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div ref={popoutRef} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-[880px] h-[950px] overflow-auto relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold dark:text-white">Valuation Review & Save</h2>

          <button
            onClick={() => {
              setIsPopoutOpen(false);
            }}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <RxCross1 size={24} />
          </button>
        </div>

        <div className="space-y-12">
          {/* 1. Revenue Growth Rate */}
          <section>
            <h3 className="text-lg font-semibold mb-3 border-b dark:border-gray-600 pb-2 dark:text-white">1. Check Revenue Growth Rate</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                <div className="text-sm text-gray-600 dark:text-gray-400">Year 1</div>
                <div className="text-md font-semibold">
                  {formatValue(getInputValue("revGrowthYr1", inputs), "percentage")}
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                <div className="text-sm text-gray-600 dark:text-gray-400">Years 2-5</div>
                <div className="text-md font-semibold">
                  {formatValue(getInputValue("revGrowthYr2to5", inputs), "percentage")}
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                <div className="text-sm text-gray-600 dark:text-gray-400">Industry Average</div>
                <div className="text-md font-semibold">
                  {formatValue(inputStats?.revenue_growth_rate_median, "percentage")}
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
              <h4 className="font-medium mb-2 dark:text-gray-100">Key Questions</h4>
              <ul className="list-disc pl-5 space-y-2 text-sm">
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
            <h3 className="text-lg font-semibold mb-3 border-b dark:border-gray-600 pb-2 dark:text-white">2. Check Dollar Revenues</h3>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                <div className="text-sm text-gray-600 dark:text-gray-400">Base Year</div>
                <div className="text-md font-semibold">
                  {formatValue(getInputValue("baseRevenue", fetchedInputs), "currency")}
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                <div className="text-sm text-gray-600 dark:text-gray-400">Next Year</div>
                <div className="text-md font-semibold">{formatValue(getModelValue("revenue", 1), "currency")}</div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                <div className="text-sm text-gray-600 dark:text-gray-400">Year 5</div>
                <div className="text-md font-semibold">{formatValue(getModelValue("revenue", 5), "currency")}</div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                <div className="text-sm text-gray-600 dark:text-gray-400">Year 10</div>
                <div className="text-md font-semibold">{formatValue(getModelValue("revenue", 10), "currency")}</div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
              <h4 className="font-medium mb-2 dark:text-gray-100">Key Questions</h4>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>What is the total addressable market (TAM) today?</li>
                <li>How do projected revenues compare to current market leaders?</li>
                <li>What market share is assumed by Year 10?</li>
              </ul>
            </div>
          </section>

          {/* 3. Margins */}
          <section>
            <h3 className="text-lg font-semibold mb-3 border-b dark:border-gray-600 pb-2 dark:text-white">3. Check Your Margins</h3>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                <div className="text-sm text-gray-600 dark:text-gray-400">Base Year</div>
                <div className="text-md font-semibold">{formatValue(getModelValue("ebitMargin", 0), "percentage")}</div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                <div className="text-sm text-gray-600 dark:text-gray-400">Next Year</div>
                <div className="text-md font-semibold">{formatValue(getModelValue("ebitMargin", 1), "percentage")}</div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                <div className="text-sm text-gray-600 dark:text-gray-400">Year 5</div>
                <div className="text-md font-semibold">{formatValue(getModelValue("ebitMargin", 5), "percentage")}</div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                <div className="text-sm text-gray-600 dark:text-gray-400">Year 10</div>
                <div className="text-md font-semibold">
                  {formatValue(getModelValue("ebitMargin", 10), "percentage")}
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
              <h4 className="font-medium mb-2 dark:text-gray-100">Key Questions</h4>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>How do margins compare to industry peers?</li>
                <li>What are the unit economics (cost to produce/sell incremental units)?</li>
                <li>What competitive dynamics could pressure margins (e.g., pricing wars)?</li>
              </ul>
            </div>
          </section>

          {/* 4. Reinvestment Efficiency */}
          <section>
            <h3 className="text-lg font-semibold mb-6 border-b dark:border-gray-600 pb-2 dark:text-white">4. Check Reinvestment Efficiency</h3>

            {/* 4a. Sales to Capital */}
            <div className="mb-6">
              <h4 className="text-md font-medium mb-4 text-gray-700 dark:text-gray-200 border-l-4 border-blue-500 pl-3">
                4a. Sales to Capital Ratio
              </h4>
              <div className="grid grid-cols-3 gap-4 mb-3">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Sales to Capital (Yr 1)</div>
                  <div className="text-md font-semibold">
                    {formatValue(getInputValue("salesToCapYr1", inputs), "number")}
                  </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Sales to Capital (Yr 2-5)</div>
                  <div className="text-md font-semibold">
                    {formatValue(getInputValue("salesToCapYr2to5", inputs), "number")}
                  </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Sales to Capital (Yr 6-10)</div>
                  <div className="text-md font-semibold">
                    {formatValue(getInputValue("salesToCapYr6to10", inputs), "number")}
                  </div>
                </div>
              </div>
            </div>

            {/* 4b. Reinvestment Effect on Cash Flows */}
            <div className="mb-6">
              <h4 className="text-md font-medium mb-4 text-gray-700 dark:text-gray-200 border-l-4 border-green-500 pl-3">
                4b. Reinvestment Effect on Cash Flows
              </h4>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Sum of PV of EBIT After Tax (10 Years)</div>
                  <div className="text-md font-semibold">{formatValue(sumOfEbitAfterTax, "currency")}</div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Sum of PV of FCFF (10 Years)</div>
                  <div className="text-md font-semibold">{formatValue(sumOfPVFCFF, "currency")}</div>
                </div>
              </div>
              <div className="bg-amber-100 dark:bg-amber-900/20 p-3 rounded-md mb-2">
                <div className="text-sm text-gray-800 dark:text-gray-200">Value Effect of Reinvestment (10 Years)</div>
                <div className="text-md font-semibold">
                  {formatValue(reinvestmentEffect, "currency")} ({formatValue(reinvestmentPercentage, "percentage")} of
                  EBIT After Tax)
                </div>
              </div>
            </div>

            {/* 4c. Return on Invested Capital */}
            <div className="mb-6">
              <h4 className="text-md font-medium mb-4 text-gray-700 dark:text-gray-200 border-l-4 border-purple-500 pl-3">
                4c. Return on Invested Capital
              </h4>
              <div className="grid grid-cols-3 gap-4 mb-3">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Marginal ROIC (Yr 1-10)</div>
                  <div className="text-md font-semibold">{formatValue(marginalRoic, "percentage")}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1"></div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                  <div className="text-sm text-gray-600 dark:text-gray-400">ROIC (Yr 10)</div>
                  <div className="text-md font-semibold">
                    {formatValue(roicData.roic[roicData.roic.length - 2], "percentage")}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1"></div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Terminal Year ROIC</div>
                  <div className="text-md font-semibold">
                    {formatValue(roicData.roic[roicData.roic.length - 1], "percentage")}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1"></div>
                </div>

                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Industry Average ROIC</div>
                  <div className="text-md font-semibold">{formatValue(roicStats?.roc, "percentage")}</div>
                </div>
              </div>

              <div className="mt-4 mb-6">
                <div
                  className={`p-4 rounded-md flex items-start gap-3 ${
                    marginalRoic > terminalWACC
                      ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                      : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                  }`}
                >
                  {marginalRoic > terminalWACC ? (
                    <FaCheckCircle className="text-green-500 text-xl flex-shrink-0 mt-0.5" />
                  ) : (
                    <FaTimesCircle className="text-red-500 text-xl flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h4 className={`font-medium ${marginalRoic > terminalWACC ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}`}>
                      {marginalRoic > terminalWACC ? "Creating Value" : "Destroying Value"}
                    </h4>
                    <p className="text-sm mt-1 dark:text-gray-300">
                      {marginalRoic > terminalWACC
                        ? "Investments are generating returns above the WACC, creating shareholder value."
                        : "Investments are generating returns below the WACC, destroying shareholder value."}
                    </p>
                  </div>
                </div>

                {/* Explanation */}
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                  <p>
                    <strong>What is Marginal ROIC?</strong> Marginal ROIC measures the return generated specifically by
                    new capital investments.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
              <h4 className="font-medium mb-2 dark:text-gray-100">Key Questions</h4>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>How does the sales to capital ratio compare to industry averages? Is it sustainable?</li>
                <li>
                  Is your reinvestment <strong>consistent</strong> with your revenue growth forecast? (high revenue
                  growth should expect significant reinvestment unless in asset-light tech companies)
                </li>
                <li>How does terminal ROIC compare to industry average ROIC?</li>
                <li>Is your terminal ROIC assumption justified by the company&apos;s competitive advantages?</li>
              </ul>
            </div>
          </section>

          {/* 5. Risk Metrics */}
          <section>
            <h3 className="text-lg font-semibold mb-3 border-b dark:border-gray-600 pb-2 dark:text-white">5. Risk Metrics</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                <div className="text-sm text-gray-600 dark:text-gray-400">WACC (Years 1-5)</div>
                <div className="text-md font-semibold">
                  {formatValue(getInputValue("initialWacc", fetchedInputs), "percentage")}
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                <div className="text-sm text-gray-600 dark:text-gray-400">Terminal WACC</div>
                <div className="text-md font-semibold">{formatValue(getModelValue("wacc", 10), "percentage")}</div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                <div className="text-sm text-gray-600 dark:text-gray-400">Industry WACC</div>
                <div className="text-md font-semibold">
                  {formatValue(inputStats?.cost_of_capital_median, "percentage")}
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
              <h4 className="font-medium mb-2 dark:text-gray-100">Key Questions</h4>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>How does your WACC compare to the industry average?</li>
                <li>Is the WACC changing over time? If so, why?</li>
                <li>Does the company&apos;s risk profile justify a discount or premium to the industry WACC?</li>
              </ul>
            </div>
          </section>

          {/* Tag Your Valuation */}
          <section>
            <h3 className="text-lg font-semibold mb-3 border-b dark:border-gray-600 pb-2 dark:text-white">6. Tag Your Valuation</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Add scenario tags to quickly identify this valuation&apos;s outlook. Select presets or create your own.
            </p>

            {/* Preset tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {PRESET_TAGS.map(({ label, style }) => (
                <button
                  key={label}
                  onClick={() => togglePresetTag(label)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                    tags.includes(label)
                      ? style + " ring-2 ring-offset-1 ring-current"
                      : "bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-gray-400"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Custom tag input + color picker */}
            <div className="space-y-2 mb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customTagInput}
                  onChange={(e) => setCustomTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addCustomTag()}
                  placeholder="Add custom tag..."
                  className="flex-1 px-3 py-1.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={addCustomTag}
                  className="px-3 py-1.5 bg-gray-800 dark:bg-gray-600 text-white rounded-lg text-sm hover:bg-gray-700 dark:hover:bg-gray-500 transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-gray-500 dark:text-gray-400 mr-1">Color:</span>
                {TAG_COLORS.map(({ key, dot }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setCustomTagColor(key)}
                    className={`w-5 h-5 rounded-full ${dot} transition-transform ${customTagColor === key ? "ring-2 ring-offset-1 ring-gray-500 dark:ring-gray-300 scale-125" : "hover:scale-110"}`}
                  />
                ))}
              </div>
            </div>

            {/* Selected tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getTagColorStyle(tag)}`}
                  >
                    {getTagDisplayLabel(tag)}
                    <button
                      onClick={() => setTags((prev) => prev.filter((t) => t !== tag))}
                      className="ml-0.5 hover:opacity-70 font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </section>

          {/* 7. Add Your Analysis */}
          <section>
            <h3 className="text-lg font-semibold mb-3 border-b dark:border-gray-600 pb-2 dark:text-white">7. Add Your Analysis</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Describe your investment thesis. A well-structured valuation should be backed with a good story.
            </p>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <button
                  onClick={generateTemplate}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Generate Template
                </button>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowPreview(false)}
                    className={`px-3 py-1.5 rounded ${
                      !showPreview ? "bg-gray-800 dark:bg-gray-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    }`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setShowPreview(true)}
                    className={`px-3 py-1.5 rounded ${
                      showPreview ? "bg-gray-800 dark:bg-gray-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    }`}
                  >
                    Preview
                  </button>
                </div>
              </div>

              {showPreview ? (
                <div className="w-full h-64 p-4 border dark:border-gray-600 rounded-lg overflow-auto bg-white dark:bg-gray-900 dark:text-gray-200">
                  <div className="prose max-w-none">{renderMarkdown(description)}</div>
                </div>
              ) : (
                <textarea
                  className="w-full h-64 p-4 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  placeholder="Your complete valuation story will appear here. Click 'Generate Template ' to start, then edit as needed."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              )}
            </div>
          </section>
        </div>

        <div className="flex justify-center p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-600 mt-6">
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
