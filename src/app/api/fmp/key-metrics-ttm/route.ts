import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const symbol = searchParams.get('symbol');

    if (!symbol) {
        return NextResponse.json({ error: 'Symbol parameter is required' }, { status: 400 });
    }

    const apiKey = process.env.FINANCIAL_MODELING_PREP_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const url = `https://financialmodelingprep.com/api/v3/key-metrics-ttm/${symbol}?apikey=${apiKey}`;

    try {
        const response = await fetch(url, { cache: 'no-store' });
        
        if (!response.ok) {
            return NextResponse.json({
                error: `Failed to fetch data: ${response.statusText}`
            }, { status: response.status });
        }

        const data = await response.json();

        if (!data || (Array.isArray(data) && data.length === 0)) {
            return NextResponse.json({ error: 'No data found' }, { status: 404 });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Key metrics TTM API error:', error);
        return NextResponse.json({
            error: 'Failed to fetch key metrics data'
        }, { status: 500 });
    }
}