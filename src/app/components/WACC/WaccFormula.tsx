import React from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import * as conv from "../../utils/helper";

const FormulaBox = ({ label, value, dark = false }) => (
  <div className={`border rounded-md p-3 w-32 text-center ${dark ? "bg-gray-800 text-white" : "bg-white"}`}>
    <div className="text-sm font-bold">{label}</div>
    <div className="text-lg ">{value}</div>
  </div>
);

const OperatorBox = ({ children }) => (
  <div className="flex items-center justify-center w-12 h-12 text-xl">{children}</div>
);

const WaccFormula = ({ wacc, costOfEquity, equityWeight, costOfDebt, debtWeight }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 p-6 rounded-lg mb-10">
      <FormulaBox label="WACC" value={conv.convRound2Dp(wacc) + "%"} dark />
      <OperatorBox>=</OperatorBox>
      <div className="flex items-center gap-6">
        <FormulaBox label="Cost of Equity" value={conv.convRound2Dp(costOfEquity) + "%"} />
        <OperatorBox>
          <FaTimes />
        </OperatorBox>
        <FormulaBox label="Equity Weight" value={conv.convDecimalToPercentage(equityWeight) + "%"} />
      </div>
      <OperatorBox>
        <FaPlus />
      </OperatorBox>
      <div className="flex items-center gap-6">
        <FormulaBox label="Cost of Debt" value={conv.convRound2Dp(costOfDebt) + "%"} />
        <OperatorBox>
          <FaTimes />
        </OperatorBox>
        <FormulaBox label="Debt Weight" value={conv.convDecimalToPercentage(debtWeight) + "%"} />
      </div>
    </div>
  );
};

export default WaccFormula;
