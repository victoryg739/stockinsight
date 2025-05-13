//Free tier limited to major stocks only
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const symbol = searchParams.get('symbol');
    const period = searchParams.get('period') || 'annual'; // Default to 'annual' if not provided
    const page = searchParams.get('page') || '0'; // Default to first page
    const limit = searchParams.get('limit') || '5'; // Default to 5 if not provided

    if (!symbol) {
        return NextResponse.json({ error: 'Symbol parameter is required' }, { status: 400 });
    }

    const apiKey = process.env.FINANCIAL_MODELING_PREP_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    try {
        // Changed from stable to v3
        const url = `https://financialmodelingprep.com/v3/analyst-estimates?symbol=${symbol}&period=${period}&page=${page}&limit=${limit}&apikey=${apiKey}`;

        const response = await fetch(url, {
            next: { revalidate: 86400 } // 24 hours
        });

        if (!response.ok) {
            throw new Error(`FMP API error: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data || data.length === 0) {
            return NextResponse.json({ error: 'No analyst estimates found for this symbol' }, { status: 404 });
        }

        // Return all data without filtering
        return NextResponse.json(data);
    } catch (error) {
        console.error('FMP Analyst Estimates API error:', error);
        return NextResponse.json({
            error: 'Failed to fetch analyst estimates data'
        }, { status: 500 });
    }
}