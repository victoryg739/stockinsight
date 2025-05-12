import axios from 'axios';
import { convRound2Dp, extractLatestQuarterValues } from './helper';
import { encodeParams } from '../utils/helper'; // Make sure this import exists

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

//handle risk free rate and revenue growth perpetuity
export const fetchRiskFreeRate = async (
    handleInputChange: (id: string, newValue: any, type: "inputs" | "fetchedInputs") => void
) => {
    try {
        const { data } = await axios.get(`/api/risk-free-rate`);
        handleInputChange("riskFreeRate", data.regularMarketPrice, "fetchedInputs");
        handleInputChange("revGrowthPerpetuity", data.regularMarketPrice, "inputs");
    } catch (error) {
        console.error(error);
        throw error;
    }
};

//handle equity risk premium and marginal tax rate by country
export const fetchEquityRiskPremium = async (
    country: string,
    handleInputChange: (id: string, newValue: any, type: "inputs" | "fetchedInputs") => void
) => {
    try {
        const { data } = await axios.get(`/api/aswath-data/country-risk-premium?country=${country}`);
        const equity_risk_premium = parseFloat(data["equity_risk_premium"]);
        const marginal_tax_rate = parseFloat(data["corporate_tax_rate"]);
        handleInputChange("equityRiskPremium", equity_risk_premium, "fetchedInputs")
        handleInputChange("marginalTaxRate", marginal_tax_rate, "fetchedInputs")

    } catch (error) {
        console.error('Error fetching equity risk premium:', error);
        throw error;
    }
};


//handle revenue,ebit margin, interest expense from income statement
//Take note that our definition of EBIT and Operating Income is the same thing 
//However yahoo finance EBIT is calculated differently from Operating Income 
//We use yahoo finance Operating Income but call it EBIT for simplicity/shorten form
//Operating Income  = Revenue - COGS/COR - Operating Expenses 
export const fetchIncomeStatement = async (symbol: string,
    handleInputChange: (id: string, newValue: any, type: "inputs" | "fetchedInputs") => void
) => {
    try {
        const { data } = await axios.get(`/api/ttm/income-statement?symbol=${symbol}`);

        // Get the first key (timestamp) from the data object
        const timestampKey = Object.keys(data)[0];

        // Access the inner object using the timestamp key
        const incomeStatement = data[timestampKey];

        const baseEbitMargin = (incomeStatement["Operating Income"] / incomeStatement["Total Revenue"]) * 100;
        let effectiveTaxRate = (incomeStatement["Tax Provision"] / incomeStatement["Pretax Income"]) * 100
        if (effectiveTaxRate < 0) {
            effectiveTaxRate = 0;
        }
        handleInputChange("baseRevenue", incomeStatement["Total Revenue"], "fetchedInputs");
        handleInputChange("baseEbitMargin", baseEbitMargin, "fetchedInputs");
        handleInputChange("minorityInterest", incomeStatement["Minority Interest"], "fetchedInputs");
        handleInputChange("interestExpense", incomeStatement["Interest Expense"], "fetchedInputs");
        handleInputChange("effectiveTaxRate", effectiveTaxRate, "fetchedInputs");

        return true
    } catch (error) {
        console.error('Error fetching balance sheet quarterly:', error);
        throw error;
    }
};

//handle cash and debt from balance sheet
export const fetchBalanceSheetQuarterly = async (
    symbol: string,
    handleInputChange: (id: string, newValue: any, type: "inputs" | "fetchedInputs") => void
) => {
    try {
        const { data } = await axios.get(`/api/quarterly/balance-sheet?symbol=${symbol}`);
        const latestQtr = extractLatestQuarterValues(data);
        if (latestQtr === null) {
            throw ("cannot get latest quarter of balance sheet")
        }

        handleInputChange("cash", latestQtr["Cash Cash Equivalents And Short Term Investments"], "fetchedInputs");
        handleInputChange("totalEquity", latestQtr["Total Equity Gross Minority Interest"], "fetchedInputs");
        handleInputChange("totalDebt", latestQtr["Total Debt"], "fetchedInputs");
    } catch (error) {
        console.error('Error fetching balance sheet quarterly:', error);
        throw error;
    }
};


