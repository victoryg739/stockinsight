import axios from 'axios';
import * as FetchInputHelper from "./fetchedInputsHelper";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

//handle risk free rate
export const fetchRiskFreeRate = async (
    handleFetchedInputChange: (id: any, value: any) => void
) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/api/risk-free-rate`);
        console.log(data);
        handleFetchedInputChange("riskFreeRate", data.previousClose);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

//handle revenue,ebit margin, interest expense from income statement
export const fetchIncomeStatement = async (symbol: string,
    handleFetchedInputChange: (id: any, value: any) => void
) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/api/quarterly/income-statement?symbol=${symbol}`);

        const incomeStatement = sumAllTTM(data);

        const baseEbitMargin = (incomeStatement["EBIT"] / incomeStatement["Total Revenue"]) * 100;

        console.log(incomeStatement["Minority Interest"])

        handleFetchedInputChange("baseRevenue", incomeStatement["Total Revenue"]);
        handleFetchedInputChange("baseEbitMargin", baseEbitMargin);
        handleFetchedInputChange("minorityInterest", incomeStatement["Minority Interest"]);
        handleFetchedInputChange("interestExpense", incomeStatement["Interest Expense"]);

    } catch (error) {
        console.error('Error fetching balance sheet quarterly:', error);
        throw error;
    }
};

//handle cash and debt from balance sheet
export const fetchBalanceSheetQuarterly = async (
    symbol: string,
    handleFetchedInputChange: (id: any, value: any) => void
) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/api/quarterly/balance-sheet?symbol=${symbol}`);
        const balanceSheet = sumAllTTM(data);

        handleFetchedInputChange("cash", balanceSheet["Cash And Cash Equivalents"]);
        handleFetchedInputChange("debt", balanceSheet["Total Debt"]);
    } catch (error) {
        console.error('Error fetching balance sheet quarterly:', error);
        throw error;
    }
};


//handle cash and debt from balance sheet
export const fetchStockInfo = async (
    symbol: string,
    handleFetchedInputChange: (id: any, value: any) => void
) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/api/stock-info?symbol=${symbol}`);
        const askPrice = data["ask"];
        const sharesOutstanding = data["sharesOutstanding"];

        handleFetchedInputChange("currentSharePrice", askPrice);
        handleFetchedInputChange("sharesOutstanding", sharesOutstanding);

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