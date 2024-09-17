import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const dcfKey = process.env.DISCOUNTING_CASH_FLOWS_KEY

    const searchParams = req.nextUrl.searchParams;
    const symbol = searchParams.get('symbol');

    const url = `https://discountingcashflows.com/api/balance-sheet-statement/?ticker=${symbol}&period=annual&key=${dcfKey}`
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
