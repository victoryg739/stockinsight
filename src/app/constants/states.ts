const SALES_TO_CAP_QUESTION = `## Sales to Capital Ratio

Measures how effectively the company converts **$1 of capital** into **$1 of revenue**.

A **higher ratio** = greater capital efficiency.

**Formula:** \`Sales ÷ Invested Capital\`

where **Invested Capital** = Total Debt + Total Equity − Cash & Equivalents`;

export const INPUT_FIELDS = [
    {
        id: "revGrowthYr1",
        label: "Rev Growth Yr 1",
        question: `## Revenue Growth — Year 1

The key input is the growth rate for **Years 2–5**, but Year 1 is separated for two reasons:

1. Some companies can forecast Year 1 more accurately based on **management guidance** or existing contracts.
2. For **pre-revenue companies**, it provides a reasonable starting point for projections.`,
        value: 15,
        unit: "%"
    },
    {
        id: "revGrowthYr2to5",
        label: "Rev Growth (Yrs 2-5)",
        question: `## Revenue Growth — Years 2–5

- Review your company’s **recent revenue growth**
- Compare revenues to the **overall market size** and key sector players

**Suggestion:** Check Year 10 revenues against the market for potential market share and compare with competitors.

**Note:** This can be **negative** for a declining firm.`,
        value: 12,
        unit: "%"
    },
    {
        id: "revGrowthPerpetuity",
        label: "Rev Growth Perpetuity",
        question: `## Perpetuity Growth Rate

Assumes the **terminal growth rate = risk-free rate**.

This ensures valuation consistency and prevents impossible long-run growth assumptions.`,
        value: 0,
        unit: "%"
    },
    {
        id: "opMarginYr1",
        label: "Operating Margin Yr 1",
        question: `## Operating Margin — Year 1

Uses the same starting point as **Revenue Year 1** — the current trailing twelve month (TTM) operating margin.`,
        value: 10,
        unit: "%"
    },
    {
        id: "opMarginYr10",
        label: "Operating Margin In Yr 10",
        question: `## Target Operating Margin (Year 10)

The operating margin you expect the company to reach over time.

- **Mature companies:** can be close to or equal to current operating margin
- **Growth / loss-making companies:** use the **industry average** or an estimate based on business characteristics`,
        value: 10,
        unit: "%"
    },
    {
        id: "yrsConvergence",
        label: "Years of Convergence",
        question: `## Years of Convergence

How many years until the operating margin converges from **Year 1** to the **Year 10** target.

A lower number = faster convergence to the target margin.`,
        value: 5,
        unit: "Yrs"
    },
    {
        id: "salesToCapYr1",
        label: "Sales to Capital Yr 1",
        question: SALES_TO_CAP_QUESTION,
        value: 0,
        unit: ""
    },
    {
        id: "salesToCapYr2to5",
        label: "Sales to Capital Yr 2 to 5",
        question: SALES_TO_CAP_QUESTION,
        value: 0,
        unit: ""
    },
    {
        id: "salesToCapYr6to10",
        label: "Sales to Capital Yr 6 to 10",
        question: SALES_TO_CAP_QUESTION,
        value: 0,
        unit: ""
    },
]

