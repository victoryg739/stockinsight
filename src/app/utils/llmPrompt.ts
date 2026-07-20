import { convToMillion } from "./helper";

interface Field {
    id: string;
    label?: string;
    value: string | number;
}

export interface ValuationPromptParams {
    symbol: string;
    stockInfo: Field[];
    fetchedInputs: Field[];
    inputs: Field[];
    countryOptions: string;
    industryOptions: string;
}

const findValue = (fields: Field[], id: string): string | number => {
    const field = fields.find((f) => f.id === id);
    return field ? field.value : "";
};

const findNumber = (fields: Field[], id: string): number => {
    const v = findValue(fields, id);
    const n = typeof v === "string" ? parseFloat(v) : v;
    return isNaN(n) ? 0 : n;
};

const fmtMillion = (n: number, currency: string): string =>
    n ? `${convToMillion(n)} million ${currency}` : "not available";

const fmtPct = (n: number): string => (n || n === 0 ? `${Number(n.toFixed(2))}%` : "not available");

/**
 * Builds a self-contained prompt the user can paste into any LLM to get
 * suggested values for the 7 driver inputs of the FCFF DCF model.
 * The requested JSON keys match the app's input ids exactly so the answer
 * maps 1:1 onto the input fields.
 */
export function buildValuationPrompt(params: ValuationPromptParams): string {
    const { symbol, stockInfo, fetchedInputs, inputs, countryOptions, industryOptions } = params;

    const shortName = findValue(stockInfo, "shortName") || symbol;
    const sector = findValue(stockInfo, "sector") || "not available";
    const industry = findValue(stockInfo, "industry") || "not available";
    const country = findValue(stockInfo, "country") || countryOptions;
    const currency = String(findValue(stockInfo, "currency") || "USD");
    const summaryRaw = String(findValue(stockInfo, "longBusinessSummary") || "");
    const summary = summaryRaw.length > 600 ? `${summaryRaw.slice(0, 600)}…` : summaryRaw;

    const baseRevenue = findNumber(fetchedInputs, "baseRevenue");
    const baseEbitMargin = findNumber(fetchedInputs, "baseEbitMargin");
    const effectiveTaxRate = findNumber(fetchedInputs, "effectiveTaxRate");
    const marginalTaxRate = findNumber(fetchedInputs, "marginalTaxRate");
    const totalDebt = findNumber(fetchedInputs, "totalDebt");
    const totalEquity = findNumber(fetchedInputs, "totalEquity");
    const cash = findNumber(fetchedInputs, "cash");
    const interestExpense = findNumber(fetchedInputs, "interestExpense");
    const currentSharePrice = findNumber(fetchedInputs, "currentSharePrice");
    const sharesOutstanding = findNumber(fetchedInputs, "impliedSharesOutstanding");
    const riskFreeRate = findNumber(fetchedInputs, "riskFreeRate");

    const investedCapital = totalEquity + totalDebt - cash;
    const baseSalesToCap = investedCapital > 0 ? Number((baseRevenue / investedCapital).toFixed(2)) : 0;

    const yrsConvergence = findNumber(inputs, "yrsConvergence") || 5;

    return `You are an equity research analyst helping me build a 10-year FCFF DCF valuation for this company in the style of Aswath Damodaran (his "fcffsimpleginzu" model). Damodaran's method starts with a **story** about the business — how it wins, how big the market it can capture is, how profitable it becomes, and how much capital that growth consumes — and only then converts that story into numbers. Do the same here.

## Company
- Name: ${shortName} (ticker: ${symbol})
- Sector / Industry: ${sector} / ${industry}
- Damodaran industry group used for this valuation: ${industryOptions}
- Country of incorporation: ${country}
- Reporting currency: ${currency}
${summary ? `- Business summary: ${summary}\n` : ""}
## Base-year financials (trailing 12 months)
- Revenue: ${fmtMillion(baseRevenue, currency)}
- Operating (EBIT) margin: ${fmtPct(baseEbitMargin)}
- Effective tax rate: ${fmtPct(effectiveTaxRate)} (marginal tax rate: ${fmtPct(marginalTaxRate)})
- Total debt: ${fmtMillion(totalDebt, currency)}
- Book equity: ${fmtMillion(totalEquity, currency)}
- Cash & short-term investments: ${fmtMillion(cash, currency)}
- Interest expense: ${fmtMillion(interestExpense, currency)}
- Invested capital (equity + debt − cash): ${fmtMillion(investedCapital, currency)}
- Base-year sales-to-capital ratio: ${baseSalesToCap || "not available"}
- Share price: ${currentSharePrice ? `${currentSharePrice} ${currency}` : "not available"}, shares outstanding: ${sharesOutstanding ? sharesOutstanding.toLocaleString("en-US") : "not available"}
- Risk-free rate (10-yr treasury): ${fmtPct(riskFreeRate)}

## How the model uses each input
- **Rev Growth Yr 1 (%)**: revenue growth applied in year 1 only (use management guidance / near-term momentum).
- **Rev Growth Yrs 2-5 (%)**: constant annual growth for years 2-5; in years 6-10 growth declines linearly to the risk-free rate, which is also the perpetuity growth rate.
- **Operating Margin Yr 1 (%)**: pre-tax operating margin in year 1.
- **Operating Margin In Yr 10 (%)**: the target margin the company converges to linearly over ${yrsConvergence} years, then holds through year 10 and the terminal year.
- **Sales to Capital Yr 1 / Yrs 2-5 / Yrs 6-10 (ratio)**: reinvestment efficiency; each year's reinvestment = revenue increase ÷ sales-to-capital. Higher ratio = less capital consumed per dollar of new revenue. Compare with the company's base-year ratio and Damodaran's industry averages.

## Your task
Write three scenarios for this company: **Bear**, **Base** (your single highest-probability, most-likely case), and **Bull**. For each scenario, give:

1. **The story** (3-5 sentences) — what has to be true about the market, competitive position, execution, and margin trajectory for this outcome. Ground it in the business description and base-year numbers above. Think in Damodaran's terms: does the company hold or lose market share, does its moat (if any) survive competition, does operating leverage improve margins or get competed away, and can growth be funded efficiently or does it require heavy new capital?
2. **A probability** for the scenario — the three should sum to 100%, with Base carrying the most weight since it's the most likely outcome.
3. **Values for the 7 drivers** that follow directly from that story: Rev Growth Yr 1, Rev Growth Yrs 2-5, Operating Margin Yr 1, Operating Margin In Yr 10, Sales to Capital Yr 1, Sales to Capital Yrs 2-5, Sales to Capital Yrs 6-10.

Flag any input where you have low confidence.

Then end your answer with a single JSON code block using EXACTLY this structure and these keys, with plain numbers only (percentages as numbers, e.g. 12.5 means 12.5%, probability as a number out of 100):

\`\`\`json
{
  "bear": { "probability": 0, "revGrowthYr1": 0, "revGrowthYr2to5": 0, "opMarginYr1": 0, "opMarginYr10": 0, "salesToCapYr1": 0, "salesToCapYr2to5": 0, "salesToCapYr6to10": 0 },
  "base": { "probability": 0, "revGrowthYr1": 0, "revGrowthYr2to5": 0, "opMarginYr1": 0, "opMarginYr10": 0, "salesToCapYr1": 0, "salesToCapYr2to5": 0, "salesToCapYr6to10": 0 },
  "bull": { "probability": 0, "revGrowthYr1": 0, "revGrowthYr2to5": 0, "opMarginYr1": 0, "opMarginYr10": 0, "salesToCapYr1": 0, "salesToCapYr2to5": 0, "salesToCapYr6to10": 0 }
}
\`\`\``;
}
