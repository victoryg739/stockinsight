import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import {
  DistributionType,
  DistributionParams,
  NormalParams,
  UniformParams,
  TriangularParams,
  LogisticParams,
  ExponentialParams,
  LognormalParams,
  MinExtremeParams,
  DataPoint,
} from "../utils/distributionTypes";

// Define props for the component
interface DistributionPreviewChartProps {
  distributionType: DistributionType;
  params: DistributionParams;
  variableId: string;
  variableLabel: string;
  variableValue: number;
}

// Component to preview what a distribution looks like
const DistributionPreviewChart: React.FC<DistributionPreviewChartProps> = ({
  distributionType,
  params,
  variableId,
  variableLabel,
  variableValue,
}) => {
  const [distributionData, setDistributionData] = useState<DataPoint[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Generate sample data points for the selected distribution
  useEffect(() => {
    try {
      // Safety check - if params are undefined or have invalid values, don't attempt calculation
      if (!params || typeof params !== "object") {
        setDistributionData([]);
        return;
      }

      const generateDistributionData = (): DataPoint[] => {
        let data: DataPoint[] = [];
        const MAX_POINTS = 100; // Limit number of points to prevent performance issues
        const MIN_DENSITY = 0.0001; // Minimum probability density to include a point

        switch (distributionType) {
          case "Normal": {
            // Guard against invalid parameters
            const typedParams = params as NormalParams;
            const mean = typedParams.mean;
            const stdDev = Math.max(typedParams.stdDev, 0.01); // Prevent division by zero

            const min = mean - 4 * stdDev;
            const max = mean + 4 * stdDev;
            const step = (max - min) / MAX_POINTS;

            for (let i = 0; i <= MAX_POINTS; i++) {
              const x = min + i * step;
              const y = (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2));
              // Only add points with significant density
              if (y > MIN_DENSITY) {
                data.push({ x, y });
              }
            }
            break;
          }
          case "Uniform": {
            // Guard against invalid parameters
            const typedParams = params as UniformParams;
            const min = typedParams.min;
            const max = typedParams.max;

            if (min >= max) {
              data = [
                { x: min - 1, y: 0 },
                { x: min, y: 1 },
                { x: max, y: 1 },
                { x: max + 1, y: 0 },
              ];
              break;
            }

            const padding = Math.max((max - min) * 0.1, 0.1);
            const chartMin = min - padding;
            const chartMax = max + padding;
            const step = (chartMax - chartMin) / MAX_POINTS;

            // For uniform, we need boundary points for proper rendering
            data.push({ x: chartMin, y: 0 }); // Add left boundary point

            for (let i = 0; i <= MAX_POINTS; i++) {
              const x = chartMin + i * step;
              const y = x >= min && x <= max ? 1 / (max - min) : 0;
              // For uniform, we want to include the key points that define the shape
              if (
                y > MIN_DENSITY ||
                (i > 0 && data[data.length - 1].y > MIN_DENSITY && y === 0) || // Include the first point after a non-zero point
                (i < MAX_POINTS && chartMin + (i + 1) * step >= min && chartMin + (i + 1) * step <= max)
              ) {
                // Include points before distribution starts
                data.push({ x, y });
              }
            }

            data.push({ x: chartMax, y: 0 }); // Add right boundary point
            break;
          }
          case "Triangular": {
            // Guard against invalid parameters
            const typedParams = params as TriangularParams;
            const min = typedParams.min;
            const mode = typedParams.mode;
            const max = typedParams.max;

            if (min >= max) {
              data = [{ x: min, y: 1 }];
              break;
            }

            const padding = Math.max((max - min) * 0.1, 0.1);
            const chartMin = min - padding;
            const chartMax = max + padding;
            const step = (chartMax - chartMin) / MAX_POINTS;

            // Add key points for triangular distribution
            // Left boundary point
            data.push({ x: chartMin, y: 0, isControlPoint: true });

            // Point at min (start of distribution)
            data.push({ x: min, y: 0, isControlPoint: true });

            // Points between min and mode
            for (let i = 0; i <= MAX_POINTS / 3; i++) {
              const x = min + (i * (mode - min)) / (MAX_POINTS / 3);
              if (x > min && x < mode) {
                const y = (2 * (x - min)) / ((max - min) * (mode - min));
                if (y > MIN_DENSITY) {
                  data.push({ x, y });
                }
              }
            }

            // Point at mode (peak of distribution)
            const peakDensity = 2 / (max - min);
            data.push({ x: mode, y: peakDensity });

            // Points between mode and max
            for (let i = 0; i <= MAX_POINTS / 3; i++) {
              const x = mode + (i * (max - mode)) / (MAX_POINTS / 3);
              if (x > mode && x < max) {
                const y = (2 * (max - x)) / ((max - min) * (max - mode));
                if (y > MIN_DENSITY) {
                  data.push({ x, y });
                }
              }
            }

            // Point at max (end of distribution)
            data.push({ x: max, y: 0, isControlPoint: true });

            // Right boundary point
            data.push({ x: chartMax, y: 0, isControlPoint: true });
            break;
          }
          case "Logistic": {
            // Guard against invalid parameters
            const typedParams = params as LogisticParams;
            const location = typedParams.location;
            const scale = Math.max(typedParams.scale, 0.01); // Prevent division by zero

            const min = location - 6 * scale;
            const max = location + 6 * scale;
            const step = (max - min) / MAX_POINTS;

            for (let i = 0; i <= MAX_POINTS; i++) {
              const x = min + i * step;
              const expTerm = Math.exp(-(x - location) / scale);
              const y = expTerm / (scale * Math.pow(1 + expTerm, 2));
              if (y > MIN_DENSITY) {
                data.push({ x, y });
              }
            }
            break;
          }
          case "Exponential": {
            // Guard against invalid parameters
            const typedParams = params as ExponentialParams;
            const rate = Math.max(typedParams.rate, 0.01); // Prevent division by zero

            const max = 5 / rate;
            const step = max / MAX_POINTS;

            for (let i = 0; i <= MAX_POINTS; i++) {
              const x = i * step;
              const y = rate * Math.exp(-rate * x);
              if (y > MIN_DENSITY || i === 0) {
                // Always include the first point for exponential
                data.push({ x, y });
              }
            }
            break;
          }
          case "Lognormal": {
            // Guard against invalid parameters
            const typedParams = params as LognormalParams;
            const mu = typedParams.mu;
            const sigma = Math.max(typedParams.sigma, 0.01); // Prevent division by zero

            // Default to 0.1 to 10 if we don't have valid mu/sigma
            const min = Math.exp(mu - 3 * sigma) || 0.1;
            const max = Math.exp(mu + 3 * sigma) || 10;
            const step = (max - min) / MAX_POINTS;

            for (let i = 0; i <= MAX_POINTS; i++) {
              const x = min + i * step;
              if (x <= 0) continue; // Skip non-positive values for lognormal

              const logX = Math.log(x);
              const y = (1 / (x * sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((logX - mu) / sigma, 2));
              if (y > MIN_DENSITY) {
                data.push({ x, y });
              }
            }
            break;
          }
          case "Min Extreme": {
            // Guard against invalid parameters
            const typedParams = params as MinExtremeParams;
            const location = typedParams.location;
            const scale = Math.max(typedParams.scale, 0.01); // Prevent division by zero

            const min = location - 6 * scale;
            const max = location + 2 * scale;
            const step = (max - min) / MAX_POINTS;

            for (let i = 0; i <= MAX_POINTS; i++) {
              const x = min + i * step;
              const z = (x - location) / scale;
              const y = (1 / scale) * Math.exp(z - Math.exp(z));
              if (y > MIN_DENSITY) {
                data.push({ x, y });
              }
            }
            break;
          }
          default:
            data = [];
        }

        return data;
      };

      const newData = generateDistributionData();
      setDistributionData(newData);
      setError(null);
    } catch (err) {
      console.error("Error generating distribution data:", err);
      setError("Could not generate distribution preview");
      setDistributionData([]);
    }
  }, [distributionType, params]);

  const formatXAxis = (value: number): string => {
    if (
      variableId?.includes("revGrowth") ||
      variableId?.includes("opMargin") ||
      variableId === "initialWacc" ||
      variableId === "riskFreeRate"
    ) {
      return `${value.toFixed(2)}%`;
    }
    return value.toFixed(2);
  };

  // Custom tooltip content
  const CustomTooltip: React.FC<any> = ({ active, payload }) => {
    if (active && payload && payload.length && payload[0] && payload[0].payload) {
      const x = payload[0].payload.x;
      const y = payload[0].payload.y;

      if (y <= 0.0001 || payload[0].payload.isControlPoint) {
        return null;
      }

      return (
        <div className="bg-gray-800 text-white p-2 rounded shadow-lg text-xs">
          <p className="font-medium">{formatXAxis(x)}</p>
          <p className="text-gray-300">Probability Density: {y.toFixed(4)}</p>
        </div>
      );
    }
    return null;
  };

  if (error) {
    return (
      <div className="mt-3 bg-white p-3 rounded-lg border border-red-200">
        <div className="text-sm font-medium mb-1 text-red-600">Error in distribution preview</div>
        <div className="text-xs text-gray-500">Adjust parameters to valid values.</div>
      </div>
    );
  }

  return (
    <div className="mt-3 bg-white p-3 rounded-lg border border-gray-200">
      <div className="text-sm font-medium mb-1 text-gray-700">Distribution Preview: {variableLabel}</div>

      <div style={{ width: "100%", height: 150 }}>
        <ResponsiveContainer>
          <LineChart data={distributionData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="x"
              type="number"
              domain={["dataMin", "dataMax"]}
              tickFormatter={formatXAxis}
              tick={{ fontSize: 10 }}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} isAnimationActive={false} />
            <Line type="monotone" dataKey="y" stroke="#4f46e5" dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DistributionPreviewChart;
