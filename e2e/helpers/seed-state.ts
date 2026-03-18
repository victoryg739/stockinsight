import { Page } from '@playwright/test';

/**
 * sessionStorage key format used by useValuationStateStorage.ts:
 *   "fcff_state_" + symbol.toUpperCase()
 */
const STORAGE_KEY_PREFIX = 'fcff_state_';

/**
 * Apple (AAPL) approximate 2024 financials — hardcoded so tests are deterministic.
 *
 * Revenue: $391B  |  EBIT margin: ~31.5%  |  Price: $185  |  Shares: 15.4B
 * Expected WACC: ~9–10%  |  Expected implied price: meaningful positive value
 *
 * The `inputs` and `fetchedInputs` arrays mirror the shape of INPUT_FIELDS /
 * FETCHED_INPUT_FIELDS from src/app/constants/states.ts so the page renders
 * correctly (InputBox needs id, label, question, value, unit).
 */
export const AAPL_STATE = {
  symbol: 'AAPL',

  inputs: [
    { id: 'revGrowthYr1',        label: 'Rev Growth Yr 1',           question: '', value: 6,   unit: '%' },
    { id: 'revGrowthYr2to5',     label: 'Rev Growth (Yrs 2-5)',      question: '', value: 8,   unit: '%' },
    { id: 'revGrowthPerpetuity', label: 'Rev Growth Perpetuity',     question: '', value: 3,   unit: '%' },
    { id: 'opMarginYr1',         label: 'Operating Margin Yr 1',     question: '', value: 32,  unit: '%' },
    { id: 'opMarginYr10',        label: 'Operating Margin In Yr 10', question: '', value: 35,  unit: '%' },
    { id: 'yrsConvergence',      label: 'Years of Convergence',      question: '', value: 10,  unit: 'Yrs' },
    { id: 'salesToCapYr1',       label: 'Sales to Capital Yr 1',     question: '', value: 4,   unit: '' },
    { id: 'salesToCapYr2to5',    label: 'Sales to Capital Yr 2 to 5', question: '', value: 5,  unit: '' },
    { id: 'salesToCapYr6to10',   label: 'Sales to Capital Yr 6 to 10', question: '', value: 6, unit: '' },
  ],

  fetchedInputs: [
    { id: 'baseRevenue',             label: 'Base Revenue',                 question: '', value: 391_035_000_000,  unit: '$' },
    { id: 'baseEbitMargin',          label: 'Base EBIT Margin',             question: '', value: 31.5,              unit: '%' },
    { id: 'totalEquity',             label: 'Total Equity',                 question: '', value: 56_950_000_000,   unit: '$' },
    { id: 'totalDebt',               label: 'Total Debt',                   question: '', value: 108_040_000_000,  unit: '$' },
    { id: 'cash',                    label: 'Cash',                         question: '', value: 67_150_000_000,   unit: '$' },
    { id: 'minorityInterest',        label: 'Minority Interest',            question: '', value: 0,                unit: '$' },
    { id: 'interestExpense',         label: 'Interest Expense',             question: '', value: 3_930_000_000,    unit: '$' },
    { id: 'effectiveTaxRate',        label: 'Effective Tax Rate',           question: '', value: 14.7,            unit: '%' },
    { id: 'marginalTaxRate',         label: 'Marginal Tax Rate',            question: '', value: 26,              unit: '%' },
    { id: 'initialWacc',             label: 'Initial WACC',                 question: '', value: 0,              unit: '%' },
    { id: 'roicTerminalYear',        label: 'ROIC Terminal Year',           question: '', value: 9,               unit: '%' },
    { id: 'equityRiskPremium',       label: 'Country Equity Risk Premium',  question: '', value: 4.6,             unit: '%' },
    { id: 'matureMarketErp',         label: 'Mature Market ERP',            question: '', value: 4.6,             unit: '%' },
    { id: 'riskFreeRate',            label: 'Risk Free Rate',               question: '', value: 4.2,             unit: '%' },
    { id: 'impliedSharesOutstanding', label: 'Shares Outstanding',          question: '', value: 15_408_095_000,  unit: 'Shares' },
    { id: 'currentSharePrice',       label: 'Current Share Price',          question: '', value: 185,             unit: '$' },
  ],

  stockInfo: [
    { id: 'shortName', label: 'Company Name', value: 'Apple Inc.', keyStats: false },
    { id: 'country',   label: 'Country',      value: 'United States', keyStats: false },
    { id: 'currency',  label: 'Currency',      value: 'USD', keyStats: false },
    { id: 'longBusinessSummary', label: 'Business Summary', value: '', keyStats: false },
    { id: 'industry',  label: 'Industry',     value: 'Consumer Electronics', keyStats: true },
    { id: 'sector',    label: 'Sector',       value: 'Technology', keyStats: true },
    { id: 'trailingPE', label: 'Trailing PE', value: 29, keyStats: true },
    { id: 'forwardPE',  label: 'Forward PE',  value: 26, keyStats: true },
    { id: 'trailingPegRatio', label: 'Trailing PEG', value: 2.8, keyStats: true },
    { id: 'bookValue',  label: 'Book Value',  value: 3.77, keyStats: true },
    { id: 'debtToEquity', label: 'Debt/Equity', value: 181, keyStats: true },
    { id: 'fiftyTwoWeekLow', label: '52 Week Low', value: 164, keyStats: true },
    { id: 'lastFiscalYearEnd', label: 'Last Fiscal Year', value: '2024-09-28', keyStats: true },
    { id: 'mostRecentQuarter', label: 'Most Recent Quarter', value: '2024-12-28', keyStats: true },
    { id: 'nextFiscalYearEnd', label: 'nextFiscalYear', value: '' },
  ],

  countryOptions: 'United States',
  industryOptions: 'Software (Entertainment)',

  salesToCapManuallyEdited: {
    salesToCapYr1: true,    // pre-set — do not auto-overwrite
    salesToCapYr2to5: true,
    salesToCapYr6to10: true,
  },
  roicTerminalYearManuallyEdited: false,
  initialWaccManuallyEdited: false,   // allow DetailedWacc to compute and set WACC

  overrideTerminalWacc: false,
  overrideTerminalRoic: false,
  overrideRevGrowthPerpetuity: false,
  overrideTerminalRfr: false,
  terminalWaccCustom: 0,
  terminalRfrCustom: 0,
};

/**
 * Seeds sessionStorage with the given state before the FCFF page loads.
 * Must be called before page.goto().
 *
 * The page reads sessionStorage using:
 *   loadValuationState(urlSymbol)  →  key: "fcff_state_" + symbol.toUpperCase()
 *
 * So navigate to /fcff?symbol=AAPL for this state to be picked up.
 */
export async function seedFcffState(page: Page, state = AAPL_STATE) {
  const key = STORAGE_KEY_PREFIX + state.symbol.toUpperCase();
  await page.addInitScript(
    ({ k, s }) => { window.sessionStorage.setItem(k, JSON.stringify(s)); },
    { k: key, s: state }
  );
}
