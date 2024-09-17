import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const url = `https://valuation-yfinance.vercel.app/stock_info/^TNX`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (!data || Object.keys(data).length === 0) {
            return NextResponse.json({ error: 'No data found' }, { status: 404 });
        }

        // Extract previousClose from the data
        const previousClose = data.previousClose;

        if (previousClose === undefined) {
            return NextResponse.json({ error: 'Previous close data not found' }, { status: 404 });
        }

        // Return only the previousClose value
        return NextResponse.json({ previousClose });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}