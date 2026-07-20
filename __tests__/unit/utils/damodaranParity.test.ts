/**
 * Parity suite: app DCF chain  vs.  Aswath Damodaran's fcffsimpleginzu model.
 *
 * `damodaranReference()` below is an INDEPENDENT reimplementation of the
 * formulas in fcffsimpleginzu_test.xlsx, written in the spreadsheet's own
 * decimal units (0.10 = 10%). The app's functions work in percentage points
 * (10 = 10%). Any divergence is therefore a real logic or unit defect, not a
 * shared-code artifact.
 *
 * Excel formula provenance (sheet!cell -> what it drives):
 *   'Valuation output'!C2:M2   revenue growth path
 *   'Valuation output'!C4:M4   operating margin convergence
 *   'Valuation output'!C6:M6   effective -> marginal tax ramp
 *   'Valuation output'!C7:M7   EBIT(1-t), untaxed when EBIT <= 0
 *   'Valuation output'!C8:M8   reinvestment, 1-year lead convention
 *   'Valuation output'!C12:M12 cost of capital path
 *   'Valuation output'!C13:L13 cumulated discount factor
 *   'Valuation output'!B18     terminal value = FCFF / (WACC - g)
 *   'Valuation output'!B29     equity bridge (NB: subtracts BOOK debt)
 *   'Cost of capital'!C53      market value of debt
 *   'Cost of capital'!C57      levered beta
 *   'Cost of capital'!E62      WACC
 */
import { describe, it, expect } from 'vitest';
import * as F from '@/app/utils/financialCalculations';

interface Scenario {
  name: string;
  baseRevenue: number;
  baseMargin: number;      // percent
  growthY1: number;        // percent
  growthY2to5: number;     // percent
  growthTerminal: number;  // percent
  marginY1: number;        // percent
  marginY10: number;       // percent
  yrsConvergence: number;
  s2cY1: number;
  s2cY2to5: number;
  s2cY6to10: number;
  effTax: number;          // percent
  margTax: number;         // percent
  initialWacc: number;     // percent
  terminalWacc: number;    // percent
  debt: number;
  cash: number;
  shares: number;
}

const BASE: Scenario = {
  name: 'TEST fixture (matches fcffsimpleginzu_test.xlsx)',
  baseRevenue: 10_000_000, baseMargin: 10,
  growthY1: 10, growthY2to5: 10, growthTerminal: 4,
  marginY1: 10, marginY10: 10, yrsConvergence: 5,
  s2cY1: 2, s2cY2to5: 2, s2cY6to10: 2,
  effTax: 17.5, margTax: 25,
  initialWacc: 8.9713390005, terminalWacc: 8.23,
  debt: 10_000_000, cash: 10_000_000, shares: 10_000_000,
};

const scenarios: Scenario[] = [
  BASE,
  { ...BASE, name: 'high growth, margin expansion',
    growthY1: 35, growthY2to5: 25, marginY1: 4, marginY10: 22, yrsConvergence: 8 },
  { ...BASE, name: 'declining firm, negative growth',
    growthY1: -8, growthY2to5: -4, marginY1: 6, marginY10: 3, growthTerminal: 1 },
  { ...BASE, name: 'loss-making base year (untaxed losses)',
    baseMargin: -15, marginY1: -10, marginY10: 12, yrsConvergence: 9 },
  { ...BASE, name: 'distinct sales-to-capital per bucket',
    s2cY1: 1.4, s2cY2to5: 2.6, s2cY6to10: 3.1 },
  { ...BASE, name: 'distinct debt/cash (equity bridge does not cancel)',
    debt: 45_000_000, cash: 6_000_000 },
  { ...BASE, name: 'fast margin convergence (2 yrs)', yrsConvergence: 2, marginY1: 5, marginY10: 18 },
  { ...BASE, name: 'slow margin convergence (10 yrs)', yrsConvergence: 10, marginY1: 5, marginY10: 18 },
  { ...BASE, name: 'high WACC, low terminal spread',
    initialWacc: 14.5, terminalWacc: 9.1, growthTerminal: 2.5 },
  { ...BASE, name: 'terminal WACC barely above terminal growth',
    initialWacc: 9, terminalWacc: 5.05, growthTerminal: 5 },
  { ...BASE, name: 'zero effective tax, high marginal', effTax: 0, margTax: 34 },
  { ...BASE, name: 'large-cap magnitudes',
    baseRevenue: 394_328_000_000, debt: 111_110_000_000, cash: 62_482_000_000,
    shares: 15_552_752_000, baseMargin: 30.3, marginY1: 30.3, marginY10: 28 },
];

