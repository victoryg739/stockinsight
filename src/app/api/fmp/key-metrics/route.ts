import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const symbol = searchParams.get('symbol');

    if (!symbol) {
        return NextResponse.json({ error: 'Symbol parameter is required' }, { status: 400 });
    }
    console.log(symbol)

    const apiKey = process.env.FINANCIAL_MODELING_PREP_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    try {
        const url = `https://financialmodelingprep.com/api/v3/key-metrics/${symbol}?limit=5&apikey=${apiKey}`;
        const response = await fetch(url, {
            next: { revalidate: 86400 } // 24 hours
        });

        if (!response.ok) {
            throw new Error(`FMP API error: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data || data.length === 0) {
            return NextResponse.json({ error: 'No data found' }, { status: 404 });
        }

        // Return all data without filtering
        return NextResponse.json(data);
    } catch (error) {
        console.error('FMP Key Metrics API error:', error);
        return NextResponse.json({
            error: 'Failed to fetch key metrics data'
        }, { status: 500 });
    }
}