export const FETCHED_INPUT_FIELDS = [
    { id: "baseRevenue", label: "Base Revenue", question: "**TTM Revenue** — the total revenue over the trailing twelve months.", value: 0, unit: "$" },
    { id: "baseEbitMargin", label: "Base EBIT Margin", question: "**TTM EBIT Margin** — operating income as a percentage of revenue over the trailing twelve months.", value: 0, unit: "%" },
    { id: "totalEquity", label: "Total Equity", question: "**TTM Total Equity** (Book Value of Equity) — the net assets attributable to shareholders.", value: 0, unit: "$" },
    { id: "totalDebt", label: "Total Debt", question: "**TTM Total Debt** (Book Value of Debt) — the sum of all short-term and long-term debt obligations.", value: 0, unit: "$" },
    { id: "cash", label: "Cash and Short Term Investments", question: "**TTM Cash & Short-Term Investments** — highly liquid assets including cash and investments maturing within 90 days.", value: 0, unit: "$" },
    {
        id: "minorityInterest",
        label: "Minority Interest",
        question: `## Minority Interest

A **balance sheet liability** item that arises when a parent company owns **more than 50%** (but not 100%) of a subsidiary.

When consolidating financial statements, the parent counts **100%** of the subsidiary's assets and revenues — even if it only owns 60%. The **minority interest** reflects the book value of the remaining **40%** not owned by the parent.

**Best practice:** Convert the book value to market value by applying the **price-to-book ratio** for the subsidiary's sector.`,
        value: 0,
        unit: "$"
    },
    {
        id: "interestExpense",
        label: "Interest Expense",
        question: `## Interest Expense

The **cost of borrowing money** — the price a lender charges for the use of funds.

On the income statement, this represents payments to **banks, bondholders, and other lenders**.`,
        value: 0,
        unit: "$"
    },
    {
        id: "effectiveTaxRate",
        label: "Effective Tax Rate",
        question: `## Effective Tax Rate

The actual tax rate paid, found in the company's **annual report**.

**Formula:** \`Effective Tax Rate = Taxes Paid ÷ Taxable Income\`

**Auto-calculated using:** \`Tax Provision ÷ Pretax Income\`

**Special cases:**
- If the rate varies across years, use an **average**
- If the rate is **negative**, enter zero
- For a **loss-making company**, enter the rate you expect when the company becomes profitable`,
        value: 0,
        unit: "%"
    },
    {
        id: "marginalTaxRate",
        label: "Marginal Tax Rate",
        question: `## Marginal Tax Rate

The **statutory (legal) tax rate** of the country where the company is domiciled.

This is used to compute the after-tax cost of debt in the WACC calculation.`,
        value: 0,
        unit: "%"
    },
    { id: "initialWacc", label: "Initial WACC", question: "", value: 0, unit: "%" },
    {
        id: "roicTerminalYear",
        label: "ROIC Terminal Year",
        question: `## Default Assumption

- **Terminal ROIC = Year 10 WACC** (Cost of Capital)
- Reflects economic theory: competition erodes excess returns over time

## For Companies with Moats

If strong evidence of sustainable competitive advantage exists:

1. Set ROIC **above WACC** in the terminal period
2. Compare to **historical company performance**
3. Reference **industry average ROICs** when calibrating
4. Consider the strength and durability of specific moat factors

## Important Considerations

- Most mature companies struggle to generate returns exceeding WACC long-term
- As moats narrow, **ROIC should trend toward WACC**

## Moat Strength Guide

- **Strong:** 10+ years of consistent ROIC > WACC by substantial margin
- **Medium:** 5–10 years of ROIC > WACC with some volatility
- **Weak/None:** Inconsistent ROIC or trending toward WACC`,
        value: 0,
        unit: "%"
    },

    { id: "equityRiskPremium", label: "Country Equity Risk Premium", question: "**Equity Risk Premium (ERP)** — represents the price of risk in the equity market. It is the additional return investors demand over the risk-free rate for investing in equities.", value: 0, unit: "%" },
    { id: "matureMarketErp", label: "Mature Market ERP", question: "The **equity risk premium for a mature market** (e.g. the US), used to compute the terminal WACC.", value: 0, unit: "%" },
    { id: "riskFreeRate", label: "Risk Free Rate", question: "The **risk-free rate** is the theoretical return on a zero-risk investment. Set to the **10-year treasury yield**.", value: 0, unit: "%" },
    { id: "impliedSharesOutstanding", label: "Shares Outstanding", question: "**Shares outstanding** — the total number of shares held by all shareholders, including institutional investors and insiders.", value: 0, unit: "Shares" },
    { id: "currentSharePrice", label: "Current Share Price", question: "The **current market price** of one share of the stock.", value: 0, unit: "$" }

]

export const VALUATION_MODEL = [
    { id: "growthRates", label: "Revenue Growth Rates", value: [] },
    { id: "revenue", label: "Revenue", value: [] },
    { id: "ebitMargin", label: "EBIT Margin", value: [] },
    { id: "ebit", label: "EBIT", value: [] },
    { id: "taxRate", label: "Tax Rate", value: [] },
    { id: "ebitAfterTax", label: "EBIT After Tax", value: [] },
    { id: "reinvestment", label: "Reinvestment", value: [] },
    { id: "fcff", label: "Free Cash Flow to Firm", value: [] },
    { id: "wacc", label: "Weighted Average Cost of Capital", value: [] },
    { id: "cumulatedDiscountFactor", label: "Cumulated Discount Factor", value: [] },
    { id: "pvFcff", label: "Present Value of FCFF", value: [] },
];
export const VALUATION_OUTPUT = [
    { id: "terminalWACC", label: "Terminal WACC", value: 0 },
    { id: "sumOfPVFcff10Yrs", label: "Sum of PV of FCFF (10 Years)", value: 0 },
    { id: "terminalValue", label: "Terminal Value", value: 0 },
    { id: "pvTerminalValue", label: "Present Value of Terminal Value", value: 0 },
    { id: "enterpriseValue", label: "Enterprise Value", value: 0 },
    { id: "equityValue", label: "Equity Value", value: 0 },
    { id: "equityValueCommonStock", label: "Equity Value (Common Stock)", value: 0 },
];

export const WACC_EQUITY = [
    { id: "equityRiskPremium", label: "Equity Risk Premium", value: 0 },
    { id: "unleveredBeta", label: "Unlevered Beta", value: 0 },
    { id: "leveredBeta", label: "Levered Beta", value: 0 },
    { id: "riskFreeRate", label: "Risk Free Rate", value: 0 },
    { id: "marginalTaxRate", label: "Marginal Tax Rate", value: 0 },
]

export const WACC_DEBT = [
    { id: "riskFreeRate", label: "Risk Free Rate", value: 0 },
    { id: "preTaxCostOfDebt", label: "Pre-Tax Cost of Debt", value: 0 },
    { id: "marginalTaxRate", label: "Marginal Tax Rate", value: 0 },
    { id: "totalDebt", label: "Total Debt", value: 0 },
    { id: "interestExpense", label: "Interest Expense", value: 0 },
]

