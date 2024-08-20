import { NextRequest, NextResponse } from 'next/server';
export const fetchCache = 'auto'


export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const symbol = searchParams.get('symbol');
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
    const url = `https://valuation-yfinance.vercel.app/quarterly_income_statement/${symbol}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data || Object.keys(data).length === 0) {
            return NextResponse.json({ error: 'No data found' }, { status: 404 });
        }

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