//handle cash and debt from balance sheet
export const fetchStockInfo = async (
    symbol: string,
    handleInputChange: (id: string, newValue: any, type: "inputs" | "fetchedInputs" | "stockInfo") => void
) => {
    try {
        const { data } = await axios.get(`/api/stock-info?symbol=${symbol}`);
        const currentPrice = data["currentPrice"];
        const impliedSharesOutstanding = data["impliedSharesOutstanding"];


        const mrqDateObject = new Date(data["mostRecentQuarter"] * 1000);
        const mrqFormatted = mrqDateObject.toLocaleDateString();

        const lfyDateObject = new Date(data["lastFiscalYearEnd"] * 1000);
        const lfyFormatted = lfyDateObject.toLocaleDateString();


        handleInputChange("currentSharePrice", currentPrice, "fetchedInputs");
        handleInputChange("impliedSharesOutstanding", impliedSharesOutstanding, "fetchedInputs");
        handleInputChange("shortName", data["shortName"], "stockInfo");
        handleInputChange("country", data["country"], "stockInfo");
        handleInputChange("currency", data["financialCurrency"], "stockInfo");
        handleInputChange("industry", data["industry"], "stockInfo");
        handleInputChange("sector", data["sector"], "stockInfo");
        handleInputChange("trailingPE", convRound2Dp(data["trailingPE"]), "stockInfo");
        handleInputChange("forwardPE", convRound2Dp(data["forwardPE"]), "stockInfo");
        handleInputChange("trailingPegRatio", convRound2Dp(data["trailingPegRatio"]), "stockInfo");
        handleInputChange("bookValue", convRound2Dp(data["bookValue"]), "stockInfo");
        handleInputChange("debtToEquity", convRound2Dp(data["debtToEquity"]), "stockInfo");
        handleInputChange("fiftyTwoWeekLow", "$" + convRound2Dp(data["fiftyTwoWeekLow"]), "stockInfo");
        handleInputChange("lastFiscalYearEnd", lfyFormatted, "stockInfo");
        handleInputChange("mostRecentQuarter", mrqFormatted, "stockInfo");
        handleInputChange("nextFiscalYearEnd", data["nextFiscalYearEnd"], "stockInfo");
        handleInputChange("longBusinessSummary", data["longBusinessSummary"], "stockInfo");


        return data

    } catch (error) {
        console.error('Error fetching balance sheet quarterly:', error);
        throw error;
    }
};


const sumAllTTM = (data: []) => {
    const result = data.slice(0, 4).reduce((accumulator: any, current: any) => {
        const values = current["values"]
        for (let key in values) {
            if (accumulator[key]) {
                accumulator[key] += values[key];
            } else {
                accumulator[key] = values[key];
            }
        }
        return accumulator;
    }, {} as any);
    return result
}

//WACC SECTION

//handle unlevered beta
export const fetchBeta = async (
    industry: string,
) => {
    try {
        const { data } = await axios.get(`/api/aswath-data/beta-us?industry=${industry}`);
        const unlevered_beta = parseFloat(data["avg_unlevered_beta"]);
        return unlevered_beta
    } catch (error) {
        console.error('Error fetching beta:', error);
        throw error;
    }
};

// //handle effective tax rate by industry
// export const fetchEffectiveTaxRate = async (
//     industry: string,
//     handleInputChange: (id: string, newValue: any, type: "waccEquity" | "waccDebt") => void
// ) => {
//     try {
//         const { data } = await axios.get(`/api/aswath-data/effective-tax-rate?industry=${industry}`);
//         const effective_tax_rate = parseFloat(data["effectivetr_avg_across_all_comp"]);
//         return effective_tax_rate
//     } catch (error) {
//         console.error('Error fetching effective tax rate:', error);
//         throw error;
//     }
// };


//handle synthetic rating spread
export const fetchSyntheticRatingSpread = async (
    rating: string) => {
    try {
        const { data } = await axios.get(`/api/aswath-data/synthetic-rating/get-spread?rating=${rating}`);

        // Convert the data to a number
        const spreadValue = Number(data);

        // Check if the conversion resulted in a valid number
        if (isNaN(spreadValue)) {
            throw new Error('Invalid spread value received from the server');
        }

        return (spreadValue)
    } catch (error) {
        console.error('Error fetching equity risk premium:', error);
        throw error;
    }
};


//handle input stats 
export const fetchInputStats = async (
    industry: string,
) => {
    try {
        const encodedIndustry = encodeParams(industry);
        const { data } = await axios.get(`/api/aswath-data/input-stats?industry=${encodedIndustry}`);
        return data

    } catch (error) {
        console.error('Error fetching inputs stats from aswath data:', error);
        throw error;
    }
};

//handle aswath data roic
export const fetchRoic = async (
    industry: string,
) => {
    try {
        const encodedIndustry = encodeParams(industry);
        const { data } = await axios.get(`/api/aswath-data/roic?industry=${encodedIndustry}`);
        return data

    } catch (error) {
        console.error('Error fetching roic from aswath data:', error);
        throw error;
    }
};

//save valuation
export const postValuation = async (
    data: any,
) => {
    try {
        await axios.post(`/api/valuation`, data)
        return true
    } catch (error) {
        console.error('Error saving valuation:', error);
        throw error;
    }
};


