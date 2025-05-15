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
        const url = `https://finnhub.io/api/v1/stock/peers?symbol=${symbol}&token=${apiKey}`;

        const response = await fetch(url, {
            next: { revalidate: 86400 } // Cache for 24 hours
        });

        if (!response.ok) {
            throw new Error(`Finnhub API error: ${response.statusText}`);
        }

        const data = await response.json();

        // Finnhub returns an array of peer symbols
        if (!data || !Array.isArray(data)) {
            return NextResponse.json({ error: 'Invalid data format from Finnhub' }, { status: 500 });
        }

        // Return the peers data
        return NextResponse.json({
            symbol: symbol,
            peers: data
        });
    } catch (error) {
        console.error('Finnhub Peers API error:', error);
        return NextResponse.json({
            error: 'Failed to fetch peers data'
        }, { status: 500 });
    }
}