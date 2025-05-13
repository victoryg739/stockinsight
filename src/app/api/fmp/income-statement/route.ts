import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const symbol = searchParams.get('symbol');
    const period = searchParams.get('period') || 'annual'; // Default to annual
    const limit = searchParams.get('limit') || '5'; // Default to 5 years

    if (!symbol) {
        return NextResponse.json({ error: 'Symbol parameter is required' }, { status: 400 });
    }

    const apiKey = process.env.FINANCIAL_MODELING_PREP_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    try {
        const url = `https://financialmodelingprep.com/api/v3/income-statement/${symbol}?period=${period}&limit=${limit}&apikey=${apiKey}`;
        
        // Add Next.js fetch caching 
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

        return NextResponse.json(data);
    } catch (error) {
        console.error('FMP Income Statement API error:', error);
        return NextResponse.json({
            error: 'Failed to fetch income statement data'
        }, { status: 500 });
    }
}