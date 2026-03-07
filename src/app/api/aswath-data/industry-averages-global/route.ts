import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const industry = searchParams.get('industry') || '';

    if (!industry) {
        return NextResponse.json({ error: 'Industry parameter is required' }, { status: 400 });
    }

    try {
        // Use raw SQL to bypass Prisma model-cache issues when the model was added
        // after the PrismaClient singleton was first initialized.
        const rows = await prisma.$queryRaw<{
            revenue_growth_rate_5y: number | null;
            pretax_operating_margin: number | null;
            pretax_operating_margin_adj: number | null;
            sales_to_capital: number | null;
            cost_of_capital: number | null;
            market_debt_to_capital: number | null;
            aftertax_roc: number | null;
            reinvestment_rate: number | null;
        }[]>`
            SELECT
                revenue_growth_rate_5y,
                pretax_operating_margin,
                pretax_operating_margin_adj,
                sales_to_capital,
                cost_of_capital,
                market_debt_to_capital,
                aftertax_roc,
                reinvestment_rate
            FROM xl_industry_averages_global
            WHERE industry = ${industry}
            LIMIT 1
        `;

        if (!rows || rows.length === 0) {
            return NextResponse.json({ error: 'No data found for the provided industry' }, { status: 404 });
        }

        return NextResponse.json(rows[0]);
    } catch (error) {
        console.error('Error fetching global industry averages:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