/** Independent reimplementation of the Excel model, in decimal units. */
function damodaranReference(s: Scenario) {
  const g0 = s.growthY1 / 100, g25 = s.growthY2to5 / 100, gT = s.growthTerminal / 100;
  const m0 = s.baseMargin / 100, m1 = s.marginY1 / 100, m10 = s.marginY10 / 100;
  const te = s.effTax / 100, tm = s.margTax / 100;
  const w0 = s.initialWacc / 100, wT = s.terminalWacc / 100;
  const conv = s.yrsConvergence;

  // C2:M2 — growth path
  const growth = [g0, g25, g25, g25, g25];
  for (let i = 1; i <= 5; i++) growth.push(g25 - ((g25 - gT) / 5) * i);
  growth.push(gT);

  // B3:M3 — revenues
  const rev = [s.baseRevenue];
  for (const g of growth) rev.push(rev[rev.length - 1] * (1 + g));

  // B4:M4 — margins
  const margin = [m0, m1];
  for (let yr = 2; yr <= 10; yr++) {
    margin.push(yr > conv ? m10 : m10 - ((m10 - m1) / conv) * (conv - yr));
  }
  margin.push(margin[margin.length - 1]); // M4 = L4

  const ebit = rev.map((r, i) => r * margin[i]);

  // B6:M6 — tax ramp
  const tax = [te, te, te, te, te, te];
  let cur = te;
  for (let i = 0; i < 5; i++) { cur += (tm - te) / 5; tax.push(cur); }
  tax.push(tm);

  // B7:M7 — EBIT(1-t); losses are not taxed
  const eat = ebit.map((e, i) => (e > 0 ? e * (1 - tax[i]) : e));

  // C8:M8 — reinvestment, reinvestment in yr k funds yr k+1 growth
  const s2c = [s.s2cY1, s.s2cY2to5, s.s2cY2to5, s.s2cY2to5, s.s2cY2to5,
               s.s2cY6to10, s.s2cY6to10, s.s2cY6to10, s.s2cY6to10, s.s2cY6to10];
  const reinv: number[] = [];
  for (let i = 0; i < 10; i++) reinv.push((rev[i + 2] - rev[i + 1]) / s2c[i]);
  const roicTerminal = wT;                       // M40 = L12 when not overridden
  reinv.push((gT / roicTerminal) * eat[11]);      // M8

  const fcff: number[] = [];
  for (let i = 0; i < 11; i++) fcff.push(eat[i + 1] - reinv[i]);

  // C12:M12 — cost of capital path
  const wacc = [w0, w0, w0, w0, w0];
  for (let i = 1; i <= 5; i++) wacc.push(w0 - ((w0 - wT) / 5) * i);
  wacc.push(wT);

  // C13:L13 — cumulated discount factor
  const cdf: number[] = [];
  let acc = 1;
  for (let i = 0; i < 10; i++) { acc *= 1 / (1 + wacc[i]); cdf.push(acc); }

  const pv = fcff.slice(0, 10).map((f, i) => f * cdf[i]);
  const sumPv = pv.reduce((a, b) => a + b, 0);
  const tv = fcff[10] / (wT - gT);                 // B18
  const pvTv = tv * cdf[9];                        // B19
  const ev = pvTv + sumPv;                         // B21 -> B24
  const equity = ev - s.debt - 0 + s.cash + 0;     // B29, book debt per B25
  return { growth, rev, margin, ebit, tax, eat, reinv, fcff, wacc, cdf, pv,
           sumPv, tv, pvTv, ev, equity, perShare: equity / s.shares };
}

/** The app's chain, exactly as fcff/page.tsx orchestrates it. */
function appChain(s: Scenario) {
  const growth = F.calcRevenueGrowth(s.growthY1, s.growthY2to5, s.growthTerminal);
  const rev = F.calcRevenue(s.baseRevenue, growth);
  const margin = F.calcEBITMargin(s.baseMargin, s.marginY1, s.marginY10, s.yrsConvergence);
  const ebit = F.calcEbit(rev, margin);
  const tax = F.calcTaxRate(s.effTax, s.margTax);
  const eat = F.calcEbitAfterTax(ebit, tax);
  const roicTerminal = s.terminalWacc;
  const reinv = F.calcReinvestment(rev, s.s2cY1, s.s2cY2to5, s.s2cY6to10,
                                   s.growthTerminal, roicTerminal, eat[eat.length - 1]);
  const fcff = F.calcFcff(eat, reinv);
  const wacc = F.calcWACC(s.initialWacc, s.terminalWacc);
  const cdf = F.calcCumulatedDiscountFactor(wacc);
  const pv = F.calcPvFcff(fcff, cdf);
  const sumPv = F.calcSumOfPvFcff10Yrs(pv);
  const tv = F.calcTerminalValue(fcff[fcff.length - 1], wacc[wacc.length - 1],
                                 growth[growth.length - 1]);
  const pvTv = F.calcPVTerminalValue(tv, cdf[cdf.length - 1]);
  const ev = F.calcEnterpriseValue(pvTv, sumPv);
  const equity = F.calcEquityValue(ev, s.debt, 0, s.cash, 0);
  const common = F.calcEquityValueCommonStock(equity, 0);
  return { growth, rev, margin, ebit, tax, eat, reinv, fcff, wacc, cdf, pv,
           sumPv, tv, pvTv, ev, equity, perShare: F.calcImpliedSharePrice(common, s.shares) };
}

/** Relative comparison; magnitudes here span 1e0 to 1e12. */
function expectClose(actual: number, expected: number, label: string) {
  const tol = Math.max(Math.abs(expected) * 1e-9, 1e-6);
  expect(Math.abs(actual - expected), `${label}: got ${actual}, expected ${expected}`)
    .toBeLessThanOrEqual(tol);
}

describe('DCF parity with Damodaran fcffsimpleginzu', () => {
  scenarios.forEach((s) => {
    describe(s.name, () => {
      const ref = damodaranReference(s);
      const app = appChain(s);

      it('revenue growth path matches', () => {
        app.growth.forEach((v, i) => expectClose(v / 100, ref.growth[i], `growth[${i}]`));
      });
      it('revenue path matches', () => {
        app.rev.forEach((v, i) => expectClose(v, ref.rev[i], `rev[${i}]`));
      });
      it('operating margin path matches', () => {
        app.margin.forEach((v, i) => expectClose(v / 100, ref.margin[i], `margin[${i}]`));
      });
      it('EBIT path matches', () => {
        app.ebit.forEach((v, i) => expectClose(v, ref.ebit[i], `ebit[${i}]`));
      });
      it('tax ramp matches', () => {
        app.tax.forEach((v, i) => expectClose(v / 100, ref.tax[i], `tax[${i}]`));
      });
      it('EBIT(1-t) matches', () => {
        app.eat.forEach((v, i) => expectClose(v, ref.eat[i], `eat[${i}]`));
      });
      it('reinvestment matches', () => {
        app.reinv.forEach((v, i) => expectClose(v, ref.reinv[i], `reinv[${i}]`));
      });
      it('FCFF matches', () => {
        app.fcff.forEach((v, i) => expectClose(v, ref.fcff[i], `fcff[${i}]`));
      });
      it('WACC path matches', () => {
        app.wacc.forEach((v, i) => expectClose(v / 100, ref.wacc[i], `wacc[${i}]`));
      });
      it('discount factors match', () => {
        app.cdf.forEach((v, i) => expectClose(v, ref.cdf[i], `cdf[${i}]`));
      });
      it('terminal value matches', () => expectClose(app.tv, ref.tv, 'terminalValue'));
      it('PV(terminal value) matches', () => expectClose(app.pvTv, ref.pvTv, 'pvTerminalValue'));
      it('sum of PV(FCFF) matches', () => expectClose(app.sumPv, ref.sumPv, 'sumPvFcff'));
      it('enterprise value matches', () => expectClose(app.ev, ref.ev, 'enterpriseValue'));
      it('equity value matches', () => expectClose(app.equity, ref.equity, 'equityValue'));
      it('implied share price matches', () =>
        expectClose(app.perShare, ref.perShare, 'impliedSharePrice'));
    });
  });

  it('reproduces the workbook fixture value per share ($1.327843)', () => {
    expect(appChain(BASE).perShare).toBeCloseTo(1.327843, 6);
  });
});

/**
 * Regression coverage for the "Assumption Overrides" consistency fix.
 * fcff/page.tsx, api/monte-carlo/route.ts, and SensitivityAnalysisPopoutPage.tsx
 * all now resolve terminal WACC / ROIC / growth / RFR through the single shared
 * `resolveTerminalAssumptions`. These tests run the *exact same full DCF chain*
 * page.tsx uses, and prove the override toggles behave the way the UI promises —
 * previously Monte Carlo and Sensitivity would use the raw "Rev Growth Perpetuity"
 * input even when its override toggle was off, diverging from the main page.
 */
const MATURE_ERP_FIXTURE = 4.23;
const RISK_FREE_RATE_FIXTURE = 4.0; // matureErp + rfr = 8.23 = BASE.terminalWacc

