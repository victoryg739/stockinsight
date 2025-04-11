import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
    const url = `https://valuation-yfinance.vercel.app/stock_info/tnx`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (!data || Object.keys(data).length === 0) {
            return NextResponse.json({ error: 'No data found' }, { status: 404 });
        }


        const regularMarketPrice = data.regularMarketPrice;
        if (regularMarketPrice === undefined) {
            return NextResponse.json({ error: '10 Year Treasury Yield Regular Market Price data is not found' }, { status: 404 });
        }

        return NextResponse.json({ regularMarketPrice });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}