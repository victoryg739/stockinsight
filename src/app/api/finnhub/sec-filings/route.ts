import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const symbol = searchParams.get('symbol');

    if (!symbol) {
        return NextResponse.json({ error: 'Symbol parameter is required' }, { status: 400 });
    }

    const apiKey = process.env.FINNHUB_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    try {
        const url = `https://finnhub.io/api/v1/stock/filings?symbol=${symbol}&token=${apiKey}`;

        const response = await fetch(url, {
            next: { revalidate: 86400 } // Cache for 24 hours
        });

        if (!response.ok) {
            throw new Error(`Finnhub API error: ${response.statusText}`);
        }

        const data = await response.json();

        // Return the filings data
        return NextResponse.json(data);
    } catch (error) {
        console.error('Finnhub SEC Filings API error:', error);
        return NextResponse.json({
            error: 'Failed to fetch SEC filings data'
        }, { status: 500 });
    }
}