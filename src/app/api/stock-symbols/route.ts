// app/api/stock-symbols/route.ts
import { NextResponse } from 'next/server';

// Define a global variable for caching (outside of Next.js cache system)
let symbolsCache: any[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export async function GET() {
    // Check if we have a valid cache
    const now = Date.now();
    if (symbolsCache && now - cacheTimestamp < CACHE_DURATION) {
        return NextResponse.json({ symbols: symbolsCache });
    }

    try {
        const apiKey = process.env.FINNHUB_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
        }

        // Fetch US stock symbols
        const response = await fetch(`https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${apiKey}`, {
            // Disable Next.js cache for this request
            cache: 'no-store'
        });

        const data = await response.json();

        if (!data || !Array.isArray(data)) {
            return NextResponse.json({ error: 'Invalid data format' }, { status: 500 });
        }

        // Filter to only include Common Stock and ADR to reduce size
        // This also helps reduce the size of the cached data
        symbolsCache = data.filter(item =>
            item.type === "Common Stock" || item.type === "ADR"
        );
        cacheTimestamp = now;

        return NextResponse.json({ symbols: symbolsCache }, {
            // Disable Next.js response cache
            headers: {
                'Cache-Control': 'no-store'
            }
        });
    } catch (error) {
        console.error('Error fetching stock symbols:', error);
        return NextResponse.json({ error: 'Failed to fetch stock symbols' }, { status: 500 });
    }
}