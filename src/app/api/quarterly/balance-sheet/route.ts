import { NextRequest, NextResponse } from 'next/server';

export const fetchCache = 'auto'

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const symbol = searchParams.get('symbol');
    const url = `https://valuation-yfinance.vercel.app/quarterly_balance_sheet/${symbol}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)

        if (!data || Object.keys(data).length === 0) {
            return NextResponse.json({ error: 'No data found' }, { status: 404 });
        }

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}

// async function fetchYahooFinanceData(symbol: string) {
//     const url = `https://valuation-yfinance.vercel.app/quarterly_balance_sheet/${symbol}`;

//     try {
//         const response = await fetch(url);
//         const data = await response.json();

//         if (!data || Object.keys(data).length === 0) {
//             return null;
//         }

//         return data;
//     } catch (error) {
//         console.error("Yahoo Finance API error:", error);
//         return null;
//     }
// }

// async function fetchAlphaVantageData(symbol: string, apiKey: string) {
//     const url = `https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${symbol}&apikey=${apiKey}`;

//     const response = await fetch(url);
//     const data = await response.json();

//     if (data.Information) {
//         throw new Error('API rate limit exceeded');
//     }

//     if (!data || !data.quarterlyReports || data.quarterlyReports.length === 0) {
//         return null;
//     }
//     return data;

// }

// export async function GET(req: NextRequest) {
//     const searchParams = req.nextUrl.searchParams;
//     const symbol = searchParams.get('symbol');

//     if (!symbol) {
//         return NextResponse.json({ error: 'Symbol is required' }, { status: 400 });
//     }

//     try {
//         // First, try Yahoo Finance
//         let data = await fetchYahooFinanceData(symbol);
//         // If Yahoo Finance fails or returns no data, try Alpha Vantage
//         if (!data) {
//             const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
//             if (!apiKey) {
//                 throw new Error('Alpha Vantage API key is not configured');
//             }
//             data = await fetchAlphaVantageData(symbol, apiKey);
//         }

//         if (!data) {
//             return NextResponse.json({ error: 'No data found' }, { status: 404 });
//         }


//         return NextResponse.json(data);
//     } catch (error) {
//         console.error("API error:", error);
//         return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
//     }
