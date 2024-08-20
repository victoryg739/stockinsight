import { NextRequest, NextResponse } from 'next/server';
export const fetchCache = 'auto'


export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const symbol = searchParams.get('symbol');
    const url = `https://valuation-yfinance.vercel.app/quarterly_balance_sheet/${symbol}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data || Object.keys(data).length === 0) {
            return NextResponse.json({ error: 'No data found' }, { status: 404 });
        }
        const dates = Object.keys(data).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
        // Get the latest date
        const latestDate = dates[0];

        // Get the Total Debt from the latest date
        const latestTotalDebt = data[latestDate]["Total Debt"];

        return NextResponse.json({ [latestDate]: latestTotalDebt });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
