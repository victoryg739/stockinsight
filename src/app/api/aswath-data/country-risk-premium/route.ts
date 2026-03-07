import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const country = searchParams.get('country') || ''; // Ensure industry is a string

    if (!country) {
        return NextResponse.json({ error: 'Country parameter is required' }, { status: 400 });
    }

    try {
        const data = await prisma.xl_country_equity_risk_premium.findUnique({
            where: { country: country },
        });

        if (!data) {
            return NextResponse.json({ error: 'No data found for the provided country' }, { status: 404 });
        }
        // Values stored as decimal fractions — multiply ×100 to return percentages.
        // parseFloat+toFixed avoids JS floating-point drift (e.g. 0.0423*100 = 4.2299...95)
        const pct = (v: number | null) => v != null ? parseFloat((v * 100).toFixed(4)) : null;
        return NextResponse.json({
            ...data,
            equity_risk_premium:  pct(data.equity_risk_premium),
            country_risk_premium: pct(data.country_risk_premium),
            adj_default_spread:   pct(data.adj_default_spread),
            corporate_tax_rate:   pct(data.corporate_tax_rate),
            mature_market_erp:    pct(data.mature_market_erp),
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