// Input stat popout page
export const INPUT_STATS_REVENUE_GROWTH = [
    { id: "", label: "", value: "Revenue Growth", isHeader: true },
    { id: "revGrowthYr1", label: "Year 1", value: 0 },
    { id: "revGrowthYr2to5", label: "Year 2-5", value: 0 },
    { id: "industry", label: "", value: "Industry", isHeader: true },
    { id: "revenueGrowthFirstQuartile", label: "1st Quartile", value: 0 },
    { id: "revenueGrowthMedian", label: "Median", value: 0 },
    { id: "revenueGrowthThirdQuartile", label: "3rd Quartile", value: 0 }
];

export const INPUT_STATS_OPERATING_MARGIN = [
    { id: "", label: "", value: "Operating Margin", isHeader: true },
    { id: "opMarginYr1", label: "Year 1", value: 0 },
    { id: "opMarginYr10", label: "Year 10", value: 0 },
    { id: "industry", label: "", value: "Industry", isHeader: true },
    { id: "operatingMarginFirstQuartile", label: "1st Quartile", value: 0 },
    { id: "operatingMarginMedian", label: "Median", value: 0 },
    { id: "operatingMarginThirdQuartile", label: "3rd Quartile", value: 0 }
];

export const INPUT_STATS_SALES_TO_CAP = [
    { id: "", label: "", value: "Sales to Capital", isHeader: true },
    { id: "salesToCapYr1", label: "Year 1", value: 0 },
    { id: "salesToCapYr2to5", label: "Year 2-5", value: 0 },
    { id: "salesToCapYr6to10", label: "Year 6-10", value: 0 },
    { id: "industry", label: "", value: "Industry", isHeader: true },
    { id: "salesToCapitalFirstQuartile", label: "1st Quartile", value: 0 },
    { id: "salesToCapitalMedian", label: "Median", value: 0 },
    { id: "salesToCapitalThirdQuartile", label: "3rd Quartile", value: 0 }
];

export const INPUT_STATS_WACC = [
    { id: "", label: "", value: "Weighted Cost Of Capital", isHeader: true },
    { id: "initialWacc", label: "Initial WACC", value: 0 },
    { id: "industry", label: "", value: "Industry", isHeader: true },
    { id: "costOfCapitalFirstQuartile", label: "1st Quartile", value: 0 },
    { id: "costOfCapitalMedian", label: "Median", value: 0 },
    { id: "costOfCapitalThirdQuartile", label: "3rd Quartile", value: 0 }
];

export const INPUT_STATS_BETA = [
    { id: "betaFirstQuartile", label: "1st Quartile", value: 0 },
    { id: "betaMedian", label: "Median", value: 0 },
    { id: "betaThirdQuartile", label: "3rd Quartile", value: 0 }
];

export const INPUT_STATS_DEBT_TO_CAPITAL = [
    { id: "", label: "", value: "Debt to Capital", isHeader: true },
    { id: "debtToCapital", label: "Debt To Capital", value: 0 },
    { id: "industry", label: "", value: "Industry", isHeader: true },
    { id: "debtToCapitalFirstQuartile", label: "1st Quartile", value: 0 },
    { id: "debtToCapitalMedian", label: "Median", value: 0 },
    { id: "debtToCapitalThirdQuartile", label: "3rd Quartile", value: 0 }
];

export const ROIC_STATS = [
    { id: "", label: "", value: "Return on Invested Capital", isHeader: true },
    { id: "roic", label: "ROIC", value: 0 },
    { id: "reinvestmentRate", label: "Reinvestment Rate", value: 0 },
];
export const STOCK_INFO = [
    { id: "shortName", label: "Company Name", value: "", keyStats: false },
    { id: "country", label: "Country", value: "", keyStats: false },
    { id: "currency", label: "Currency", value: "", keyStats: false },

    { id: "longBusinessSummary", label: "Business Summary", value: "", keyStats: false },
    { id: "industry", label: "Industry", value: "", keyStats: true },
    { id: "sector", label: "Sector", value: "", keyStats: true },
    { id: "trailingPE", label: "Trailing PE", value: "", keyStats: true },
    { id: "forwardPE", label: "Forward PE", value: "", keyStats: true },

    { id: "trailingPegRatio", label: "Trailing PEG Ratio", value: "", keyStats: true },
    { id: "bookValue", label: "Book Value", value: "", keyStats: true },

    { id: "debtToEquity", label: "Debt/Equity Ratio", value: "", keyStats: true },
    { id: "fiftyTwoWeekLow", label: "52 Week Low", value: "", keyStats: true },
    { id: "lastFiscalYearEnd", label: "Last Fiscal Year", value: "", keyStats: true },
    { id: "mostRecentQuarter", label: "Most Recent Quarter", value: "", keyStats: true },
    { id: "nextFiscalYearEnd", label: "nextFiscalYear", value: "" },
]