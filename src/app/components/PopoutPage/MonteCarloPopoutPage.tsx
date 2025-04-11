"use client";

import React, { useState, useRef, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";
import { FaCheck, FaTimes } from "react-icons/fa";
import Image from "next/image";
import DistributionPreviewChart from "../DistributionPreviewChart";

const DISTRIBUTION_TYPES = ["Normal", "Uniform", "Triangular", "Logistic", "Exponential", "Lognormal", "Min Extreme"];

// Helper component to display distribution parameter fields
const DistributionParams = ({ type, params, onChange, variable }) => {
  // For lognormal distribution, convert between display parameters and actual parameters
  const handleLognormalParamChange = (paramName, value) => {
    if (paramName === "displayMean") {
      // User is changing the mean
      const displayMean = value;
      const displayStdDev = params.displayStdDev || variable.value * 0.2; // Use current stdDev or default

      // Convert from mean/stdDev to mu/sigma
      const variance = Math.pow(displayStdDev / displayMean, 2);
      const sigma = Math.sqrt(Math.log(1 + variance));
      const mu = Math.log(displayMean) - (sigma * sigma) / 2;

      // Update both display and actual parameters
      onChange("displayMean", displayMean);
      onChange("displayStdDev", displayStdDev);
      onChange("mu", mu);
      onChange("sigma", sigma);
    } else if (paramName === "displayStdDev") {
      // User is changing the standard deviation
      const displayMean = params.displayMean || variable.value; // Use current mean or default
      const displayStdDev = value;

      // Convert from mean/stdDev to mu/sigma
      const variance = Math.pow(displayStdDev / displayMean, 2);
      const sigma = Math.sqrt(Math.log(1 + variance));
      const mu = Math.log(displayMean) - (sigma * sigma) / 2;

      // Update both display and actual parameters
      onChange("displayMean", displayMean);
      onChange("displayStdDev", displayStdDev);
      onChange("mu", mu);
      onChange("sigma", sigma);
    } else {
      // For other parameters, just pass through
      onChange(paramName, value);
    }
  };

  switch (type) {
    case "Normal":
      return (
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Mean (μ)</label>
            <input
              type="number"
              value={params.mean}
              onChange={(e) => onChange("mean", parseFloat(e.target.value) || 0)}
              className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Standard Deviation (σ)</label>
            <input
              type="number"
              value={params.stdDev}
              onChange={(e) => onChange("stdDev", parseFloat(e.target.value) || 0)}
              className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm"
            />
          </div>
        </div>
      );
    case "Uniform":
      return (
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Min Value</label>
            <input
              type="number"
              value={params.min}
              onChange={(e) => onChange("min", parseFloat(e.target.value) || 0)}
              className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Max Value</label>
            <input
              type="number"
              value={params.max}
              onChange={(e) => onChange("max", parseFloat(e.target.value) || 0)}
              className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm"
            />
          </div>
        </div>
      );
    case "Triangular":
      return (
        <div className="grid grid-cols-3 gap-4 mt-2">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Min Value</label>
            <input
              type="number"
              value={params.min}
              onChange={(e) => onChange("min", parseFloat(e.target.value) || 0)}
              className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Mode Value</label>
            <input
              type="number"
              value={params.mode}
              onChange={(e) => onChange("mode", parseFloat(e.target.value) || 0)}
              className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Max Value</label>
            <input
              type="number"
              value={params.max}
              onChange={(e) => onChange("max", parseFloat(e.target.value) || 0)}
              className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm"
            />
          </div>
        </div>
      );
    case "Logistic":
      return (
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Location</label>
            <input
              type="number"
              value={params.location}
              onChange={(e) => onChange("location", parseFloat(e.target.value) || 0)}
              className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Scale</label>
            <input
              type="number"
              value={params.scale}
              onChange={(e) => onChange("scale", parseFloat(e.target.value) || 0)}
              className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm"
            />
          </div>
        </div>
      );
    case "Exponential":
      return (
        <div className="mt-2">
          <label className="block text-xs font-medium text-gray-700 mb-1">Rate (λ)</label>
          <input
            type="number"
            value={params.rate}
            onChange={(e) => onChange("rate", parseFloat(e.target.value) || 0)}
            className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm"
          />
        </div>
      );
    case "Lognormal":
      return (
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Mean</label>
            <input
              type="number"
              value={params.displayMean !== undefined ? params.displayMean : variable.value}
              onChange={(e) => handleLognormalParamChange("displayMean", parseFloat(e.target.value) || 0)}
              className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Standard Deviation</label>
            <input
              type="number"
              value={params.displayStdDev !== undefined ? params.displayStdDev : variable.value * 0.2}
              onChange={(e) => handleLognormalParamChange("displayStdDev", parseFloat(e.target.value) || 0)}
              className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm"
            />
          </div>
        </div>
      );
    case "Min Extreme":
      return (
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Location</label>
            <input
              type="number"
              value={params.location}
              onChange={(e) => onChange("location", parseFloat(e.target.value) || 0)}
              className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Scale</label>
            <input
              type="number"
              value={params.scale}
              onChange={(e) => onChange("scale", parseFloat(e.target.value) || 0)}
              className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm"
            />
          </div>
        </div>
      );
    default:
      return null;
  }
};

// Input variable component
const InputVariableCard = ({ variable, onToggle, onDistributionChange, onParamChange }) => {
  const [showChart, setShowChart] = useState(false);

  return (
    <div
      className={`border rounded-lg p-4 mb-4 transition-colors ${
        variable.enabled ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:bg-gray-50"
      }`}
    >
      <div className="flex justify-between items-center cursor-pointer" onClick={() => onToggle()}>
        <div className="flex items-center space-x-2">
          <div className="h-5 w-5 flex items-center justify-center">
            {variable.enabled ? (
              <FaCheck className="text-blue-600" />
            ) : (
              <div className="h-4 w-4 border border-gray-300 rounded" />
            )}
          </div>
          <span className="font-medium text-sm">{variable.label}</span>
        </div>
        <div className="text-sm text-gray-600">Current: {variable.value}</div>
      </div>

      {variable.enabled && (
        <div className="mt-3" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-xs font-medium text-gray-700">Distribution</label>
            <button
              onClick={() => setShowChart(!showChart)}
              className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
            >
              {showChart ? "Hide Chart" : "Show Chart"}
              {showChart ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>
          </div>

          <select
            value={variable.distributionType}
            onChange={(e) => onDistributionChange(e.target.value)}
            className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm"
          >
            {DISTRIBUTION_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <DistributionParams
            type={variable.distributionType}
            params={variable.distributionParams}
            onChange={onParamChange}
            variable={variable}
          />

          {showChart && (
            <DistributionPreviewChart
              distributionType={variable.distributionType}
              params={variable.distributionParams}
              variableId={variable.id}
              variableLabel={variable.label}
              variableValue={variable.value}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default function MonteCarloPopoutPage({
  setIsPopoutOpen,
  initialInputs,
  fetchedInputs,
  searchedSymbol,
  stockInfo,
}) {
  const popoutRef = useRef(null);
  const [numIterations, setNumIterations] = useState(1000000);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const shortName = stockInfo.find((el) => el.id === "shortName")?.value || searchedSymbol;

  // Get current market price from fetchedInputs
  const currentPrice = fetchedInputs.find((input) => input.id === "currentSharePrice")?.value || 0;

  // Initialize input variables
  const [inputVars, setInputVars] = useState(() => {
    const vars = {};

    // Process initialInputs (user inputs)
    initialInputs.forEach((input) => {
      const value = typeof input.value === "string" ? parseFloat(input.value) : input.value;
      vars[input.id] = {
        id: input.id,
        label: input.label,
        value: value,
        enabled: false,
        distributionType: "Normal",
        distributionParams: {
          // Default params for all distribution types
          mean: value,
          stdDev: Math.abs(value * 0.1), // 10% of value
          min: value * 0.8,
          max: value * 1.2,
          mode: value,
          location: value,
          scale: Math.abs(value * 0.1),
          rate: 1,
          mu: Math.log(Math.abs(value) || 1),
          sigma: 0.4,
          // Add display params for lognormal
          displayMean: value,
          displayStdDev: Math.abs(value * 0.2), // 20% of value
        },
      };
    });

    // Process fetchedInputs (system inputs)
    fetchedInputs.forEach((input) => {
      const value = typeof input.value === "string" ? parseFloat(input.value) : input.value;
      if (["initialWacc", "riskFreeRate"].includes(input.id)) {
        vars[input.id] = {
          id: input.id,
          label: input.label,
          value: value,
          enabled: false,
          distributionType: "Normal",
          distributionParams: {
            mean: value,
            stdDev: Math.abs(value * 0.1),
            min: value * 0.8,
            max: value * 1.2,
            mode: value,
            location: value,
            scale: Math.abs(value * 0.1),
            rate: 1,
            mu: Math.log(Math.abs(value) || 1),
            sigma: 0.4,
            // Add display params for lognormal
            displayMean: value,
            displayStdDev: Math.abs(value * 0.2),
          },
        };
      }
    });

    return vars;
  });

  // Handle toggle for input variables
  const handleToggle = (id) => {
    setInputVars((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        enabled: !prev[id].enabled,
      },
    }));
  };

  // Handle distribution type change
  const handleDistributionChange = (id, type) => {
    setInputVars((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        distributionType: type,
      },
    }));
  };

  // Handle parameter change
  const handleParamChange = (id, paramName, value) => {
    setInputVars((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        distributionParams: {
          ...prev[id].distributionParams,
          [paramName]: value,
        },
      },
    }));
  };

  // Calculate percentage difference between market price and DCF value
  const calculateDifference = (valuePrice) => {
    if (currentPrice === 0) return 0;
    return ((valuePrice - currentPrice) / currentPrice) * 100;
  };

  // Get color based on percentage difference
  const getDifferenceColor = (diff) => {
    if (diff > 0) return "text-green-600"; // Undervalued (positive difference)
    if (diff < 0) return "text-red-600"; // Overvalued (negative difference)
    return "text-gray-600"; // No difference
  };

  // Run the simulation
  const runSimulation = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Prepare data for API
      const enabledVariables = Object.values(inputVars).filter((v) => v.enabled);

      // Get all initial inputs as a map
      const baseInputsMap = initialInputs.reduce((acc, input) => {
        acc[input.id] = typeof input.value === "string" ? parseFloat(input.value) : input.value;
        return acc;
      }, {});

      // Get all fetched inputs as a map
      const fetchedInputsMap = fetchedInputs.reduce((acc, input) => {
        acc[input.id] = typeof input.value === "string" ? parseFloat(input.value) : input.value;
        return acc;
      }, {});

      const simulationData = {
        numIterations,
        variables: enabledVariables,
        baseInputs: baseInputsMap,
        fetchedInputs: fetchedInputsMap,
      };

      // Call the API
      const response = await axios.post("/api/monte-carlo", simulationData);
      setResults(response.data);
    } catch (err) {
      console.error("Error running Monte Carlo simulation:", err);
      setError("Failed to run simulation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Close when clicking outside the popout
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoutRef.current && !popoutRef.current.contains(event.target)) {
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
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Image
              src={`https://img.logo.dev/ticker/${searchedSymbol}?token=${process.env.NEXT_PUBLIC_LOGODEV}&retina=true`}
              alt="logo"
              height={40}
              width={40}
              className="mr-2"
            />
            <h2 className="text-2xl font-bold">Monte Carlo Simulation - {shortName}</h2>
          </div>
          <button onClick={() => setIsPopoutOpen(false)} className="text-gray-500 hover:text-gray-700">
            <RxCross1 size={24} />
          </button>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
          {/* Configuration Panel */}
          <div>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-4">Simulation Settings</h3>
              <div className="flex items-center gap-4">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Iterations</label>
                  <input
                    type="number"
                    min="100"
                    max="1000000"
                    step="100"
                    value={numIterations}
                    onChange={(e) => setNumIterations(parseInt(e.target.value))}
                    className="w-full rounded-md border border-gray-300 py-2 px-3"
                  />
                  <p className="text-xs text-gray-500 mt-1">Max: 1,000,000 iterations</p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={runSimulation}
                    disabled={isLoading || !Object.values(inputVars).some((v) => v.enabled)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Running...
                      </>
                    ) : (
                      "Run Simulation"
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Variables to Simulate</h3>
              <div className="mb-2 text-sm text-gray-600">Select variables to vary in simulation:</div>
              <div className="max-h-[600px] overflow-y-auto pr-2">
                {Object.values(inputVars).map((variable) => (
                  <InputVariableCard
                    key={variable.id}
                    variable={variable}
                    onToggle={() => handleToggle(variable.id)}
                    onDistributionChange={(type) => handleDistributionChange(variable.id, type)}
                    onParamChange={(param, value) => handleParamChange(variable.id, param, value)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Results Summary Panel */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Simulation Results</h3>

            {error && <div className="bg-red-50 border border-red-400 text-red-700 p-4 rounded-md mb-4">{error}</div>}

            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-[500px]">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                <p className="mt-4 text-gray-600">Running simulation...</p>
              </div>
            ) : results ? (
              <div>
                <div className="bg-white rounded-lg p-4 mb-6">
                  <h4 className="text-md font-medium mb-4">Summary Statistics</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 p-3 rounded-md">
                      <div className="text-xs text-gray-500">Mean</div>
                      <div className="text-lg font-semibold">${results.mean.toFixed(2)}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <div className="text-xs text-gray-500">Median</div>
                      <div className="text-lg font-semibold">${results.median.toFixed(2)}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <div className="text-xs text-gray-500">Minimum</div>
                      <div className="text-lg font-semibold">${results.min.toFixed(2)}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <div className="text-xs text-gray-500">Maximum</div>
                      <div className="text-lg font-semibold">${results.max.toFixed(2)}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-md font-medium">Percentiles</h4>
                    <div className="flex items-center bg-gray-100 px-3 py-1 rounded-md">
                      <span className="text-sm font-medium text-gray-700 mr-2">Current Price:</span>
                      <span className="text-sm font-bold">${currentPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Percentile
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Value
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            % Diff from Market
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {results.percentiles.map(({ percentile, value }) => {
                          const diff = calculateDifference(value);
                          const diffColor = getDifferenceColor(diff);

                          // Determine row background color based on percentile range
                          let rowClass = "";
                          if (percentile >= 30 && percentile <= 70) {
                            rowClass = "bg-amber-50 border-l-4 border-amber-400";
                          } else if (percentile === 50) {
                            rowClass = "bg-blue-50"; // Keep existing special case for median if desired
                          }

                          return (
                            <tr key={percentile} className={rowClass}>
                              <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-900 font-medium">
                                {percentile}%
                                {percentile === 50 && <span className="ml-1 text-blue-600 text-xs">(median)</span>}
                              </td>
                              <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-900 text-right">
                                ${value.toFixed(2)}
                              </td>
                              <td className={`px-6 py-2 whitespace-nowrap text-sm font-medium text-right ${diffColor}`}>
                                {diff > 0 ? "+" : ""}
                                {diff.toFixed(2)}%{diff > 0 ? " (Undervalued)" : diff < 0 ? " (Overvalued)" : ""}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <div className="mb-2 flex items-center text-xs text-gray-600">
                        <div className="w-3 h-3 bg-amber-50 border border-amber-400 mr-1"></div>
                        <span>30-70 percentile range highlights the most probable outcomes</span>
                      </div>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[500px] text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-gray-300 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <p className="text-center">Select at least one variable and run the simulation to see results.</p>
                <p className="text-center text-sm mt-2">Tip: Enable a variable by checking the box next to it.</p>
              </div>
            )}
          </div>
        </div>
        {/* Full-width Distribution Chart */}
        {results && (
          <div className="bg-white rounded-lg p-6 shadow mb-10 mt-5">
            <h3 className="text-lg font-semibold mb-6">Distribution of Intrinsic Values</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={results.histogram} margin={{ top: 20, right: 20, left: 20, bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="x"
                  type="number"
                  // Force domain to stick to the actual data min/max
                  domain={["dataMin", "dataMax"]}
                  // tickCount might have less effect now, or produce less 'nice' numbers
                  // You might need to adjust tickCount or use manual ticks if intervals look bad
                  tickCount={10}
                  tickFormatter={(value) => `${Math.round(value)}`}
                  label={{
                    value: "Intrinsic Value ($)",
                    position: "outsideCenter",
                    offset: 10,
                    dy: 30,
                    style: {
                      fontWeight: "bold",
                      fill: "black",
                    },
                  }}
                  // Keep internal padding or remove/reduce it if you want bars closer to edges
                  padding={{ left: 20, right: 20 }}
                />
                <YAxis
                  // --- YAxis props remain the same ---
                  label={{
                    value: "Frequency",
                    angle: 0,
                    position: "insideLeft",
                    dy: -185,
                    dx: 40,
                    style: {
                      textAnchor: "middle",
                      fontWeight: "bold",
                      fill: "black",
                    },
                  }}
                  padding={{ top: 10, bottom: 10 }}
                  tickFormatter={(value) => {
                    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                    if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
                    return value;
                  }}
                  width={38}
                />
                <Tooltip
                  formatter={(value) => [`${value}`, "Frequency"]}
                  labelFormatter={(labelValue, payload) => {
                    if (payload && payload.length > 0 && payload[0].payload.binStart !== undefined) {
                      return `${payload[0].payload.binStart.toFixed(2)} - ${payload[0].payload.binEnd.toFixed(2)}`;
                    }
                    return `Value: ${parseFloat(labelValue).toFixed(2)}`;
                  }}
                />
                <Legend verticalAlign="top" align="right" wrapperStyle={{ top: 0, right: 0 }} />
                <Bar dataKey="frequency" name="Frequency" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
        <div className="w-full mt-6">
          <Image
            src="/distributionChoices.png"
            width={3000}
            height={3000}
            alt="Distribution Choice Guide"
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </div>
  );
}
