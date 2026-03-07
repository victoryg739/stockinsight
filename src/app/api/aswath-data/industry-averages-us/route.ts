import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const industry = searchParams.get('industry') || '';

    if (!industry) {
        return NextResponse.json({ error: 'Industry parameter is required' }, { status: 400 });
    }

    try {
        const data = await prisma.xl_industry_averages_us.findUnique({
            where: { industry },
            select: {
                revenue_growth_rate_5y:      true,
                pretax_operating_margin:     true,
                pretax_operating_margin_adj: true,
                sales_to_capital:            true,
                cost_of_capital:             true,
                market_debt_to_capital:      true,
                aftertax_roc:                true,
                reinvestment_rate:           true,
            },
        });

        if (!data) {
            return NextResponse.json({ error: 'No data found for the provided industry' }, { status: 404 });
        }

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
