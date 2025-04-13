import { NextRequest, NextResponse } from 'next/server';
export const fetchCache = 'auto';

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;

    // Extract parameters from query string
    const sourceCurrency = searchParams.get('source');
    const targetCurrency = searchParams.get('target');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Validate parameters
    if (!sourceCurrency || !targetCurrency) {
        return NextResponse.json({
            error: 'Source and target currencies are required'
        }, { status: 400 });
    }

    // Build the URL dynamically
    const url = `https://valuation-yfinance.vercel.app/currency_conversion/${sourceCurrency}/${targetCurrency}/${startDate}/${endDate}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            return NextResponse.json({
                error: `Failed to fetch data: ${response.statusText}`
            }, { status: response.status });
        }

        const data = await response.json();

        if (!data || Object.keys(data).length === 0) {
            return NextResponse.json({ error: 'No data found' }, { status: 404 });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Currency conversion API error:', error);
        return NextResponse.json({
            error: 'Failed to fetch currency conversion data'
        }, { status: 500 });
    }
}