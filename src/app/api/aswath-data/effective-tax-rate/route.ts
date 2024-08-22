import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});
console.log("Prisma Client Initialized");

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const industry = searchParams.get('industry') || ''; // Ensure industry is a string

    if (!industry) {
        return NextResponse.json({ error: 'Industry parameter is required' }, { status: 400 });
    }

    try {
        const effective_tax_rate = await prisma.effective_tax_rate.findUnique({
            where: { industry: industry },
        });

        if (!effective_tax_rate) {
            return NextResponse.json({ error: 'No data found for the provided industry' }, { status: 404 });
        }
        return NextResponse.json(effective_tax_rate);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}