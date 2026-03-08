import React from "react";
import CustomTooltip from "./CustomTooltip";

interface AssumptionOverridesProps {
  overrideTerminalWacc: boolean;
  overrideTerminalRoic: boolean;
  overrideRevGrowthPerpetuity: boolean;
  overrideTerminalRfr: boolean;
  setOverrideTerminalWacc: (v: boolean) => void;
  setOverrideTerminalRoic: (v: boolean) => void;
  setOverrideRevGrowthPerpetuity: (v: boolean) => void;
  setOverrideTerminalRfr: (v: boolean) => void;
  terminalWaccAuto: number;
  terminalRoicAuto: number;
  terminalRfrAuto: number;
  revGrowthAuto: number;
  terminalWaccCustom: number;
  terminalRfrCustom: number;
  setTerminalWaccCustom: (v: number) => void;
  setTerminalRfrCustom: (v: number) => void;
  roicTerminalYear: number;
  revGrowthPerpetuity: number;
  handleInputChange: (id: string, value: any, type: "inputs" | "fetchedInputs" | "stockInfo") => void;
}

const TOOLTIP_TERMINAL_WACC = `## Terminal WACC (Cost of Capital)

**Default assumption (No):** Terminal WACC = Mature Market ERP + Risk-Free Rate

This is Damodaran's steady-state cost of capital — reflecting what a diversified, mature firm should earn as a fair return for investors. It also auto-sets the ROIC terminal year when that override is off.

**Override (Yes):** Enter a custom terminal WACC.

Useful if you believe the firm's capital structure or risk profile at maturity will differ significantly from the market default.`;

const TOOLTIP_TERMINAL_ROIC = `## ROIC at Terminal Year

**Default assumption (No):** Terminal ROIC = Terminal WACC

Based on economic theory: competition erodes excess returns over time, so in the long run ROIC converges to the cost of capital (zero excess return). This is the neutral, no-moat assumption.

**Override (Yes):** Enter a custom terminal ROIC.

Use this for companies with **durable competitive moats** (e.g. network effects, switching costs, cost advantages). Compare to:
- Historical ROIC vs WACC spread
- Industry average ROIC
- Strength and longevity of the competitive advantage`;

const TOOLTIP_PERP_GROWTH = `## Revenue Growth Rate — Perpetuity

**Default assumption (No):** Terminal growth = Risk-Free Rate (or terminal RFR if overridden)

Damodaran's anchor: no firm can grow faster than the economy in perpetuity. Tying it to the risk-free rate ensures internal consistency and avoids impossible long-run growth assumptions.

**Override (Yes):** Enter a custom perpetuity growth rate.

Must be ≤ risk-free rate for theoretical consistency. You might lower it for a mature, low-growth business or raise it slightly for a firm in a structurally growing market.`;

const TOOLTIP_TERMINAL_RFR = `## Risk-Free Rate — Terminal Period

**Default assumption (No):** Same as the current fetched 10-year treasury yield.

Assumes the risk-free rate stays constant. This rate feeds into the terminal WACC calculation (when that override is off) and the default perpetuity growth rate.

**Override (Yes):** Enter an expected long-run risk-free rate.

Useful when you believe today's rate is transitory. For example, if the current 10-year yield is 4.5% but you expect a long-run equilibrium of 3%, you can reflect that here.`;

const ToggleSwitch = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
  <div className="flex items-center gap-2">
    <span className={`text-xs font-medium w-5 text-right ${!enabled ? "text-gray-700 dark:text-gray-200" : "text-gray-400 dark:text-gray-500"}`}>No</span>
    <button
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
        enabled ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-600"
      }`}
      aria-pressed={enabled}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform duration-200 ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
    <span className={`text-xs font-medium w-5 ${enabled ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"}`}>Yes</span>
  </div>
);

const LockedValue = ({ value }: { value: number }) => (
  <div className="w-32 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-sm text-gray-400 dark:text-gray-400 text-right select-none">
    {isNaN(value) || !isFinite(value) ? "—" : value.toFixed(2)}%
  </div>
);

const EditableValue = ({
  value,
  onChange,
}: {
  value: number | string;
  onChange: (v: string) => void;
}) => (
  <div className="relative w-32">
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-md py-2 pl-3 pr-8 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
    />
    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400 dark:text-gray-500">%</span>
  </div>
);

interface RowProps {
  label: string;
  tooltip: string;
  enabled: boolean;
  onToggle: () => void;
  autoValue: number;
  customValue: number | string;
  onCustomChange: (v: string) => void;
}

