import React, { useState, useRef, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import StockLogo from "../StockLogo";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import * as FinCalc from "../../utils/financialCalculations";
import * as conv from "../../utils/helper";

// For the tooltip component
interface CustomSensitivityTooltipProps {
  active?: boolean;
  payload?: Array<any>;
  label?: any;
  currentPrice: number;
  primaryVariableInfo: PrimaryVariableInfo | null;
}

// For input variables
interface InputField {
  id: string;
  label: string;
  value: number | string;
  question?: string;
  unit?: string;
}

// For stock info
interface StockInfoField {
  id: string;
  label: string;
  value: string | number;
}

// For primary range state
interface PrimaryRange {
  min: number | string;
  max: number | string;
  step: number;
}

// For available variables
interface Variable {
  id: string;
  label: string;
  value: number;
  unit: string;
}

// For primary variable info
interface PrimaryVariableInfo {
  id: string;
  label: string;
  unit?: string;
}

// For analysis results
interface AnalysisResult {
  primary: PrimaryVariableInfo;
  data: Array<Record<string, number>>;
}

// For the main component props
interface SensitivityAnalysisPopoutPageProps {
  setIsPopoutOpen: (isOpen: boolean) => void;
  initialInputs: InputField[];
  fetchedInputs: InputField[];
  searchedSymbol: string;
  stockInfo: StockInfoField[];
}

const CustomSensitivityTooltip: React.FC<CustomSensitivityTooltipProps> = ({
  active,
  payload,
  label,
  currentPrice,
  primaryVariableInfo,
}) => {
  if (active && payload && payload.length && primaryVariableInfo) {
    const intrinsicValueData = payload.find((p) => p.dataKey === "intrinsicValue");

    if (!intrinsicValueData) return null;

    const intrinsicValue = intrinsicValueData.value;
    const primaryValue = label;

    return (
      <div className="bg-white/90 border border-gray-300 p-3 rounded shadow-lg text-sm">
        {/* Label (X-axis value) */}
        <p className="font-semibold mb-1 border-b pb-1">
          {`${primaryVariableInfo.label}: ${conv.convRound2Dp(primaryValue)}${primaryVariableInfo.unit || ""}`}
        </p>
        {/* Intrinsic Value */}
        <p className="text-blue-600">
          Intrinsic Value:
          <span className="font-medium ml-1">{`$${conv.convRound2Dp(intrinsicValue)}`}</span>
        </p>
        {/* Current Price */}
        {currentPrice > 0 && (
          <p className="text-red-600">
            Current Price:
            <span className="font-medium ml-1">{`$${conv.convRound2Dp(currentPrice)}`}</span>
          </p>
        )}
      </div>
    );
  }

  return null; // Render nothing if tooltip is not active or payload is missing
};

// --- SensitivityAnalysisPopoutPage Component (Main component remains largely the same) ---
const SensitivityAnalysisPopoutPage: React.FC<SensitivityAnalysisPopoutPageProps> = ({
  setIsPopoutOpen,
  initialInputs,
  fetchedInputs,
  searchedSymbol,
  stockInfo,
}) => {
  const popoutRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<AnalysisResult | null>(null); // State holds results including primary variable info
  const [error, setError] = useState<string | null>(null);
  const shortName = stockInfo.find((el) => el.id === "shortName")?.value || searchedSymbol;
  const currentPrice = Number(fetchedInputs.find((input) => input.id === "currentSharePrice")?.value || 0);
  const [primaryVariable, setPrimaryVariable] = useState<Variable | null>(null);
  const [primaryRange, setPrimaryRange] = useState<PrimaryRange>({ min: 0, max: 0, step: 0 });

  // Get all available variables for analysis
  const availableVariables = [
    ...initialInputs.map((input) => ({
      id: input.id,
      label: input.label,
      value: typeof input.value === "string" ? parseFloat(input.value) : Number(input.value),
      unit: input.unit || "",
    })),
    ...fetchedInputs
      .filter((input) => ["initialWacc", "riskFreeRate", "roicTerminalYear"].includes(input.id))
      .map((input) => ({
        id: input.id,
        label: input.label,
        value: typeof input.value === "string" ? parseFloat(input.value) : Number(input.value),
        unit: input.unit || "",
      })),
  ];

  // Handle primary variable selection
  const handlePrimaryVariableChange = (varId: string): void => {
    const variable = availableVariables.find((v) => v.id === varId);

    if (variable) {
      setPrimaryVariable(variable);

      // Set default range based on variable value and create nice intervals
      const value = variable.value;
      const absValue = Math.abs(value);

      // Determine a nice step size based on the value magnitude
      let stepSize: number;
      if (absValue >= 100) {
        stepSize = 10;
      } else if (absValue >= 10) {
        stepSize = 1;
      } else if (absValue >= 1) {
        stepSize = 0.5;
      } else {
        stepSize = absValue * 0.1;
        stepSize = parseFloat(stepSize.toFixed(2));
      }

      // Enforce minimum step size of 0.1
      stepSize = Math.max(0.1, stepSize);

      // Calculate appropriate min and max based on the sign of the value
      let min: number, max: number;
      if (value >= 0) {
        // For positive values, go down to 50% or 5 steps below
        min = Math.min(value * 0.5, Math.max(0, value - stepSize * 5));
        max = value * 1.5; // Go up to 150%
      } else {
        // For negative values, go down to 150% or 5 steps below (more negative)
        min = Math.min(value * 1.5, value - stepSize * 5);
        max = value * 0.5; // Go up to 50% (less negative)
      }

      setPrimaryRange({
        min: parseFloat(min.toFixed(2)),
        max: parseFloat(max.toFixed(2)),
        step: stepSize,
      });
    } else {
      setPrimaryVariable(null);
    }
  };

  // Handle step size change with minimum validation
  const handleStepSizeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let newStep = parseFloat(e.target.value) || 0;
    newStep = Math.max(0.1, newStep);
    setPrimaryRange({ ...primaryRange, step: newStep });
  };

  // Run sensitivity analysis
  const runAnalysis = (): void => {
    if (!primaryVariable) {
      setError("Please select a variable for analysis");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Create copies of the input values
      const baseInputs: Record<string, number> = initialInputs.reduce((acc: Record<string, number>, input) => {
        acc[input.id] = typeof input.value === "string" ? parseFloat(input.value) : Number(input.value);
        return acc;
      }, {});

      const baseFetchedInputs: Record<string, number> = fetchedInputs.reduce((acc: Record<string, number>, input) => {
        acc[input.id] = typeof input.value === "string" ? parseFloat(input.value) : Number(input.value);
        return acc;
      }, {});

      // Generate the values to test for primary variable with nice intervals
      const primaryValues: number[] = [];
      // Recalculate numSteps inside runAnalysis in case range/step changed
      const min = typeof primaryRange.min === "string" ? parseFloat(primaryRange.min) : primaryRange.min;
      const max = typeof primaryRange.max === "string" ? parseFloat(primaryRange.max) : primaryRange.max;
      const step = primaryRange.step;

      const numSteps = step > 0 ? Math.ceil((max - min) / step) : 0;

      for (let i = 0; i <= numSteps; i++) {
        let value = min + i * step;
        // Ensure value doesn't exceed max due to potential floating point inaccuracies
        if (i === numSteps && numSteps > 0) {
          value = max;
        } else if (value > max && i === numSteps) {
          // If calculated value slightly overshoots max on the last step, clamp it
          value = max;
        }

        const decimals = step < 0.1 ? 3 : 2;
        primaryValues.push(parseFloat(value.toFixed(decimals)));
      }

      if (primaryValues.length > 0 && primaryValues[primaryValues.length - 1] < max && step > 0) {
        primaryValues.push(max);
      }

      const uniquePrimaryValues = Array.from(new Set(primaryValues)).sort((a, b) => a - b);
      const calculatedResults: Array<{ primaryValue: number; intrinsicValue: number }> = [];

      uniquePrimaryValues.forEach((primaryValue) => {
        const modifiedInputs = { ...baseInputs };
        const modifiedFetchedInputs = { ...baseFetchedInputs };

        if (initialInputs.some((input) => input.id === primaryVariable.id)) {
          modifiedInputs[primaryVariable.id] = primaryValue;
        } else {
          modifiedFetchedInputs[primaryVariable.id] = primaryValue;
        }

        const intrinsicValue = calculateIntrinsicValue(modifiedInputs, modifiedFetchedInputs);

        if (isNaN(intrinsicValue) || !isFinite(intrinsicValue)) {
          console.warn(`Skipping result for ${primaryVariable.label}=${primaryValue} due to invalid intrinsic value.`);
          return;
        }

        calculatedResults.push({
          primaryValue,
          intrinsicValue,
        });
      });

      setResults({
        primary: {
          id: primaryVariable.id,
          label: primaryVariable.label,
          unit: primaryVariable.unit,
        },
        // Map the valid calculated results
        data: calculatedResults.map((result) => ({
          [primaryVariable.id]: result.primaryValue,
          intrinsicValue: result.intrinsicValue,
        })),
      });
    } catch (err) {
      console.error("Error running sensitivity analysis:", err);
      setError("Failed to run analysis. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate intrinsic value using the financial calculations
  const calculateIntrinsicValue = (
    inputsValues: Record<string, number>,
    fetchedInputValues: Record<string, number>
  ): number => {
    // Extract required values from the inputs
    const growthY1 = inputsValues["revGrowthYr1"];
    const growthY2to5 = inputsValues["revGrowthYr2to5"];
    const growthTerminal = inputsValues["revGrowthPerpetuity"];
    const ebitY1 = inputsValues["opMarginYr1"];
    const ebitY10 = inputsValues["opMarginYr10"];
    const yearOfConvergence = inputsValues["yrsConvergence"];
    const sCapY1 = inputsValues["salesToCapYr1"];
    const sCapY2to5 = inputsValues["salesToCapYr2to5"];
    const sCapY6to10 = inputsValues["salesToCapYr6to10"];

    // Extract fetched inputs
    const baseRevenue = fetchedInputValues["baseRevenue"];
    const baseEbitMargin = fetchedInputValues["baseEbitMargin"];
    const effectiveTaxRate = fetchedInputValues["effectiveTaxRate"];
    const marginalTaxRate = fetchedInputValues["marginalTaxRate"];
    const riskFreeRate = fetchedInputValues["riskFreeRate"];
    const totalDebt = fetchedInputValues["totalDebt"];
    const cash = fetchedInputValues["cash"];
    const impliedSharesOutstanding = fetchedInputValues["impliedSharesOutstanding"];
    const initialWacc = fetchedInputValues["initialWacc"];
    const equityRiskPremium = fetchedInputValues["equityRiskPremium"];

    // Add checks for missing/invalid inputs before calculations
    const requiredInputs: Record<string, number> = {
      growthY1,
      growthY2to5,
      growthTerminal,
      ebitY1,
      ebitY10,
      yearOfConvergence,
      sCapY1,
      sCapY2to5,
      sCapY6to10,
    };
    const requiredFetched: Record<string, number> = {
      baseRevenue,
      baseEbitMargin,
      effectiveTaxRate,
      marginalTaxRate,
      riskFreeRate,
      totalDebt,
      cash,
      impliedSharesOutstanding,
      initialWacc,
      equityRiskPremium,
    };

    for (const key in requiredInputs) {
      if (
        requiredInputs[key] === undefined ||
        requiredInputs[key] === null ||
        (typeof requiredInputs[key] === "number" && isNaN(requiredInputs[key]))
      ) {
        console.error(`Missing or invalid input: ${key}`);
        return NaN; // Indicate error
      }
    }
    for (const key in requiredFetched) {
      if (
        requiredFetched[key] === undefined ||
        requiredFetched[key] === null ||
        (typeof requiredFetched[key] === "number" && isNaN(requiredFetched[key]))
      ) {
        console.error(`Missing or invalid fetched input: ${key}`);
        return NaN; // Indicate error
      }
    }
    // Specific check for division by zero potential
    if (impliedSharesOutstanding === 0) {
      console.error("Implied Shares Outstanding cannot be zero.");
      return NaN;
    }

    // Perform calculations using the financial calculations from the utilities
    const growthRates = FinCalc.calcRevenueGrowth(growthY1, growthY2to5, growthTerminal);
    const revenue = FinCalc.calcRevenue(baseRevenue, growthRates);
    const ebitMargin = FinCalc.calcEBITMargin(baseEbitMargin, ebitY1, ebitY10, yearOfConvergence);
    const ebit = FinCalc.calcEbit(revenue, ebitMargin);
    const taxRate = FinCalc.calcTaxRate(effectiveTaxRate, marginalTaxRate);
    const ebitAfterTax = FinCalc.calcEbitAfterTax(ebit, taxRate);
    const terminalWacc = FinCalc.calcTerminalWACC(equityRiskPremium, riskFreeRate);

    // Check for terminal WACC less than or equal to terminal growth
    if (terminalWacc <= growthRates[growthRates.length - 1]) {
      console.warn(
        `Terminal WACC (${terminalWacc}%) is less than or equal to terminal growth rate (${
          growthRates[growthRates.length - 1]
        }%). Clamping terminal growth to WACC - 0.1% for calculation.`
      );
      // Avoid division by zero or negative denominator in terminal value calculation
      // Clamp terminal growth slightly below terminal WACC
      const adjustedTerminalGrowth = terminalWacc - 0.1; // Or some other small delta
      growthRates[growthRates.length - 1] = adjustedTerminalGrowth;
    }

    const reinvestment = FinCalc.calcReinvestment(
      revenue,
      sCapY1,
      sCapY2to5,
      sCapY6to10,
      growthRates[growthRates.length - 1],
      fetchedInputValues["roicTerminalYear"], // Use roicTerminalYear
      ebitAfterTax[ebitAfterTax.length - 1]
    );
    const fcff = FinCalc.calcFcff(ebitAfterTax, reinvestment);
    const wacc = FinCalc.calcWACC(initialWacc, terminalWacc);
    const cumulatedDiscountFactor = FinCalc.calcCumulatedDiscountFactor(wacc);
    const pvFcff = FinCalc.calcPvFcff(fcff, cumulatedDiscountFactor);
    const sumOfPvFcff10Yrs = FinCalc.calcSumOfPvFcff10Yrs(pvFcff);

    const terminalGrowthForValueCalc = growthRates[growthRates.length - 1];
    const terminalWaccForValueCalc = wacc[wacc.length - 1]; // Should equal terminalWacc

    // Final check before terminal value calculation
    if (terminalWaccForValueCalc <= terminalGrowthForValueCalc) {
      console.error(
        `Critical Error: Terminal WACC (${terminalWaccForValueCalc}%) <= Terminal Growth (${terminalGrowthForValueCalc}%) before calcTerminalValue.`
      );
      return NaN;
    }

    const terminalValue = FinCalc.calcTerminalValue(
      fcff[fcff.length - 1],
      terminalWaccForValueCalc,
      terminalGrowthForValueCalc
    );
    const pvTerminalValue = FinCalc.calcPVTerminalValue(
      terminalValue,
      cumulatedDiscountFactor[cumulatedDiscountFactor.length - 1]
    );
    const enterpriseValue = FinCalc.calcEnterpriseValue(pvTerminalValue, sumOfPvFcff10Yrs);
    const equityValue = FinCalc.calcEquityValue(
      enterpriseValue,
      totalDebt,
      fetchedInputValues["minorityInterest"] || 0, // Use fetched value or default to 0
      cash,
      fetchedInputValues["nonOperatingAssets"] || 0 // Use fetched value or default to 0
    );
    const equityValueCommonStock = FinCalc.calcEquityValueCommonStock(
      equityValue,
      fetchedInputValues["valueOfOptions"] || 0
    ); // Use fetched value or default to 0

    // Final check for division by zero
    if (impliedSharesOutstanding === 0) return NaN;

    const impliedSharePrice = FinCalc.calcImpliedSharePrice(equityValueCommonStock, impliedSharesOutstanding);

    // Final check if calculation results in invalid number
    if (isNaN(impliedSharePrice) || !isFinite(impliedSharePrice)) {
      console.error("Calculation resulted in NaN or Infinity for Implied Share Price.");
      return NaN;
    }

    return impliedSharePrice;
  };

  // Close when clicking outside the popout
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (popoutRef.current && !popoutRef.current.contains(event.target as Node)) {
        setIsPopoutOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsPopoutOpen]);

  // Helper function to format percentage difference
  const calculateDifference = (valuePrice: number): number => {
    if (currentPrice === 0) return 0;
    return ((valuePrice - currentPrice) / currentPrice) * 100;
  };

  // Get color based on percentage difference
  const getDifferenceColor = (diff: number): string => {
    if (diff > 0) return "text-green-600";
    if (diff < 0) return "text-red-600";
    return "text-gray-600"; // No difference
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      {" "}
      {/* Added padding */}
      <div ref={popoutRef} className="bg-white p-4 md:p-6 rounded-lg shadow-xl w-full max-w-6xl h-[95vh] flex flex-col">
        {" "}
        {/* Adjusted max-width and height */}
        {/* Header */}
        <div className="flex justify-between items-center mb-4 pb-3 border-b">
          <div className="flex items-center flex-shrink-0">
            {/* Conditionally render Image based on searchedSymbol */}
            {searchedSymbol && <StockLogo symbol={searchedSymbol} height={50} width={50} className="mr-2" alt="logo" />}
            <h2 className="text-lg md:text-xl font-bold truncate">Sensitivity Analysis - {shortName}</h2>
          </div>
          <button
            onClick={() => setIsPopoutOpen(false)}
            className="text-gray-500 hover:text-gray-700 flex-shrink-0 ml-2"
          >
            <RxCross1 size={20} /> {/* Adjusted size */}
          </button>
        </div>
        {/* Main Content Area - Adjusted for lg breakpoint */}
        <div className="flex-grow overflow-hidden flex flex-col lg:flex-row gap-4 md:gap-6">
          {" "}
          {/* Left Panel: Configuration & Explanation (Scrollable) */}
          <div className="w-full lg:w-1/3 flex-shrink-0 flex flex-col gap-4 overflow-y-auto pr-2">
            {/* Config Box */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
              {/* ... content of config box ... */}
              <h3 className="text-md font-semibold mb-3">Analysis Settings</h3>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Variable</label>
                <select
                  value={primaryVariable?.id || ""}
                  onChange={(e) => handlePrimaryVariableChange(e.target.value)}
                  className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm" // Adjusted padding/text size
                >
                  <option value="">Select a variable</option>
                  {availableVariables.map((variable) => (
                    <option key={variable.id} value={variable.id}>
                      {variable.label} ({conv.convRound2Dp(variable.value)}
                      {variable.unit})
                    </option>
                  ))}
                </select>
              </div>

              {primaryVariable && (
                <div className="mb-4 p-3 border border-gray-200 rounded-md bg-white">
                  <h4 className="text-xs font-medium mb-2 text-gray-600">{primaryVariable.label} Range</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Min</label>
                      <input
                        type="number"
                        value={primaryRange.min}
                        onChange={(e) => {
                          // Allow empty values or just "-" during typing
                          if (e.target.value === "" || e.target.value === "-") {
                            setPrimaryRange({ ...primaryRange, min: e.target.value });
                          } else {
                            const parsed = parseFloat(e.target.value);
                            // Only update if it's a valid number
                            if (!isNaN(parsed)) {
                              setPrimaryRange({ ...primaryRange, min: parsed });
                            }
                          }
                        }}
                        className="w-full rounded-md border border-gray-300 py-1 px-2 text-xs"
                        step="0.1"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Max</label>
                      <input
                        type="number"
                        value={primaryRange.max}
                        onChange={(e) => {
                          // Allow empty values or just "-" during typing
                          if (e.target.value === "" || e.target.value === "-") {
                            setPrimaryRange({ ...primaryRange, max: e.target.value });
                          } else {
                            const parsed = parseFloat(e.target.value);
                            // Only update if it's a valid number
                            if (!isNaN(parsed)) {
                              setPrimaryRange({ ...primaryRange, max: parsed });
                            }
                          }
                        }}
                        className="w-full rounded-md border border-gray-300 py-1 px-2 text-xs"
                        step="0.1"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Step</label>
                      <input
                        type="number"
                        value={primaryRange.step}
                        onChange={handleStepSizeChange}
                        className="w-full rounded-md border border-gray-300 py-1 px-2 text-xs" // Adjusted padding/text size
                        step="1"
                        min="0.1"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={runAnalysis}
                  disabled={isLoading || !primaryVariable}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" // Adjusted size
                >
                  {isLoading ? (
                    <>
                      {/* Loading Spinner - simplified */}
                      <svg
                        className="animate-spin -ml-0.5 mr-1.5 h-3 w-3 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        {" "}
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>{" "}
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>{" "}
                      </svg>
                      Running...
                    </>
                  ) : (
                    "Run Analysis"
                  )}
                </button>
              </div>
            </div>

            {/* Explanation Box */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
              {/* ... content of explanation box ... */}
              <h3 className="text-md font-semibold mb-3">Sensitivity Explanation</h3>
              <p className="text-xs text-gray-600 mb-2">
                Sensitivity analysis helps understand how changes in inputs affect the calculated intrinsic value.
              </p>
              <p className="text-xs text-gray-600 mb-2">
                Varying one parameter helps identify inputs with the most significant impact.
              </p>
            </div>
          </div>
          {/* Right Panel: Results (Scrollable) */}
          <div className="w-full lg:w-2/3 flex-shrink flex flex-col overflow-y-auto border border-gray-200 rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-3 flex-wrap">
              <h3 className="text-md font-semibold">Analysis Results</h3>
              {currentPrice > 0 && (
                <div className="flex items-center bg-gray-100 px-2 py-0.5 rounded-md text-xs">
                  {" "}
                  {/* Adjusted size */}
                  <span className="font-medium text-gray-700 mr-1">Current Price:</span>
                  <span className="font-bold">${conv.convRound2Dp(currentPrice)}</span>
                </div>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-400 text-red-700 p-3 rounded-md mb-3 text-xs">{error}</div>
            )}

            {isLoading ? (
              <div className="flex flex-col items-center justify-center flex-grow text-gray-500">
                {/* Loading State */}
                <svg
                  className="animate-spin h-8 w-8 text-blue-500 mb-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  {" "}
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>{" "}
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>{" "}
                </svg>
                Calculating...
              </div>
            ) : results ? (
              <div className="flex-grow flex flex-col">
                {/* Results Display */}
                {/* ... Chart and Table ... */}
                <p className="text-xs text-gray-600 mb-3 px-2">
                  Showing how <span className="font-medium">{results.primary.label}</span> changes affect intrinsic
                  value.
                </p>
                {/* Chart */}
                <div className="w-full h-60 md:h-72 mb-4 flex-shrink-0">
                  {" "}
                  {/* Fixed height for chart */}
                  <ResponsiveContainer width="100%" height="100%">
                    {/* ... LineChart content ... */}
                    <LineChart data={results.data} margin={{ top: 5, right: 15, left: 5, bottom: 5 }}>
                      {" "}
                      {/* Adjusted margins */}
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis
                        dataKey={results.primary.id}
                        tickFormatter={(value) => conv.convRound2Dp(value)}
                        tick={{ fontSize: 10 }}
                        type="number"
                        domain={["dataMin", "dataMax"]}
                      />
                      <YAxis
                        tickFormatter={(value) => conv.convRound2Dp(value)}
                        tick={{ fontSize: 10 }}
                        domain={["auto", "auto"]}
                        width={45}
                      />
                      <Tooltip
                        content={
                          <CustomSensitivityTooltip currentPrice={currentPrice} primaryVariableInfo={results.primary} />
                        }
                      />
                      <Line
                        type="monotone"
                        dataKey="intrinsicValue"
                        name="Intrinsic Value"
                        stroke="#4f46e5"
                        activeDot={{ r: 6 }}
                        strokeWidth={1.5}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                {/* Table (Scrollable within its container) */}
                <div className="flex-grow overflow-y-auto mt-2">
                  {/* ... Table content ... */}
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0">
                      {/* Sticky header */}
                      <tr>
                        <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {results.primary.label} ({results.primary.unit || ""})
                        </th>
                        <th className="px-2 py-1.5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Intrinsic Value
                        </th>
                        {currentPrice > 0 && (
                          <th className="px-2 py-1.5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            % Diff
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {results.data.map((row, index) => {
                        const diff = currentPrice > 0 ? calculateDifference(row.intrinsicValue) : null;
                        const diffColor = diff !== null ? getDifferenceColor(diff) : "";

                        return (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-800">
                              {" "}
                              {conv.convRound2Dp(row[results.primary.id])}
                            </td>
                            <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-800 text-right">
                              ${conv.convRound2Dp(row.intrinsicValue)}
                            </td>
                            {currentPrice > 0 && (
                              <td className={`px-2 py-1 whitespace-nowrap text-xs font-medium text-right ${diffColor}`}>
                                {diff !== null ? (
                                  <>
                                    {diff > 0 ? "+" : ""}
                                    {conv.convRound2Dp(diff)}%
                                  </>
                                ) : (
                                  "-"
                                )}
                              </td>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center flex-grow text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />{" "}
                </svg>
                Select variable & run analysis.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensitivityAnalysisPopoutPage;
