import { describe, it, expect } from 'vitest';
import { buildValuationPrompt } from '@/app/utils/llmPrompt';

const stockInfo = [
  { id: 'shortName', value: 'Test Company Inc.' },
  { id: 'sector', value: 'Technology' },
  { id: 'industry', value: 'Advertising' },
  { id: 'country', value: 'United States' },
  { id: 'currency', value: 'USD' },
  { id: 'longBusinessSummary', value: 'A test company that sells testing.' },
];

const fetchedInputs = [
  { id: 'baseRevenue', value: 10_000_000 },
  { id: 'baseEbitMargin', value: 10 },
  { id: 'effectiveTaxRate', value: 17.5 },
  { id: 'marginalTaxRate', value: 25 },
  { id: 'totalDebt', value: 10_000_000 },
  { id: 'totalEquity', value: 10_000_000 },
  { id: 'cash', value: 10_000_000 },
  { id: 'interestExpense', value: 10_000_000 },
  { id: 'currentSharePrice', value: 100 },
  { id: 'impliedSharesOutstanding', value: 10_000_000 },
  { id: 'riskFreeRate', value: 4.54 },
];

const inputs = [
  { id: 'revGrowthYr1', value: 10 },
  { id: 'revGrowthYr2to5', value: 12 },
  { id: 'opMarginYr1', value: 10 },
  { id: 'opMarginYr10', value: 15 },
  { id: 'salesToCapYr1', value: 2 },
  { id: 'salesToCapYr2to5', value: 2.5 },
  { id: 'salesToCapYr6to10', value: 3 },
  { id: 'yrsConvergence', value: 5 },
];

const params = {
  symbol: 'TEST',
  stockInfo,
  fetchedInputs,
  inputs,
  countryOptions: 'United States',
  industryOptions: 'Advertising',
};

describe('buildValuationPrompt', () => {
  const prompt = buildValuationPrompt(params);

  it('mentions the company identity and Damodaran framing', () => {
    expect(prompt).toContain('Test Company Inc.');
    expect(prompt).toContain('TEST');
    expect(prompt).toContain('Damodaran');
    expect(prompt).toContain('fcffsimpleginzu');
  });

  it('includes all 7 requested input names', () => {
    expect(prompt).toContain('Rev Growth Yr 1');
    expect(prompt).toContain('Rev Growth Yrs 2-5');
    expect(prompt).toContain('Operating Margin Yr 1');
    expect(prompt).toContain('Operating Margin In Yr 10');
    expect(prompt).toContain('Sales to Capital Yr 1');
    expect(prompt).toContain('Sales to Capital Yrs 2-5');
    expect(prompt).toContain('Sales to Capital Yrs 6-10');
  });

  it('includes base-year financial context', () => {
    expect(prompt).toContain('10 million USD');       // revenue in millions
    expect(prompt).toContain('17.5%');                // effective tax
    expect(prompt).toContain('4.54%');                // risk-free rate
    expect(prompt).toContain('Base-year sales-to-capital ratio: 1'); // 10M / (10M+10M-10M)
  });

  it('does NOT leak the app default input values into the prompt', () => {
    // These are the page's hardcoded defaults for a fresh ticker (states.ts),
    // not analysis — asking for them back would just parrot placeholders.
    expect(prompt).not.toContain('Current values in my model');
    expect(prompt).not.toContain('Rev Growth Yrs 2-5: 12%');
    expect(prompt).not.toContain('Operating Margin In Yr 10: 15%');
    expect(prompt).not.toContain('Sales to Capital Yrs 6-10: 3');
  });

  it('asks for bear/base/bull scenarios, each with a story and a probability', () => {
    expect(prompt).toContain('Bear');
    expect(prompt).toContain('Base');
    expect(prompt).toContain('Bull');
    expect(prompt).toContain('highest-probability');
    expect(prompt).toContain('story');
    expect(prompt).toContain('probability');
    expect(prompt).toContain('sum to 100%');
  });

  it('requests a JSON block with bear/base/bull objects, each containing probability + the 7 driver keys', () => {
    for (const scenario of ['bear', 'base', 'bull']) {
      expect(prompt).toContain(`"${scenario}"`);
    }
    expect(prompt).toContain('```json');
    // Each of the 7 driver keys + "probability" should appear 3 times (once per scenario).
    for (const key of [
      'probability', 'revGrowthYr1', 'revGrowthYr2to5', 'opMarginYr1', 'opMarginYr10',
      'salesToCapYr1', 'salesToCapYr2to5', 'salesToCapYr6to10',
    ]) {
      const occurrences = prompt.split(`"${key}"`).length - 1;
      expect(occurrences, `expected "${key}" to appear 3 times (once per scenario)`).toBe(3);
    }
  });

  it('degrades gracefully when data is missing (blank ticker state)', () => {
    const empty = buildValuationPrompt({
      symbol: 'ABC',
      stockInfo: [],
      fetchedInputs: [],
      inputs: [],
      countryOptions: 'United States',
      industryOptions: 'Advertising',
    });
    expect(empty).toContain('ABC');
    expect(empty).toContain('not available');
    expect(empty).not.toContain('NaN');
    expect(empty).not.toContain('undefined');
  });
});
