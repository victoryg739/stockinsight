import React from "react";

export type CompanyValue = {
  label: string;
  value: number | null;
};

export type MetricSectionProps = {
  title: string;
  companyValues: CompanyValue[];
  industryUS: number | null;
  industryGlobal: number | null;
  q1: number | null;
  median: number | null;
  q3: number | null;
  isPercent: boolean;
  // Optional: primary company value for positioning on distribution bar
  primaryCompanyValue?: number | null;
};

const fmt = (v: number | null, isPercent: boolean): string => {
  if (v == null) return "N/A";
  const rounded = parseFloat(v.toFixed(2));
  return isPercent ? `${rounded}%` : rounded.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

// Returns a position percentage (0–100) on a Q1–Q3 scale, clamped
const getBarPosition = (value: number, q1: number, q3: number): number => {
  if (q3 === q1) return 50;
  const pos = ((value - q1) / (q3 - q1)) * 100;
  return Math.max(2, Math.min(98, pos));
};

const getCompanyColor = (value: number | null, q1: number | null, median: number | null): string => {
  if (value == null || q1 == null || median == null) return "bg-gray-400";
  if (value >= median) return "bg-emerald-500";
  if (value >= q1) return "bg-amber-400";
  return "bg-red-500";
};

const getTextColor = (value: number | null, q1: number | null, median: number | null): string => {
  if (value == null || q1 == null || median == null) return "text-gray-500";
  if (value >= median) return "text-emerald-600";
  if (value >= q1) return "text-amber-600";
  return "text-red-600";
};

const StatCard = ({
  label,
  value,
  muted = false,
  highlight = false,
  colorClass = "",
}: {
  label: string;
  value: string;
  muted?: boolean;
  highlight?: boolean;
  colorClass?: string;
}) => (
  <div
    className={`flex flex-col items-center justify-center rounded-xl px-4 py-3 ${
      highlight ? "bg-white shadow-sm border border-gray-200" : "bg-gray-50"
    }`}
  >
    <span className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">{label}</span>
    <span
      className={`text-lg font-bold font-mono ${
        muted ? "text-gray-400" : colorClass || "text-blue-700"
      }`}
    >
      {value}
    </span>
  </div>
);

const MetricSection = ({
  title,
  companyValues,
  industryUS,
  industryGlobal,
  q1,
  median,
  q3,
  isPercent,
  primaryCompanyValue,
}: MetricSectionProps) => {
  const hasDistribution = q1 != null && median != null && q3 != null;
  const primaryVal = primaryCompanyValue ?? companyValues[0]?.value ?? null;
  const dotColorClass = getCompanyColor(primaryVal, q1, median);
  const companyTextColor = getTextColor(primaryVal, q1, median);

  return (
    <div className="overflow-hidden rounded-2xl shadow-md border border-gray-100 mt-6">
      {/* Section Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white px-5 py-3">
        <h3 className="text-sm font-semibold uppercase tracking-widest">{title}</h3>
      </div>

      <div className="bg-white px-5 py-4 space-y-4">
        {/* Stat Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Company values */}
          {companyValues.map((cv) => (
            <StatCard
              key={cv.label}
              label={cv.label}
              value={fmt(cv.value, isPercent)}
              highlight
              colorClass={companyTextColor}
            />
          ))}

          {/* Industry US */}
          <StatCard
            label="US Industry"
            value={fmt(industryUS, isPercent)}
            muted={industryUS == null}
          />

          {/* Industry Global */}
          <StatCard
            label="Global Industry"
            value={fmt(industryGlobal, isPercent)}
            muted={industryGlobal == null}
          />
        </div>

        {/* Distribution Bar */}
        {hasDistribution ? (
          <div className="pt-1">
            <span className="text-xs text-gray-400 font-medium">Industry Distribution</span>

            {/* Bar track — height accommodates label + arrow + bar */}
            <div className="relative mx-1 mt-3" style={{ height: "46px" }}>

              {/* Label + arrow as a single unit so they always stay in sync */}
              {primaryVal != null && (() => {
                const belowQ1 = primaryVal <= q1!;
                const aboveQ3 = primaryVal >= q3!;
                const groupPos = belowQ1 ? 0 : aboveQ3 ? 100 : getBarPosition(primaryVal, q1!, q3!);
                // Anchor: left-align at Q1 edge, right-align at Q3 edge, center otherwise
                const transform = belowQ1 ? "translateX(0%)" : aboveQ3 ? "translateX(-100%)" : "translateX(-50%)";
                const arrowAlign = belowQ1 ? "items-start" : aboveQ3 ? "items-end" : "items-center";
                const arrowColor =
                  dotColorClass === "bg-emerald-500" ? "fill-emerald-500"
                  : dotColorClass === "bg-amber-400"  ? "fill-amber-400"
                  : dotColorClass === "bg-red-500"    ? "fill-red-500"
                  :                                     "fill-gray-400";
                return (
                  <div
                    className={`absolute flex flex-col ${arrowAlign}`}
                    style={{ left: `${groupPos}%`, top: "0px", transform }}
                  >
                    <span className={`text-xs font-semibold whitespace-nowrap leading-none mb-0.5 ${companyTextColor}`}>
                      {fmt(primaryVal, isPercent)}
                    </span>
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <polygon points="6,10 0,0 12,0" className={arrowColor} />
                    </svg>
                  </div>
                );
              })()}

              {/* Background track */}
              <div className="absolute left-0 right-0 h-1.5 bg-gray-200 rounded-full" style={{ top: "34px" }} />

              {/* Q1–Q3 fill */}
              <div className="absolute h-1.5 bg-blue-200 rounded-full" style={{ left: "0%", width: "100%", top: "34px" }} />

              {/* Q1 marker */}
              <div className="absolute w-1.5 h-4 bg-blue-400 rounded-sm" style={{ left: "0%", top: "28px" }} />

              {/* Median marker */}
              {(() => {
                const medPos = getBarPosition(median!, q1!, q3!);
                return (
                  <div
                    className="absolute w-1.5 h-4 bg-blue-600 rounded-sm -translate-x-1/2"
                    style={{ left: `${medPos}%`, top: "28px" }}
                  />
                );
              })()}

              {/* Q3 marker */}
              <div className="absolute w-1.5 h-4 bg-blue-400 rounded-sm -translate-x-full" style={{ left: "100%", top: "28px" }} />
            </div>

            {/* Q1 / Median / Q3 labels */}
            <div className="flex justify-between mt-1 text-xs text-gray-400">
              <span>Q1: {fmt(q1, isPercent)}</span>
              <span className="text-blue-600 font-medium">Median: {fmt(median, isPercent)}</span>
              <span>Q3: {fmt(q3, isPercent)}</span>
            </div>
          </div>
        ) : (
          <p className="text-xs text-gray-400 italic">Distribution data unavailable for this metric</p>
        )}
      </div>
    </div>
  );
};

export default MetricSection;
