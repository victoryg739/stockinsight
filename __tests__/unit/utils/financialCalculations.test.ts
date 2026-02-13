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
  calcImpliedSharePrice
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

      // Year 1: (1100 - 1000) / 2 = 50
      expect(result[0]).toBeCloseTo(50, 1);

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

      // Year 1: (900 - 1000) / 2 = -50 (disinvestment)
      expect(result[0]).toBeCloseTo(-50, 1);
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
});
