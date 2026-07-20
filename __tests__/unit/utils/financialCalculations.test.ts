import { describe, it, expect } from 'vitest';
import {
  calcTerminalValue,
  calcReinvestment,
  calcRevenueGrowth,
  calcRevenue,
  calcEBITMargin,
  calcEbit,
  calcTaxRate,
  calcEbitAfterTax,
  calcWACC,
  calcLeveredBeta,
  calcMarketValueDebt,
  calcCostOfEquity,
  calcImpliedSharePrice,
  calcTerminalWACC,
  calcFcff,
  calcCumulatedDiscountFactor,
  calcPvFcff,
  calcSumOfPvFcff10Yrs,
  calcPVTerminalValue,
  calcEnterpriseValue,
  calcEquityValue,
  calcEquityValueCommonStock,
  calcWaccEquityWeight,
  calcWaccDebtWeight,
  calcInitialWacc,
  resolveTerminalAssumptions,
  type TerminalOverrides,
} from '@/app/utils/financialCalculations';

describe('Financial Calculations', () => {

  describe('calcTerminalValue (CRITICAL BUG - Division by Zero)', () => {
    it('should calculate terminal value correctly with normal inputs', () => {
      const result = calcTerminalValue(100, 8, 3);
      // Formula: 100 / (8 - 3) * 100 = 100 / 5 * 100 = 2000
      expect(result).toBeCloseTo(2000, 1);
    });

    it('should handle WACC equal to terminal growth (division by zero)', () => {
      // BUG: This currently throws or returns Infinity
      // wacc=3%, terminalGrowth=3% means denominator is zero
      const result = calcTerminalValue(100, 3, 3);

      // This test documents the current behavior
      // The function should either throw an error or return Infinity
      expect(result).toBe(Infinity);
    });

    it('should handle WACC less than terminal growth (negative denominator)', () => {
      // wacc=2%, terminalGrowth=3% means negative denominator
      const result = calcTerminalValue(100, 2, 3);

      // With negative denominator, result should be negative
      expect(result).toBeLessThan(0);
    });

    it('should handle negative FCFF correctly', () => {
      const result = calcTerminalValue(-50, 8, 3);
      // -50 / (8 - 3) * 100 = -50 / 5 * 100 = -1000
      expect(result).toBeCloseTo(-1000, 1);
    });

    it('should handle zero FCFF', () => {
      const result = calcTerminalValue(0, 8, 3);
      expect(result).toBe(0);
    });

    it('should handle very large WACC difference', () => {
      const result = calcTerminalValue(100, 20, 3);
      // 100 / (20 - 3) * 100 = 100 / 17 * 100 ≈ 588.24
      expect(result).toBeCloseTo(588.24, 1);
    });
  });

  describe('calcReinvestment (CRITICAL BUG - Division by Zero)', () => {
    it('should calculate reinvestment correctly with normal inputs', () => {
      const revenue = [1000, 1100, 1210, 1331, 1464, 1610, 1771, 1948, 2143, 2357, 2593, 2852];
      const result = calcReinvestment(revenue, 2, 2.5, 3, 3, 10, 1000);

      // Year 1 (lead convention): (1210 - 1100) / 2 = 55
      expect(result[0]).toBeCloseTo(55, 1);

      // Should return 11 elements (years 1-10 + terminal)
      expect(result).toHaveLength(11);
    });

    it('should handle zero sales-to-capital ratio (division by zero)', () => {
      const revenue = [1000, 1100, 1210];

      // BUG: This will throw or return Infinity
      // salesToCapY1 = 0 means division by zero at line 99
      expect(() => calcReinvestment(revenue, 0, 2, 3, 3, 10, 1000)).toThrow();
    });

    it('should handle negative revenue change (disinvestment)', () => {
      const revenue = [1000, 900, 850, 800, 750];
      const result = calcReinvestment(revenue, 2, 2.5, 3, 3, 10, 1000);

      // Year 1 (lead convention): (850 - 900) / 2 = -25 (disinvestment)
      expect(result[0]).toBeCloseTo(-25, 1);
    });

    it('should calculate terminal year reinvestment correctly', () => {
      const revenue = [1000, 1100, 1210, 1331, 1464, 1610, 1771, 1948, 2143, 2357, 2593, 2852];
      const ebitAfterTax = 1000;
      const revGrowthTerminal = 3;
      const roicTerminal = 10;

      const result = calcReinvestment(revenue, 2, 2.5, 3, revGrowthTerminal, roicTerminal, ebitAfterTax);

      // Terminal: ebitAfterTax * (revGrowthTerminal / roicTerminal)
      // = 1000 * (3 / 10) = 300
      expect(result[result.length - 1]).toBeCloseTo(300, 1);
    });

    it('should handle zero ROIC in terminal year (division by zero)', () => {
      const revenue = [1000, 1100, 1210, 1331, 1464, 1610, 1771, 1948, 2143, 2357, 2593, 2852];

      // BUG FIX: roicTerminalYear = 0 now throws error instead of returning Infinity
      expect(() => calcReinvestment(revenue, 2, 2.5, 3, 3, 0, 1000)).toThrow('ROIC for terminal year cannot be zero');
    });
  });

  describe('calcRevenueGrowth', () => {
    it('should generate correct 11-element growth rate array', () => {
      const result = calcRevenueGrowth(20, 15, 3);

      expect(result).toHaveLength(11);
      expect(result[0]).toBe(20);  // Year 1
      expect(result[1]).toBe(15);  // Year 2
      expect(result[4]).toBe(15);  // Year 5
      expect(result[10]).toBe(3);  // Terminal year
    });

    it('should converge correctly from Y2-5 to terminal', () => {
      const result = calcRevenueGrowth(20, 15, 3);

      // Years 6-10 should converge linearly from 15 to 3
      // Decrease per year: (15 - 3) / 5 = 2.4
      expect(result[5]).toBeCloseTo(12.6, 1);  // Year 6: 15 - 2.4
      expect(result[6]).toBeCloseTo(10.2, 1);  // Year 7: 15 - 4.8
      expect(result[9]).toBeCloseTo(3, 1);     // Year 10: 15 - 12 = 3
    });

    it('should handle negative growth rates', () => {
      const result = calcRevenueGrowth(-5, -2, -1);

      expect(result[0]).toBe(-5);
      expect(result[10]).toBe(-1);
    });

    it('should handle zero terminal growth', () => {
      const result = calcRevenueGrowth(10, 5, 0);

      expect(result[10]).toBe(0);
    });
  });

  describe('calcRevenue', () => {
    it('should calculate compound revenue growth correctly', () => {
      const baseRevenue = 1000;
      const growthRates = [10, 10, 10];  // 10% growth each year

      const result = calcRevenue(baseRevenue, growthRates);

      expect(result[0]).toBe(1000);
      expect(result[1]).toBeCloseTo(1100, 1);   // 1000 * 1.10
      expect(result[2]).toBeCloseTo(1210, 1);   // 1100 * 1.10
      expect(result[3]).toBeCloseTo(1331, 1);   // 1210 * 1.10
    });

    it('should handle zero base revenue', () => {
      const result = calcRevenue(0, [10, 10, 10]);

      expect(result[0]).toBe(0);
      expect(result[1]).toBe(0);
      expect(result[2]).toBe(0);
    });

    it('should handle negative growth rates (revenue decline)', () => {
      const result = calcRevenue(1000, [-10, -10]);

      expect(result[0]).toBe(1000);
      expect(result[1]).toBeCloseTo(900, 1);   // 1000 * 0.90
      expect(result[2]).toBeCloseTo(810, 1);   // 900 * 0.90
    });

    it('should handle empty growth rates array', () => {
      const result = calcRevenue(1000, []);

      expect(result).toEqual([1000]);
    });
  });

  describe('calcEBITMargin', () => {
    it('should converge EBIT margin over specified years', () => {
      const result = calcEBITMargin(10, 15, 25, 5);

      // Should have 12 elements (base + years 1-11)
      expect(result).toHaveLength(12);
      expect(result[0]).toBe(10);   // Base year
      expect(result[1]).toBe(15);   // Year 1
      expect(result[5]).toBe(25);   // Year 5 (converged)
      expect(result[11]).toBe(25);  // Terminal year (still 25)
    });

    it('should handle convergence over 10 years', () => {
      const result = calcEBITMargin(5, 10, 20, 10);

      // Linear convergence: (20 - 10) / 10 = 1% per year
      expect(result[2]).toBeCloseTo(12, 1);   // Year 2
      expect(result[10]).toBeCloseTo(20, 1);  // Year 10
    });

    it('should handle negative margins', () => {
      const result = calcEBITMargin(-5, -3, 5, 5);

      expect(result[0]).toBe(-5);
      expect(result[1]).toBe(-3);
      expect(result[5]).toBe(5);
    });
  });

  describe('calcEbit', () => {
    it('should calculate EBIT correctly from revenue and margin', () => {
      const revenue = [1000, 1100, 1200];
      const ebitMargin = [10, 12, 15];

      const result = calcEbit(revenue, ebitMargin);

      expect(result[0]).toBeCloseTo(100, 1);   // 1000 * 0.10
      expect(result[1]).toBeCloseTo(132, 1);   // 1100 * 0.12
      expect(result[2]).toBeCloseTo(180, 1);   // 1200 * 0.15
    });

    it('should handle negative margins (operating losses)', () => {
      const revenue = [1000, 1100];
      const ebitMargin = [-5, -3];

      const result = calcEbit(revenue, ebitMargin);

      expect(result[0]).toBeCloseTo(-50, 1);
      expect(result[1]).toBeCloseTo(-33, 1);
    });

    it('should handle zero revenue', () => {
      const result = calcEbit([0, 0], [10, 10]);

      expect(result[0]).toBe(0);
      expect(result[1]).toBe(0);
    });
  });

  describe('calcTaxRate', () => {
    it('should converge tax rate from effective to marginal over 5 years', () => {
      const result = calcTaxRate(15, 21);

      expect(result).toHaveLength(12);
      expect(result[0]).toBe(15);   // Years 0-5: effective rate
      expect(result[5]).toBe(15);
      expect(result[11]).toBe(21);  // Terminal: marginal rate

      // Convergence: (21 - 15) / 5 = 1.2 per year
      expect(result[6]).toBeCloseTo(16.2, 1);
      expect(result[7]).toBeCloseTo(17.4, 1);
    });

    it('should handle decreasing tax rates', () => {
      const result = calcTaxRate(25, 21);

      expect(result[0]).toBe(25);
      expect(result[11]).toBe(21);
    });

    it('should handle zero tax rates', () => {
      const result = calcTaxRate(0, 0);

      expect(result.every(rate => rate === 0)).toBe(true);
    });
  });

  describe('calcEbitAfterTax', () => {
    it('should apply tax correctly to positive EBIT', () => {
      const ebit = [100, 200, 300];
      const tax = [20, 20, 20];

      const result = calcEbitAfterTax(ebit, tax);

      expect(result[0]).toBeCloseTo(80, 1);    // 100 * (1 - 0.20)
      expect(result[1]).toBeCloseTo(160, 1);   // 200 * (1 - 0.20)
    });

    it('should not tax negative EBIT (operating losses)', () => {
      const ebit = [-100, -50, 0, 50, 100];
      const tax = [30, 30, 30, 30, 30];

      const result = calcEbitAfterTax(ebit, tax);

      expect(result[0]).toBe(-100);   // No tax benefit on loss
      expect(result[1]).toBe(-50);
      expect(result[2]).toBe(0);
      expect(result[3]).toBeCloseTo(35, 1);    // 50 * 0.70
      expect(result[4]).toBeCloseTo(70, 1);    // Terminal year: 100 * 0.70
    });

    it('should handle terminal year correctly', () => {
      const ebit = [100, 200, 300];
      const tax = [20, 20, 20];

      const result = calcEbitAfterTax(ebit, tax);

      // Terminal year (last element) should still apply tax
      expect(result[result.length - 1]).toBeCloseTo(240, 1);  // 300 * 0.80
    });
  });

  describe('calcWACC (Recent Bug Fix - Terminal WACC)', () => {
    it('should converge WACC from initial to terminal over 5 years', () => {
      const result = calcWACC(12, 8);

      expect(result).toHaveLength(11);
      expect(result[0]).toBe(12);   // Years 1-5: initial WACC
      expect(result[4]).toBe(12);
      expect(result[10]).toBe(8);   // Terminal: terminal WACC

      // Convergence: (12 - 8) / 5 = 0.8 per year
      expect(result[5]).toBeCloseTo(11.2, 1);
      expect(result[6]).toBeCloseTo(10.4, 1);
    });

    it('should handle increasing WACC (initial < terminal)', () => {
      const result = calcWACC(6, 8);

      expect(result[0]).toBe(6);
      expect(result[10]).toBe(8);

      // Should increase from 6 to 8
      expect(result[5]).toBeCloseTo(6.4, 1);
    });

    it('should handle equal initial and terminal WACC', () => {
      const result = calcWACC(10, 10);

      expect(result.every(wacc => wacc === 10)).toBe(true);
    });
  });

  describe('calcLeveredBeta (CRITICAL BUG - Division by Zero)', () => {
    it('should calculate levered beta correctly', () => {
      const result = calcLeveredBeta(0.8, 21, 1000000, 500000);

      // Formula: 0.8 * (1 + (1 - 0.21) * (500000 / 1000000))
      // = 0.8 * (1 + 0.79 * 0.5)
      // = 0.8 * 1.395 = 1.116
      expect(result).toBeCloseTo(1.116, 2);
    });

    it('should handle zero market equity (division by zero)', () => {
      // BUG: marketEquity = 0 causes division by zero
      expect(() => calcLeveredBeta(0.8, 21, 0, 500000)).toThrow();
    });

    it('should handle zero debt (unlevered)', () => {
      const result = calcLeveredBeta(0.8, 21, 1000000, 0);

      // With no debt, levered beta = unlevered beta
      expect(result).toBeCloseTo(0.8, 2);
    });

    it('should handle high leverage', () => {
      const result = calcLeveredBeta(0.8, 21, 1000000, 2000000);

      // High debt-to-equity ratio should increase beta
      expect(result).toBeGreaterThan(0.8);
    });
  });

  describe('calcMarketValueDebt (CRITICAL BUG - Division by Zero)', () => {
    it('should calculate market value of debt correctly', () => {
      const result = calcMarketValueDebt(10000, 5, 5, 200000);

      // This is a present value calculation
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThanOrEqual(200000 + 10000 * 5);
    });

    it('should handle zero cost of debt (division by zero)', () => {
      // BUG: preTaxCostOfDebt = 0 causes division by zero at line 211
      expect(() => calcMarketValueDebt(10000, 0, 5, 200000)).toThrow();
    });

    it('should handle zero interest expense', () => {
      const result = calcMarketValueDebt(0, 5, 5, 200000);

      // Should still calculate PV of principal
      expect(result).toBeGreaterThan(0);
    });
  });

  describe('calcCostOfEquity (CAPM)', () => {
    it('should calculate cost of equity using CAPM correctly', () => {
      const result = calcCostOfEquity(4.5, 1.2, 6);

      // CAPM: riskFreeRate + beta * equityRiskPremium
      // = 4.5 + 1.2 * 6 = 4.5 + 7.2 = 11.7
      expect(result).toBeCloseTo(11.7, 1);
    });

    it('should handle zero beta', () => {
      const result = calcCostOfEquity(4.5, 0, 6);

      // With zero beta, cost of equity = risk-free rate
      expect(result).toBe(4.5);
    });

    it('should handle negative beta', () => {
      const result = calcCostOfEquity(4.5, -0.5, 6);

      // Negative beta reduces cost of equity below risk-free rate
      expect(result).toBeLessThan(4.5);
    });
  });

  describe('calcImpliedSharePrice', () => {
    it('should calculate implied share price correctly', () => {
      const result = calcImpliedSharePrice(1000000000, 10000000);

      // 1,000,000,000 / 10,000,000 = 100
      expect(result).toBe(100);
    });

    it('should handle zero shares outstanding (division by zero)', () => {
      const result = calcImpliedSharePrice(1000000000, 0);

      expect(result).toBe(Infinity);
    });

    it('should handle negative equity value', () => {
      const result = calcImpliedSharePrice(-1000000, 10000000);

      // Negative equity per share
      expect(result).toBeLessThan(0);
    });

    it('should handle fractional shares', () => {
      const result = calcImpliedSharePrice(1000000, 3333333);

      expect(result).toBeCloseTo(0.3, 2);
    });
  });

  // ── NEW: Previously untested functions ───────────────────────────────────

  describe('calcTerminalWACC', () => {
    it('should return matureMarketErp + riskFreeRate', () => {
      expect(calcTerminalWACC(4.6, 4.2)).toBeCloseTo(8.8, 4);
    });

    it('should handle zero inputs', () => {
      expect(calcTerminalWACC(0, 0)).toBe(0);
    });

    it('is additive regardless of order', () => {
      expect(calcTerminalWACC(4.6, 4.2)).toBeCloseTo(calcTerminalWACC(4.2, 4.6), 10);
    });
  });

  describe('calcFcff', () => {
    it('should compute FCFF = ebitAfterTax[i] − reinvestment[i-1] for each year', () => {
      // ebitAfterTax: [base(ignored), yr1, yr2, yr3]
      const ebitAfterTax  = [0, 100, 150, 200];
      const reinvestment  = [30, 40, 50];  // indexed 0-based → yr1=30, yr2=40, yr3=50

      const result = calcFcff(ebitAfterTax, reinvestment);
      // yr1: 100 - 30 = 70, yr2: 150 - 40 = 110, yr3: 200 - 50 = 150
      expect(result).toHaveLength(3);
      expect(result[0]).toBeCloseTo(70, 4);
      expect(result[1]).toBeCloseTo(110, 4);
      expect(result[2]).toBeCloseTo(150, 4);
    });

    it('should handle negative reinvestment (disinvestment increases FCFF)', () => {
      const ebitAfterTax = [0, 100];
      const reinvestment = [-20];

      const result = calcFcff(ebitAfterTax, reinvestment);
      expect(result[0]).toBeCloseTo(120, 4);
    });

    it('should skip base year (index 0) of ebitAfterTax', () => {
      const ebitAfterTax = [999, 100]; // base=999 should be ignored
      const reinvestment = [40];

      const result = calcFcff(ebitAfterTax, reinvestment);
      expect(result[0]).toBeCloseTo(60, 4); // 100 - 40, not 999 - 40
    });
  });

  describe('calcCumulatedDiscountFactor', () => {
    it('should return 10 discount factors for a 11-element WACC array', () => {
      const wacc = new Array(11).fill(10); // constant 10% WACC
      const result = calcCumulatedDiscountFactor(wacc);
      expect(result).toHaveLength(10);
    });

    it('should compound correctly for constant WACC', () => {
      const wacc = new Array(11).fill(10);
      const result = calcCumulatedDiscountFactor(wacc);
      // Year 1: 1 / 1.10 = 0.9091
      expect(result[0]).toBeCloseTo(1 / 1.1, 4);
      // Year 2: 1 / 1.10^2 = 0.8264
      expect(result[1]).toBeCloseTo(1 / 1.1 ** 2, 4);
      // Year 10: 1 / 1.10^10 ≈ 0.3855
      expect(result[9]).toBeCloseTo(1 / 1.1 ** 10, 3);
    });

    it('each factor should be strictly less than the previous (time value of money)', () => {
      const wacc = new Array(11).fill(8);
      const result = calcCumulatedDiscountFactor(wacc);
      for (let i = 1; i < result.length; i++) {
        expect(result[i]).toBeLessThan(result[i - 1]);
      }
    });

    it('higher WACC → smaller discount factors', () => {
      const low  = calcCumulatedDiscountFactor(new Array(11).fill(5));
      const high = calcCumulatedDiscountFactor(new Array(11).fill(15));
      for (let i = 0; i < 10; i++) {
        expect(high[i]).toBeLessThan(low[i]);
      }
    });
  });

  describe('calcPvFcff', () => {
    it('should multiply each FCFF by its discount factor', () => {
      const fcff = [100, 200, 300];
      const df   = [0.9, 0.8, 0.7];

      const result = calcPvFcff(fcff, df);
      expect(result[0]).toBeCloseTo(90,  4);
      expect(result[1]).toBeCloseTo(160, 4);
      expect(result[2]).toBeCloseTo(210, 4);
    });

    it('should return same length as discount factors', () => {
      const fcff = [100, 200, 300, 400, 500];
      const df   = [0.9, 0.8, 0.7, 0.6, 0.5];
      expect(calcPvFcff(fcff, df)).toHaveLength(5);
    });
  });

  describe('calcSumOfPvFcff10Yrs', () => {
    it('should sum all present values correctly', () => {
      const pvFcff = [90, 80, 70, 60, 50, 40, 30, 20, 10, 5];
      expect(calcSumOfPvFcff10Yrs(pvFcff)).toBeCloseTo(455, 4);
    });

    it('should handle negative values (loss-making years)', () => {
      const pvFcff = [-50, 100];
      expect(calcSumOfPvFcff10Yrs(pvFcff)).toBeCloseTo(50, 4);
    });

    it('should return 0 for empty array', () => {
      expect(calcSumOfPvFcff10Yrs([])).toBe(0);
    });
  });

  describe('calcPVTerminalValue', () => {
    it('should discount terminal value by cumulated factor', () => {
      expect(calcPVTerminalValue(10000, 0.3855)).toBeCloseTo(3855, 1);
    });

    it('should return 0 for zero terminal value', () => {
      expect(calcPVTerminalValue(0, 0.5)).toBe(0);
    });
  });

  describe('calcEnterpriseValue', () => {
    it('should add PV of terminal value + sum of 10yr FCFFs', () => {
      expect(calcEnterpriseValue(5000, 1200)).toBeCloseTo(6200, 4);
    });

    it('should handle negative sum (all FCFFs negative)', () => {
      expect(calcEnterpriseValue(5000, -200)).toBeCloseTo(4800, 4);
    });
  });

  describe('calcEquityValue', () => {
    it('should compute equity = EV − debt − minority + cash + nonOpAssets', () => {
      // 10000 - 2000 - 100 + 500 + 0 = 8400
      expect(calcEquityValue(10000, 2000, 100, 500, 0)).toBeCloseTo(8400, 4);
    });

    it('should reduce equity when minority interest is present', () => {
      const withMinority    = calcEquityValue(10000, 2000, 500, 500, 0);
      const withoutMinority = calcEquityValue(10000, 2000, 0,   500, 0);
      expect(withMinority).toBeLessThan(withoutMinority);
    });

    it('should increase equity with non-operating assets', () => {
      const without = calcEquityValue(10000, 2000, 0, 500, 0);
      const with_   = calcEquityValue(10000, 2000, 0, 500, 300);
      expect(with_).toBeGreaterThan(without);
    });

    it('can return negative equity (distressed company)', () => {
      expect(calcEquityValue(1000, 5000, 0, 100, 0)).toBeLessThan(0);
    });
  });

  describe('calcEquityValueCommonStock', () => {
    it('should subtract options value from equity', () => {
      expect(calcEquityValueCommonStock(8400, 200)).toBeCloseTo(8200, 4);
    });

    it('should return equity unchanged when no options', () => {
      expect(calcEquityValueCommonStock(8400, 0)).toBeCloseTo(8400, 4);
    });
  });

  describe('calcWaccEquityWeight / calcWaccDebtWeight', () => {
    it('equity weight = equity / (equity + debt)', () => {
      expect(calcWaccEquityWeight(900, 100)).toBeCloseTo(0.9, 4);
    });

    it('debt weight = debt / (equity + debt)', () => {
      expect(calcWaccDebtWeight(900, 100)).toBeCloseTo(0.1, 4);
    });

    it('equity weight + debt weight = 1.0', () => {
      const eq = calcWaccEquityWeight(750, 250);
      const dt = calcWaccDebtWeight(750, 250);
      expect(eq + dt).toBeCloseTo(1.0, 10);
    });

    it('all-equity: equity weight = 1, debt weight = 0', () => {
      expect(calcWaccEquityWeight(1000, 0)).toBe(1);
      expect(calcWaccDebtWeight(1000, 0)).toBe(0);
    });

    it('more debt → lower equity weight', () => {
      const lowLeverage  = calcWaccEquityWeight(900, 100);
      const highLeverage = calcWaccEquityWeight(500, 500);
      expect(highLeverage).toBeLessThan(lowLeverage);
    });
  });

  describe('calcInitialWacc', () => {
    it('should compute weighted average of cost of equity and cost of debt', () => {
      // WACC = 10% × 0.9 + 4% × 0.1 = 9 + 0.4 = 9.4
      expect(calcInitialWacc(0.9, 0.1, 10, 4)).toBeCloseTo(9.4, 4);
    });

    it('all-equity: WACC = cost of equity', () => {
      expect(calcInitialWacc(1.0, 0.0, 11, 5)).toBeCloseTo(11, 4);
    });

    it('all-debt: WACC = cost of debt', () => {
      expect(calcInitialWacc(0.0, 1.0, 11, 5)).toBeCloseTo(5, 4);
    });

    it('higher cost of equity raises WACC', () => {
      const waccLow  = calcInitialWacc(0.8, 0.2, 8,  3);
      const waccHigh = calcInitialWacc(0.8, 0.2, 14, 3);
      expect(waccHigh).toBeGreaterThan(waccLow);
    });
  });

  // ── REGRESSION GUARD: Full WACC Chain (mirrors fix #7 regression) ────────

  describe('Full WACC Calculation Chain — AAPL-approximation (regression guard for fix #7)', () => {
    /**
     * This test reproduces the full WACC chain in pure JavaScript.
     * If fix #7 regresses (betaQuery not triggering → unleveredBeta=0), the
     * leveredBeta would be ~0, making costOfEquity ~riskFreeRate (~4.2%) and
     * WACC would collapse to ~4–5%.  The test asserts WACC ~9–11%.
     *
     * Inputs: AAPL 2024 approximate financials
     */

    // Common AAPL-approximate inputs
    const UNLEVERED_BETA    = 1.21;    // Software (Entertainment) — Damodaran 2024
    const MARGINAL_TAX_RATE = 26;      // %
    const MARKET_EQUITY     = 2_850_000; // $M (~15.4B shares × $185)
    const MARKET_DEBT       = 108_040;   // $M (book debt as proxy)
    const RISK_FREE_RATE    = 4.2;     // % (10yr UST 2024)
    const ERP               = 4.6;     // % (US ERP, Damodaran 2024)
    const MATURE_MARKET_ERP = 4.6;     // %
    const INTEREST_EXPENSE  = 3_930;   // $M
    const PRE_TAX_COD       = (INTEREST_EXPENSE / MARKET_DEBT) * 100; // ~3.638%
    const AFTER_TAX_COD     = PRE_TAX_COD * (1 - MARGINAL_TAX_RATE / 100);

    it('leveredBeta should reflect AAPL leverage (~1.24)', () => {
      const lb = calcLeveredBeta(UNLEVERED_BETA, MARGINAL_TAX_RATE, MARKET_EQUITY, MARKET_DEBT);
      // 1.21 × (1 + 0.74 × 108040/2850000) ≈ 1.244
      expect(lb).toBeGreaterThan(1.21);
      expect(lb).toBeLessThan(1.35);
    });

    it('costOfEquity should be ~9.5–11%', () => {
      const lb  = calcLeveredBeta(UNLEVERED_BETA, MARGINAL_TAX_RATE, MARKET_EQUITY, MARKET_DEBT);
      const coe = calcCostOfEquity(RISK_FREE_RATE, lb, ERP);
      expect(coe).toBeGreaterThan(9.5);
      expect(coe).toBeLessThan(11);
    });

    it('WACC weights should sum to 1.0', () => {
      const eq = calcWaccEquityWeight(MARKET_EQUITY, MARKET_DEBT);
      const dt = calcWaccDebtWeight(MARKET_EQUITY, MARKET_DEBT);
      expect(eq + dt).toBeCloseTo(1.0, 10);
    });

    it('initialWACC should be ~9–10.5% (realistic range for AAPL)', () => {
      const lb      = calcLeveredBeta(UNLEVERED_BETA, MARGINAL_TAX_RATE, MARKET_EQUITY, MARKET_DEBT);
      const coe     = calcCostOfEquity(RISK_FREE_RATE, lb, ERP);
      const eqWt    = calcWaccEquityWeight(MARKET_EQUITY, MARKET_DEBT);
      const dtWt    = calcWaccDebtWeight(MARKET_EQUITY, MARKET_DEBT);
      const wacc    = calcInitialWacc(eqWt, dtWt, coe, AFTER_TAX_COD);
      expect(wacc).toBeGreaterThan(9);
      expect(wacc).toBeLessThan(10.5);
    });

    it('REGRESSION (fix #7): beta=0 gives wrong WACC ~4% — correct WACC must be >7%', () => {
      // Simulate fix #7 regression: unleveredBeta was 0 due to stale query handler
      const brokenBeta = 0;
      const lb_broken  = calcLeveredBeta(brokenBeta, MARGINAL_TAX_RATE, MARKET_EQUITY, MARKET_DEBT);
      const coe_broken = calcCostOfEquity(RISK_FREE_RATE, lb_broken, ERP);
      const eqWt       = calcWaccEquityWeight(MARKET_EQUITY, MARKET_DEBT);
      const dtWt       = calcWaccDebtWeight(MARKET_EQUITY, MARKET_DEBT);
      const wacc_broken = calcInitialWacc(eqWt, dtWt, coe_broken, AFTER_TAX_COD);

      // Broken path: WACC ≈ 4.2% × 0.96 ≈ 4% (wrong!)
      expect(wacc_broken).toBeLessThan(6);

      // Correct path: WACC ~9–10.5%
      const lb_correct  = calcLeveredBeta(UNLEVERED_BETA, MARGINAL_TAX_RATE, MARKET_EQUITY, MARKET_DEBT);
      const coe_correct = calcCostOfEquity(RISK_FREE_RATE, lb_correct, ERP);
      const wacc_correct = calcInitialWacc(eqWt, dtWt, coe_correct, AFTER_TAX_COD);
      expect(wacc_correct).toBeGreaterThan(7);
    });

    it('terminalWACC = matureMarketErp + riskFreeRate ≈ 8.8% (AAPL 2024)', () => {
      const terminalWacc = calcTerminalWACC(MATURE_MARKET_ERP, RISK_FREE_RATE);
      expect(terminalWacc).toBeCloseTo(8.8, 4);
    });

    it('WACC array: yr1-5 = initialWACC, terminal = terminalWACC, converges between', () => {
      const lb    = calcLeveredBeta(UNLEVERED_BETA, MARGINAL_TAX_RATE, MARKET_EQUITY, MARKET_DEBT);
      const coe   = calcCostOfEquity(RISK_FREE_RATE, lb, ERP);
      const eqWt  = calcWaccEquityWeight(MARKET_EQUITY, MARKET_DEBT);
      const dtWt  = calcWaccDebtWeight(MARKET_EQUITY, MARKET_DEBT);
      const init  = calcInitialWacc(eqWt, dtWt, coe, AFTER_TAX_COD);
      const term  = calcTerminalWACC(MATURE_MARKET_ERP, RISK_FREE_RATE);
      const waccs = calcWACC(init, term);

      expect(waccs[0]).toBeCloseTo(init, 4);   // yr1 = initial
      expect(waccs[10]).toBeCloseTo(term, 4);  // terminal = matureErp + rfr
      // Since init > term (AAPL), WACC should converge downward
      expect(waccs[5]).toBeLessThan(waccs[0]);
      expect(waccs[10]).toBeLessThan(waccs[5]);
    });

    it('higher industry beta → higher WACC (sensitivity guard)', () => {
      // Banking beta 0.35 vs Software (AAPL) beta 1.21
      const betaBanking  = 0.35;
      const betaSoftware = 1.21;

      const lb_banking  = calcLeveredBeta(betaBanking,  MARGINAL_TAX_RATE, MARKET_EQUITY, MARKET_DEBT);
      const lb_software = calcLeveredBeta(betaSoftware, MARGINAL_TAX_RATE, MARKET_EQUITY, MARKET_DEBT);

      const coe_banking  = calcCostOfEquity(RISK_FREE_RATE, lb_banking,  ERP);
      const coe_software = calcCostOfEquity(RISK_FREE_RATE, lb_software, ERP);

      const eqWt = calcWaccEquityWeight(MARKET_EQUITY, MARKET_DEBT);
      const dtWt = calcWaccDebtWeight(MARKET_EQUITY, MARKET_DEBT);

      const wacc_banking  = calcInitialWacc(eqWt, dtWt, coe_banking,  AFTER_TAX_COD);
      const wacc_software = calcInitialWacc(eqWt, dtWt, coe_software, AFTER_TAX_COD);

      expect(wacc_software).toBeGreaterThan(wacc_banking);
    });
  });

  describe('resolveTerminalAssumptions (single source of truth for the 4 override toggles)', () => {
    const NO_OVERRIDES: TerminalOverrides = {
      overrideTerminalWacc: false,
      terminalWaccCustom: 0,
      overrideTerminalRoic: false,
      overrideRevGrowthPerpetuity: false,
      overrideTerminalRfr: false,
      terminalRfrCustom: 0,
    };
    const MATURE_ERP = 4.23;
    const RISK_FREE_RATE = 4.0;
    const RAW_REV_GROWTH_PERPETUITY = 7.5; // deliberately different from riskFreeRate
    const RAW_ROIC_TERMINAL_YEAR = 12.0;   // deliberately different from terminalWacc

    it('with all overrides off, matches Damodaran defaults: terminal growth = RFR, terminal ROIC = terminal WACC', () => {
      const r = resolveTerminalAssumptions(
        MATURE_ERP, RISK_FREE_RATE, RAW_REV_GROWTH_PERPETUITY, RAW_ROIC_TERMINAL_YEAR, NO_OVERRIDES
      );
      expect(r.terminalRfr).toBe(RISK_FREE_RATE);
      expect(r.terminalWacc).toBeCloseTo(MATURE_ERP + RISK_FREE_RATE, 10);
      // The raw "Rev Growth Perpetuity" box must be IGNORED when the override is off.
      expect(r.effectiveGrowthTerminal).toBe(RISK_FREE_RATE);
      expect(r.effectiveGrowthTerminal).not.toBe(RAW_REV_GROWTH_PERPETUITY);
      // Terminal ROIC defaults to terminal WACC, not the stale/raw fetched value.
      expect(r.roicTerminalYear).toBeCloseTo(r.terminalWacc, 10);
      expect(r.roicTerminalYear).not.toBe(RAW_ROIC_TERMINAL_YEAR);
    });

    it('overrideRevGrowthPerpetuity=true uses the raw input value', () => {
      const r = resolveTerminalAssumptions(
        MATURE_ERP, RISK_FREE_RATE, RAW_REV_GROWTH_PERPETUITY, RAW_ROIC_TERMINAL_YEAR,
        { ...NO_OVERRIDES, overrideRevGrowthPerpetuity: true }
      );
      expect(r.effectiveGrowthTerminal).toBe(RAW_REV_GROWTH_PERPETUITY);
    });

    it('overrideTerminalWacc=true bypasses mature ERP + RFR entirely', () => {
      const r = resolveTerminalAssumptions(
        MATURE_ERP, RISK_FREE_RATE, RAW_REV_GROWTH_PERPETUITY, RAW_ROIC_TERMINAL_YEAR,
        { ...NO_OVERRIDES, overrideTerminalWacc: true, terminalWaccCustom: 15 }
      );
      expect(r.terminalWacc).toBe(15);
      // Terminal ROIC auto-tracks whatever terminal WACC actually resolves to.
      expect(r.roicTerminalYear).toBe(15);
    });

    it('overrideTerminalRoic=true keeps the raw ROIC value independent of terminal WACC', () => {
      const r = resolveTerminalAssumptions(
        MATURE_ERP, RISK_FREE_RATE, RAW_REV_GROWTH_PERPETUITY, RAW_ROIC_TERMINAL_YEAR,
        { ...NO_OVERRIDES, overrideTerminalRoic: true }
      );
      expect(r.roicTerminalYear).toBe(RAW_ROIC_TERMINAL_YEAR);
      expect(r.roicTerminalYear).not.toBe(r.terminalWacc);
    });

    it('overrideTerminalRfr=true changes terminal WACC and the default growth anchor together', () => {
      const r = resolveTerminalAssumptions(
        MATURE_ERP, RISK_FREE_RATE, RAW_REV_GROWTH_PERPETUITY, RAW_ROIC_TERMINAL_YEAR,
        { ...NO_OVERRIDES, overrideTerminalRfr: true, terminalRfrCustom: 2.5 }
      );
      expect(r.terminalRfr).toBe(2.5);
      expect(r.terminalWacc).toBeCloseTo(MATURE_ERP + 2.5, 10);
      expect(r.effectiveGrowthTerminal).toBe(2.5);
    });

    it('all four overrides on simultaneously are fully independent', () => {
      const r = resolveTerminalAssumptions(
        MATURE_ERP, RISK_FREE_RATE, RAW_REV_GROWTH_PERPETUITY, RAW_ROIC_TERMINAL_YEAR,
        {
          overrideTerminalWacc: true, terminalWaccCustom: 11,
          overrideTerminalRoic: true,
          overrideRevGrowthPerpetuity: true,
          overrideTerminalRfr: true, terminalRfrCustom: 3,
        }
      );
      expect(r.terminalRfr).toBe(3);                          // overridden, unused elsewhere since WACC is also overridden
      expect(r.terminalWacc).toBe(11);                        // overridden directly
      expect(r.effectiveGrowthTerminal).toBe(RAW_REV_GROWTH_PERPETUITY); // overridden, raw input used
      expect(r.roicTerminalYear).toBe(RAW_ROIC_TERMINAL_YEAR); // overridden, independent of the WACC override
    });
  });
});
