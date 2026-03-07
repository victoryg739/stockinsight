import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const industry = searchParams.get('industry') || ''; // Ensure industry is a string

    if (!industry) {
        return NextResponse.json({ error: 'Industry parameter is required' }, { status: 400 });
    }

    try {
        const data = await prisma.xl_industry_averages_us.findUnique({
            where: { industry: industry },
        });

        if (!data) {
            return NextResponse.json({ error: 'No data found for the provided industry' }, { status: 404 });
        }
        // Values stored as decimal fractions — multiply ×100 to return percentages.
        // parseFloat+toFixed avoids JS floating-point drift (e.g. 0.0423*100 = 4.2299...95)
        // expected_growth_ebit slot repurposed to show pretax_operating_margin.
        const pct = (v: number | null) => v != null ? parseFloat((v * 100).toFixed(4)) : null;
        return NextResponse.json({
            roc:                  pct(data.aftertax_roc),
            reinvestment_rate:    pct(data.reinvestment_rate),
            expected_growth_ebit: pct(data.pretax_operating_margin),
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
