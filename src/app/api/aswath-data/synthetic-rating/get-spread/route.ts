import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});
console.log("Prisma Client Initialized");

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const rating = searchParams.get('rating') || '';
    if (!rating) {
        return NextResponse.json({ error: 'Rating parameter is required' }, { status: 400 });
    }

    try {
        //doesnt matter which table you use small/large firm has same spread
        const data = await prisma.default_spread_large_firm.findUnique({
            where: { rating: rating },
        });

        if (!data || !data.spread) {
            return NextResponse.json({ error: 'No data/spread found for the provided rating' }, { status: 404 });
        }
        return NextResponse.json(data["spread"]);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}