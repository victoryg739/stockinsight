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
        const mature_market_erp = parseFloat(data["mature_market_erp"]);
        handleInputChange("equityRiskPremium", equity_risk_premium, "fetchedInputs")
        handleInputChange("marginalTaxRate", marginal_tax_rate, "fetchedInputs")
        handleInputChange("matureMarketErp", mature_market_erp, "fetchedInputs")

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

        // Fetch quarterly balance sheet data to get MRQ
        const { data: quarterlyData } = await axios.get(`/api/quarterly/balance-sheet?symbol=${symbol}`);

        let mrqFormatted = "N/A";

        if (quarterlyData && quarterlyData.length > 0) {
            // Sort data by date in descending order to get the most recent quarter
            const sortedData = quarterlyData.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
            const latestQuarter = sortedData[0];

            if (latestQuarter && latestQuarter.date) {
                // Format the date from the quarterly balance sheet
                const mrqDateObject = new Date(latestQuarter.date);
                mrqFormatted = mrqDateObject.toLocaleDateString();
            }
        }

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

        return data;

    } catch (error) {
        console.error('Error fetching stock info:', error);
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
        const { data } = await axios.get(`/api/aswath-data/synthetic-rating/get-spread?rating=${encodeURIComponent(rating)}`);

        // Convert the data to a number
        const spreadValue = Number(data);

        // Check if the conversion resulted in a valid number
        if (isNaN(spreadValue)) {
            throw new Error('Invalid spread value received from the server');
        }

        // DB stores spread as a decimal fraction (e.g. 0.0059 = 0.59%) —
        // multiply by 100 so the value is in percentage points, consistent with riskFreeRate
        return (spreadValue * 100)
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

export const fetchIndustryAveragesUS = async (industry: string) => {
    try {
        const encodedIndustry = encodeParams(industry);
        const { data } = await axios.get(`/api/aswath-data/industry-averages-us?industry=${encodedIndustry}`);
        return data;
    } catch (error) {
        console.error('Error fetching US industry averages:', error);
        return null;
    }
};

export const fetchIndustryAveragesGlobal = async (industry: string) => {
    try {
        const encodedIndustry = encodeParams(industry);
        const { data } = await axios.get(`/api/aswath-data/industry-averages-global?industry=${encodedIndustry}`);
        return data;
    } catch (error) {
        console.error('Error fetching global industry averages:', error);
        return null;
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

//Financial Modelling Prep API
//deprecated - only limited to a few symbols
export const fetchFMPKeyMetrics = async (symbol: string): Promise<Array<{
    freeCashFlowYield: number;
    returnOnInvestedCapital: number;
    returnOnEquity: number;
    netDebtToEBITDA: number;
    symbol: string;
    date: string;
}>> => {
    try {
        const { data } = await axios.get(`/api/fmp/key-metrics?symbol=${symbol}`);

        // Map all years of data
        return data.map((metrics: any) => ({
            symbol: metrics.symbol,
            date: metrics.date,
            freeCashFlowYield: metrics.freeCashFlowYield || 0,
            returnOnInvestedCapital: metrics.roic || 0,
            returnOnEquity: metrics.roe || 0,
            netDebtToEBITDA: metrics.netDebtToEBITDA || 0,
        }));
    } catch (error) {
        console.error('Error fetching FMP key metrics:', error);
        throw error;
    }
};

export const fetchYahooHistoricalRev = async (symbol: string) => {
    try {
        const { data } = await axios.get(`/api/annual/income-statement?symbol=${symbol}`);

        // Yahoo data is already sorted by date descending, so we need to reverse it
        const revenue = data.map((item: any) => {
            const date = item.date;
            const [year, month] = date.split("-");
            const yearMonth = `${year}-${month}`;
            return {
                date: yearMonth,
                revenue: item.values["Total Revenue"] || 0
            };
        });

        // Return in ascending order (oldest to newest) like FMP did
        return revenue.reverse();
    } catch (error) {
        console.error('Error fetching Yahoo historical revenue:', error);
        throw error;
    }
};

export const fetchYahooHistoricalInvestedCap = async (symbol: string) => {
    try {
        const { data } = await axios.get(`/api/annual/balance-sheet?symbol=${symbol}`);

        const investedCapital = data.map((item: any) => {
            const values = item.values;
            const totalEquity = values["Stockholders Equity"] || values["Total Equity Gross Minority Interest"] || 0;
            const totalDebt = values["Total Debt"] || 0;
            const cash = values["Cash And Cash Equivalents"] || 0;

            const itemInvestedCap = totalEquity + totalDebt - cash;

            const date = item.date;
            const [year, month] = date.split("-");
            const yearMonth = `${year}-${month}`;

            return {
                date: yearMonth,
                investedCapital: itemInvestedCap
            };
        });

        // Return in ascending order (oldest to newest) like FMP did
        return investedCapital.reverse();
    } catch (error) {
        console.error('Error fetching Yahoo historical invested capital:', error);
        throw error;
    }
};

// Get comp analysis results using yfinance API
export const fetchCompAnalysis = async (symbol: string) => {
    try {
        if (symbol === "") {
            return;
        }

        // Fetch TTM income statement data
        const { data: ttmData } = await axios.get(`/api/ttm/income-statement?symbol=${symbol}`);

        // Get the first key (timestamp) from the data object
        const timestampKey = Object.keys(ttmData)[0];

        // Access the inner object using the timestamp key
        const incomeStatement = ttmData[timestampKey];

        // Calculate EBIT margin
        const ebitMargin = (incomeStatement["Operating Income"] / incomeStatement["Total Revenue"]) * 100;

        // Fetch stock info
        const { data: stockInfo } = await axios.get(`/api/stock-info?symbol=${symbol}`);

        // Fetch balance sheet data to calculate ROIC
        const { data: balanceSheetData } = await axios.get(`/api/quarterly/balance-sheet?symbol=${symbol}`);
        const latestQtr = extractLatestQuarterValues(balanceSheetData);

        let roic = 0;
        if (latestQtr) {
            // Calculate invested capital = Total Equity + Total Debt - Cash
            const totalEquity = latestQtr["Total Equity Gross Minority Interest"] || 0;
            const totalDebt = latestQtr["Total Debt"] || 0;
            const cash = latestQtr["Cash Cash Equivalents And Short Term Investments"] || 0;
            const investedCapital = totalEquity + totalDebt - cash;

            // Calculate EBIT After Tax using effective tax rate
            let effectiveTaxRate = 0;
            if (incomeStatement["Tax Provision"] && incomeStatement["Pretax Income"]) {
                effectiveTaxRate = (incomeStatement["Tax Provision"] / incomeStatement["Pretax Income"]) * 100;
                if (effectiveTaxRate < 0) effectiveTaxRate = 0;
            }

            const ebitAfterTax = incomeStatement["Operating Income"] * (1 - effectiveTaxRate / 100);

            // Calculate ROIC = (EBIT After Tax / Invested Capital) × 100
            if (investedCapital > 0) {
                roic = (ebitAfterTax / investedCapital) * 100;
            }
        }

        return {
            ticker: symbol,
            shortName: stockInfo.shortName || symbol,
            revenue: incomeStatement["Total Revenue"] || 0,
            ebit: incomeStatement["Operating Income"] || 0,
            ebitMargin: ebitMargin || 0,
            peRatio: stockInfo.trailingPE || 0,
            roic: roic
        };

    } catch (error) {
        console.error(`Error fetching comp analysis for ${symbol}:`, error);
        return {
            ticker: symbol,
            shortName: "",
            revenue: 0,
            ebit: 0,
            ebitMargin: 0,
            peRatio: 0,
            roic: 0
        };
    }
};

//annual data from yahoo finance

// Fetch annual income statement from Yahoo Finance
export const fetchYahooAnnualIncomeStatement = async (symbol: string) => {
    try {
        const { data } = await axios.get(`/api/annual/income-statement?symbol=${symbol}`);
        return data;
    } catch (error) {
        console.error('Error fetching Yahoo annual income statement:', error);
        throw error;
    }
};

// Fetch annual balance sheet from Yahoo Finance
export const fetchYahooAnnualBalanceSheet = async (symbol: string) => {
    try {
        const { data } = await axios.get(`/api/annual/balance-sheet?symbol=${symbol}`);
        return data;
    } catch (error) {
        console.error('Error fetching Yahoo annual balance sheet:', error);
        throw error;
    }
};

// Fetch peer companies from Finnhub
export const fetchFinnhubPeers = async (symbol: string): Promise<string[]> => {
    try {
        const { data } = await axios.get(`/api/finnhub/peers?symbol=${symbol}`);
        return data.peers || [];
    } catch (error) {
        console.error('Error fetching Finnhub peers:', error);
        return [];
    }
};

export const fetchSecFilings = async (symbol: string) => {
    const response = await fetch(`/api/finnhub/sec-filings?symbol=${symbol}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch SEC filings: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
};