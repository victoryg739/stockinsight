export const INPUT_FIELDS = [
    { id: "revGrowthYr1", label: "Rev Growth Yr 1", question: "Revenue Growth next year in %", value: 4.2 },
    {
        id: "revGrowthYr2to5",
        label: "Rev Growth (Yrs 2-5)",
        question: "Annual Compounded Revenue Growth in year 2 to 5 in %",
        value: 5,
    },
    {
        id: "revGrowthPerpetuity",
        label: "Rev Growth Perpetuity",
        question: "Annual Compounded Revenue Growth in year 2 to 5 in %",
        value: 4.36,
    },
    { id: "opMarginYr1", label: "Operating Margin Yr 1", question: "Operating Margin next year in %", value: 14 },
    { id: "opMarginYr10", label: "Operating Margin In Yr 10", question: "Operating Margin in year 10 in %", value: 15 },
    { id: "yrsConvergence", label: "Years of Convergence", question: "How many years to converge on operating margin in Year 10?", value: 5 },
    { id: "salesToCapYr1", label: "Sales to Capital Yr 1", question: "Sales to Capital in year 1", value: 1.49 },
    { id: "salesToCapYr2to5", label: "Sales to Capital Yr 2 to 5", question: "", value: 1.49 },
    { id: "salesToCapYr6to10", label: "Sales to Capital Yr 6 to 10", question: "", value: 1.49 },
    {
        id: "taxRateY1",
        label: "Tax Rate Year 1",
        question: "Enter your effective (not marginal) tax rate for your firm. You will find this in your company's annual report. If you cannot, you can compute it as follows, from the income statement: Effective tax rate = Taxes paid/ Taxable income If your effective tax rate varies across years, you can use an average. If the effective tax rate is less than zero, enter zero. If you have a money losing company, don't enter zero but enter the tax rate that you will have when you start making money.",
        value: 25
    },
    {
        id: "marginalTaxRate",
        label: "Marginal Tax Rate",
        question: "This is a statutory tax rate. I use the tax rate of the country the company is domiciled in. ",
        value: 25
    },
    { id: "industry", label: "Industry", question: "??", value: "" }

]

export const FETCHED_INPUT_FIELDS = [
    { id: "baseRevenue", label: "Base Revenue", question: "", value: 0 },
    { id: "baseEbitMargin", label: "Base EBIT Margin", question: "", value: 0 },
    { id: "debt", label: "Debt", question: "", value: 0 },
    { id: "cash", label: "Cash", question: "", value: 0 },
    { id: "minorityInterest", label: "Minority Interest", question: "", value: 0 },
    { id: "interestExpense", label: "Interest Expense", question: "", value: 0 },
    { id: "initialWacc", label: "Initial WACC", question: "", value: 0 },
    { id: "countryEquityRiskPremium", label: "Country Equity Risk Premium", question: "", value: 0 },
    { id: "riskFreeRate", label: "Risk Free Rate", question: "", value: 0 },
    { id: "sharesOutstanding", label: "Shares Outstanding", question: "", value: 0 },
    { id: "currentSharePrice", label: "Current Share Price", question: "", value: 0 }

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
    { id: "terminalCOC", label: "Terminal Cost of Capital", value: 0 },
    { id: "sumOfPVFcff10Yrs", label: "Sum of PV of FCFF (10 Years)", value: 0 },
    { id: "terminalValue", label: "Terminal Value", value: 0 },
    { id: "pvTerminalValue", label: "Present Value of Terminal Value", value: 0 },
    { id: "enterpriseValue", label: "Enterprise Value", value: 0 },
    { id: "equityValue", label: "Equity Value", value: 0 },
    { id: "equityValueCommonStock", label: "Equity Value (Common Stock)", value: 0 },
    { id: "impliedSharePrice", label: "Implied Share Price", value: 0 },
];