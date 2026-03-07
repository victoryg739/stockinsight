export const INPUT_FIELDS = [
    {
        id: "revGrowthYr1",
        label: "Rev Growth Yr 1",
        question: `The key input is the growth rate for years 2-5, but the year 1 growth rate is separated for two reasons:
	1.	Some companies can forecast year 1 more accurately based on management guidance or existing contracts.
	2.	For pre-revenue companies, it provides a reasonable starting point for projections.`,
        value: 15,
        unit: "%"
    },
    {
        id: "revGrowthYr2to5",
        label: "Rev Growth (Yrs 2-5)",
        question: `a. Review your company’s recent revenue growth
        b. Compare your revenues to the overall market size and key sector players.
        Suggestion: Check year 10 revenues against the market for potential market share and compare with competitors.
        Note: This could be negative for a declining firm.`,
        value: 12,
        unit: "%"
    },
    {
        id: "revGrowthPerpetuity",
        label: "Rev Growth Perpetuity",
        question: "Will assume that the growth rate in perpetuity will be equal to the risk free rate. This allows for both valuation consistency and prevents impossible growth rates.",
        value: 0,
        unit: "%"
    },
    { id: "opMarginYr1", label: "Operating Margin Yr 1", question: "Same as revenue year 1", value: 10, unit: "%" },
    {
        id: "opMarginYr10", label: "Operating Margin In Yr 10", question: `This is the operating margin you expect over time:
        a. For mature companies, it can be close to or equal to current operating margin.
        b. For growth or loss-making companies, use the industry average or an estimate based on business characteristics.`,
        value: 10,
        unit: "%"
    },
    { id: "yrsConvergence", label: "Years of Convergence", question: "How many years to converge on operating margin in Year 10?", value: 5, unit: "Yrs" },
    {
        id: "salesToCapYr1",
        label: "Sales to Capital Yr 1",
        question: `This metric evaluates how effectively a company can convert $1 of capital into $1 of revenue.
         A higher sales-to-capital ratio indicates greater efficiency. 
         Sales to Capital Ratio = Sales/Invested Capital. Invested Capital = Total Debt + Total Equity - Cash and Cash Equivalents`,
        value: 0,
        unit: ""
    },
    {
        id: "salesToCapYr2to5", label: "Sales to Capital Yr 2 to 5", question: `This metric evaluates how effectively a company can convert $1 of capital into $1 of revenue.
        A higher sales-to-capital ratio indicates greater efficiency. 
        Sales to Capital Ratio = Sales/Invested Capital. Invested Capital = Total Debt + Total Equity - Cash and Cash Equivalents`,
        value: 0,
        unit: ""
    },
    {
        id: "salesToCapYr6to10", label: "Sales to Capital Yr 6 to 10", question: `This metric evaluates how effectively a company can convert $1 of capital into $1 of revenue.
        A higher sales-to-capital ratio indicates greater efficiency. 
        Sales to Capital Ratio = Sales/Invested Capital. Invested Capital = Total Debt + Total Equity - Cash and Cash Equivalents`,
        value: 0,
        unit: ""
    },
]

export const FETCHED_INPUT_FIELDS = [
    { id: "baseRevenue", label: "Base Revenue", question: "TTM Revenue", value: 0, unit: "$" },
    { id: "baseEbitMargin", label: "Base EBIT Margin", question: "TTM Ebit Margin", value: 0, unit: "%" },
    { id: "totalEquity", label: "Total Equity", question: "TTM Total Equity/Book Value of Equity", value: 0, unit: "$" },
    { id: "totalDebt", label: "Total Debt", question: "TTM Total Debt/Book Value of Debt", value: 0, unit: "$" },
    { id: "cash", label: "Cash and Short Term Investments", question: "TTM Cash and Short Term Investments", value: 0, unit: "$" },
    { id: "minorityInterest", label: "Minority Interest", question: "This is a uniquely accounting item and will be on the liability side of your company's balance sheet. It reflects the requirement that if you own more than 50% of another company or have effective control of it, you have to consolidate that company's statements with yours. Thus, you count 100% of that subsidiaries assets, revenues and operating income with your company, even if you own only 60%. The minority interest reflects the book value of the 40% of the equity in the subsidiary that does not belong to you. Again, it is best if you can convert the book value to a market value by applying the price to book ratio for the sector in which the subsidiary operates", value: 0, unit: "$" },
    {
        id: "interestExpense",
        label: "Interest Expense",
        question: `Interest expense relates to the cost of borrowing money.
         It is the price that a lender charges a borrower for the use of the lender's money.
          On the income statement, interest expense can represent the cost of borrowing money from banks, bond investors, and other sources.`,
        value: 0,
        unit: "$"
    },
    {
        id: "effectiveTaxRate",
        label: "Effective Tax Rate",
        question: `You can find the effective tax rate in your company's annual report. 
        If you cannot, you can compute it as follows, from the income statement: Effective tax rate = Taxes paid/ Taxable income , additionally if your effective tax rate varies across years, you can use an average.
        If the effective tax rate is less than zero, enter zero. 
        If you have a money losing company, don't enter zero but enter the tax rate that you will have when you start making money.
        Auto calculated using: Tax Provision / Pretax Income
`,
        value: 0,
        unit: "%"
    },
    {
        id: "marginalTaxRate",
        label: "Marginal Tax Rate",
        question: "This is a statutory tax rate. I use the tax rate of the country the company is domiciled in. ",
        value: 0,
        unit: "%"
    },
    { id: "initialWacc", label: "Initial WACC", question: "", value: 0, unit: "%" },
    {
        id: "roicTerminalYear", label: "ROIC Terminal Year",
        question: `
By default, we assume companies cannot maintain excess returns indefinitely, so:
• Terminal ROIC = Year 10 WACC (Cost of Capital)
• This reflects economic theory that competition erodes abnormal returns

For Companies with Moats:
If strong evidence of sustainable competitive advantage exists:
1. Set ROIC above WACC in terminal period
2. Compare to historical company performance
3. Reference industry average ROICs when calibrating
4. Consider the strength and durability of specific moat factors

Important Considerations:
• Most mature companies struggle to generate returns exceeding WACC long-term
• Significant exceptions exist among companies with proven, durable moats
• As moats narrow, ROIC should trend toward WACC
• Even the strongest moats typically see some ROIC deterioration over time
    
Evaluating Moat Strength:
• Strong: 10+ years of consistent ROIC > WACC by substantial margin
• Medium: 5-10 years of ROIC > WACC with some volatility
• Weak/None: Inconsistent ROIC or trending toward WACC`
        , value: 0, unit: "%"
    },

    { id: "equityRiskPremium", label: "Country Equity Risk Premium", question: "Equity risk premiums (ERP) represent the price of risk in the equity market", value: 0, unit: "%" },
    { id: "matureMarketErp", label: "Mature Market ERP", question: "The equity risk premium for a mature market, used to compute the terminal WACC", value: 0, unit: "%" },
    { id: "riskFreeRate", label: "Risk Free Rate", question: "The risk-free rate is the theoretical rate of return on an investment with zero risk. Set to 10 year treasury yield rate", value: 0, unit: "%" },
    { id: "impliedSharesOutstanding", label: "Shares Outstanding", question: "Shares outstanding are the stock that is held by a company's shareholders on the open market", value: 0, unit: "Shares" },
    { id: "currentSharePrice", label: "Current Share Price", question: "Current share price of the stock", value: 0, unit: "$" }

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