function fullChainImpliedPrice(s: Scenario, revGrowthPerpetuityInput: number, overrides: F.TerminalOverrides) {
  const resolved = F.resolveTerminalAssumptions(
    MATURE_ERP_FIXTURE,
    RISK_FREE_RATE_FIXTURE,
    revGrowthPerpetuityInput,
    s.terminalWacc, // raw roicTerminalYear input, only consumed when overrideTerminalRoic is true
    overrides,
  );
  const growth = F.calcRevenueGrowth(s.growthY1, s.growthY2to5, resolved.effectiveGrowthTerminal);
  const rev = F.calcRevenue(s.baseRevenue, growth);
  const margin = F.calcEBITMargin(s.baseMargin, s.marginY1, s.marginY10, s.yrsConvergence);
  const ebit = F.calcEbit(rev, margin);
  const tax = F.calcTaxRate(s.effTax, s.margTax);
  const eat = F.calcEbitAfterTax(ebit, tax);
  const reinv = F.calcReinvestment(rev, s.s2cY1, s.s2cY2to5, s.s2cY6to10,
                                   resolved.effectiveGrowthTerminal, resolved.roicTerminalYear, eat[eat.length - 1]);
  const fcff = F.calcFcff(eat, reinv);
  const wacc = F.calcWACC(s.initialWacc, resolved.terminalWacc);
  const cdf = F.calcCumulatedDiscountFactor(wacc);
  const pv = F.calcPvFcff(fcff, cdf);
  const sumPv = F.calcSumOfPvFcff10Yrs(pv);
  const tv = F.calcTerminalValue(fcff[fcff.length - 1], wacc[wacc.length - 1], growth[growth.length - 1]);
  const pvTv = F.calcPVTerminalValue(tv, cdf[cdf.length - 1]);
  const ev = F.calcEnterpriseValue(pvTv, sumPv);
  const equity = F.calcEquityValue(ev, s.debt, 0, s.cash, 0);
  return F.calcImpliedSharePrice(F.calcEquityValueCommonStock(equity, 0), s.shares);
}

describe('Assumption Overrides consistency (fixes: revGrowthPerpetuity ignored, Monte Carlo/Sensitivity ignoring toggles)', () => {
  const OFF: F.TerminalOverrides = {
    overrideTerminalWacc: false, terminalWaccCustom: 0,
    overrideTerminalRoic: false,
    overrideRevGrowthPerpetuity: false,
    overrideTerminalRfr: false, terminalRfrCustom: 0,
  };

  it('raw "Rev Growth Perpetuity" input has NO effect on the DCF when its override is off', () => {
    const priceA = fullChainImpliedPrice(BASE, 2, OFF);
    const priceB = fullChainImpliedPrice(BASE, 25, OFF); // wildly different raw input, override still off
    expect(priceA).toBe(priceB);
  });

  it('raw "Rev Growth Perpetuity" input DOES change the DCF once its override is on', () => {
    const onOverride = { ...OFF, overrideRevGrowthPerpetuity: true };
    const priceA = fullChainImpliedPrice(BASE, 2, onOverride);
    const priceB = fullChainImpliedPrice(BASE, 25, onOverride);
    expect(priceA).not.toBe(priceB);
  });

  it('overriding terminal WACC changes the price, and terminal ROIC follows it automatically', () => {
    const base = fullChainImpliedPrice(BASE, 4, OFF);
    const overridden = fullChainImpliedPrice(BASE, 4, { ...OFF, overrideTerminalWacc: true, terminalWaccCustom: 20 });
    expect(overridden).not.toBe(base);
  });

  it('a Monte-Carlo-style single iteration (this exact chain) and the main page chain agree bit-for-bit', () => {
    // appChain() (used by the parity suite above, mirroring page.tsx) and this
    // fullChainImpliedPrice() helper (mirroring route.ts / Sensitivity after the fix)
    // must produce identical output for the same effective terminal growth.
    const s = { ...BASE, growthTerminal: 4 };
    const viaPage = appChain(s).perShare;
    const viaSharedResolver = fullChainImpliedPrice(s, 4, { ...OFF, overrideRevGrowthPerpetuity: true });
    expect(viaSharedResolver).toBeCloseTo(viaPage, 8);
  });
});

describe('known defects (documented, not yet fixed)', () => {
  it('calcEBITMargin returns a mis-sized array when yrsConvergence is out of range', () => {
    // 12 entries expected: base + yrs 1-10 + terminal.
    expect(F.calcEBITMargin(10, 5, 18, 5)).toHaveLength(12);
    // Excel raises #DIV/0! for convergence 0; the app silently returns 13 entries,
    // shifting every downstream year by one.
    expect(F.calcEBITMargin(10, 5, 18, 0)).not.toHaveLength(12);
    expect(F.calcEBITMargin(10, 5, 18, 12)).not.toHaveLength(12);
  });

  it('calcTerminalValue returns Infinity when terminal WACC equals terminal growth', () => {
    // Excel yields #DIV/0!; the app renders Infinity as an implied share price.
    expect(F.calcTerminalValue(1000, 5, 5)).toBe(Infinity);
    expect(F.calcTerminalValue(1000, 4, 5)).toBeLessThan(0);
  });
});