//delete valuation by id
export const deleteValuationById = async (
    ids: [],
) => {
    for (const id of ids) {  // Correctly iterating over the array
        try {
            await axios.delete(`/api/valuation/${id}`)
        } catch (error) {
            console.error('Error deleting valuation:', error);
            throw error;
        }
    }
};

//get all saved valuation
export const fetchValuations = async (
    symbol: string,
) => {
    try {
        if (symbol === "") {
            const { data } = await axios.get(`/api/valuation`);
            return data

        } else {
            const { data } = await axios.get(`/api/valuation?symbol=${symbol}`);
            return data

        }

    } catch (error) {
        console.error('Error fetching saved valuations:', error);
        throw error;
    }
};


//get valuation by id
export const fetchValuationById = async (
    id: string,
) => {
    try {
        const { data } = await axios.get(`/api/valuation/${id}`);
        return data

    } catch (error) {
        console.error('Error fetching saved valuation by id:', error);
        throw error;
    }
};



//get market price
export const fetchMarketPrice = async (
    symbol: string,
) => {
    try {
        const { data } = await axios.get(`/api/stock-info?symbol=${symbol}`);
        const currentPrice = data["currentPrice"];

        return currentPrice;

    } catch (error) {
        console.error('Error fetching current market price:', error);
        throw error;
    }
};


//discountedcashflows api

//get historical revenue
export const fetchDCFHistoricalRev = async (
    symbol: string,
) => {
    try {
        const { data } = await axios.get(`/api/discounting-cash-flows/income-statement?symbol=${symbol}`);
        const revenue = data.report.slice(0, 10).map((item: any) => {
            const [year, month] = item.date.split("-");
            const yearMonth = `${year}-${month}`;
            return { date: yearMonth, revenue: item.revenue }
        });
        return revenue

    } catch (error) {
        console.error('Error fetching DCF income statement:', error);
        throw error;
    }
};

//get investedCapital
export const fetchDCFHistoricalInvestedCap = async (
    symbol: string,
) => {
    try {
        const { data } = await axios.get(`/api/discounting-cash-flows/balance-sheet?symbol=${symbol}`);
        const investedCapital = data.report.slice(0, 10).map((item: any) => {
            const itemInvestedCap = item.totalEquity + item.totalDebt - item.cashAndCashEquivalents


            const [year, month] = item.date.split("-");
            const yearMonth = `${year}-${month}`;

            return { date: yearMonth, investedCapital: itemInvestedCap }
        });
        return investedCapital

    } catch (error) {
        console.error('Error fetching balance sheet quarterly:', error);
        throw error;
    }
};


//get compAnalysis results
export const fetchCompAnalysis = async (symbol: string) => {
    try {
        if (symbol === "") {
            return
        }

        const balanceSheet = await axios.get(`/api/discounting-cash-flows/balance-sheet?symbol=${symbol}`);
        if (!balanceSheet.data.report || balanceSheet.data.report.length === 0) {
            throw new Error("No balance sheet data available");
        }
        const balanceSheetCurYear = balanceSheet.data.report[0];

        const incomeStatement = await axios.get(`/api/discounting-cash-flows/income-statement?symbol=${symbol}`);
        if (!incomeStatement.data.report || incomeStatement.data.report.length === 0) {
            throw new Error("No income statement data available");
        }
        const incomeStatementCurYear = incomeStatement.data.report[0];

        let salesToCap = "N/A";
        if (incomeStatementCurYear.date === balanceSheetCurYear.date) {
            const investedCapital = balanceSheetCurYear.totalEquity + balanceSheetCurYear.totalDebt - balanceSheetCurYear.cashAndCashEquivalents;
            const revenue = incomeStatementCurYear.revenue;
            salesToCap = String(convRound2Dp(revenue / investedCapital));
        }

        const { data } = await axios.get(`/api/ttm/income-statement?symbol=${symbol}`);

        // Get the first key (timestamp) from the data object
        const timestampKey = Object.keys(data)[0];

        // Access the inner object using the timestamp key
        const incomeStatementYahooTTM = data[timestampKey];

        const ebitMarginTTM = (incomeStatementYahooTTM["Operating Income"] / incomeStatementYahooTTM["Total Revenue"]) * 100;

        const stockInfo = await axios.get(`/api/stock-info?symbol=${symbol}`);
        if (!stockInfo.data) {
            throw new Error("No stock info data available");
        }

        return {
            shortName: stockInfo.data.shortName,
            revenue: incomeStatementYahooTTM["Total Revenue"],
            ebit: incomeStatementYahooTTM["Operating Income"],
            ebitMargin: ebitMarginTTM,
            peRatio: stockInfo.data["trailingPE"],
            salesToCapital: salesToCap
        };

    } catch (error) {
        return {
            ticker: symbol,
            shortName: "",
            revenue: 0,
            ebit: 0,
            ebitMargin: 0,
            peRatio: 0,
            salesToCapital: "N/A"
        };
    }
};