const AssumptionRow = ({ label, tooltip, enabled, onToggle, autoValue, customValue, onCustomChange }: RowProps) => (
  <div className="flex items-center justify-between gap-4 py-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
    <div className="flex items-center min-w-0 flex-1">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">{label}</span>
      <CustomTooltip content={tooltip} placement="right" />
    </div>
    <div className="flex items-center gap-6 flex-shrink-0">
      <ToggleSwitch enabled={enabled} onToggle={onToggle} />
      {enabled ? (
        <EditableValue value={customValue} onChange={onCustomChange} />
      ) : (
        <LockedValue value={autoValue} />
      )}
    </div>
  </div>
);

const AssumptionOverrides: React.FC<AssumptionOverridesProps> = ({
  overrideTerminalWacc,
  overrideTerminalRoic,
  overrideRevGrowthPerpetuity,
  overrideTerminalRfr,
  setOverrideTerminalWacc,
  setOverrideTerminalRoic,
  setOverrideRevGrowthPerpetuity,
  setOverrideTerminalRfr,
  terminalWaccAuto,
  terminalRoicAuto,
  terminalRfrAuto,
  revGrowthAuto,
  terminalWaccCustom,
  terminalRfrCustom,
  setTerminalWaccCustom,
  setTerminalRfrCustom,
  roicTerminalYear,
  revGrowthPerpetuity,
  handleInputChange,
}) => {
  const handleToggleTerminalWacc = () => {
    if (!overrideTerminalWacc) setTerminalWaccCustom(terminalWaccAuto);
    setOverrideTerminalWacc(!overrideTerminalWacc);
  };

  const handleToggleTerminalRoic = () => {
    if (!overrideTerminalRoic) handleInputChange("roicTerminalYear", terminalRoicAuto, "fetchedInputs");
    setOverrideTerminalRoic(!overrideTerminalRoic);
  };

  const handleToggleRevGrowthPerpetuity = () => {
    if (!overrideRevGrowthPerpetuity) handleInputChange("revGrowthPerpetuity", revGrowthAuto, "inputs");
    setOverrideRevGrowthPerpetuity(!overrideRevGrowthPerpetuity);
  };

  const handleToggleTerminalRfr = () => {
    if (!overrideTerminalRfr) setTerminalRfrCustom(terminalRfrAuto);
    setOverrideTerminalRfr(!overrideTerminalRfr);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
        Toggle <span className="font-semibold text-blue-600">Yes</span> to override a default assumption. When off, the
        model uses Damodaran&apos;s standard assumption (shown greyed out).
      </p>
      <AssumptionRow
        label="Override Terminal WACC"
        tooltip={TOOLTIP_TERMINAL_WACC}
        enabled={overrideTerminalWacc}
        onToggle={handleToggleTerminalWacc}
        autoValue={terminalWaccAuto}
        customValue={terminalWaccCustom}
        onCustomChange={(v) => {
          const parsed = parseFloat(v);
          setTerminalWaccCustom(isNaN(parsed) ? 0 : parsed);
        }}
      />
      <AssumptionRow
        label="Override ROIC at Terminal Year"
        tooltip={TOOLTIP_TERMINAL_ROIC}
        enabled={overrideTerminalRoic}
        onToggle={handleToggleTerminalRoic}
        autoValue={terminalRoicAuto}
        customValue={roicTerminalYear}
        onCustomChange={(v) => handleInputChange("roicTerminalYear", v, "fetchedInputs")}
      />
      <AssumptionRow
        label="Override Perpetuity Growth Rate"
        tooltip={TOOLTIP_PERP_GROWTH}
        enabled={overrideRevGrowthPerpetuity}
        onToggle={handleToggleRevGrowthPerpetuity}
        autoValue={revGrowthAuto}
        customValue={revGrowthPerpetuity}
        onCustomChange={(v) => handleInputChange("revGrowthPerpetuity", v, "inputs")}
      />
      <AssumptionRow
        label="Override Terminal Risk-Free Rate"
        tooltip={TOOLTIP_TERMINAL_RFR}
        enabled={overrideTerminalRfr}
        onToggle={handleToggleTerminalRfr}
        autoValue={terminalRfrAuto}
        customValue={terminalRfrCustom}
        onCustomChange={(v) => {
          const parsed = parseFloat(v);
          setTerminalRfrCustom(isNaN(parsed) ? 0 : parsed);
        }}
      />
    </div>
  );
};

export default AssumptionOverrides;
