import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});
console.log("Prisma Client Initialized");

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const country = searchParams.get('country') || ''; // Ensure industry is a string

    if (!country) {
        return NextResponse.json({ error: 'Country parameter is required' }, { status: 400 });
    }

    try {
        const betaUsData = await prisma.country_risk_premium.findUnique({
            where: { country: country },
        });

        if (!betaUsData) {
            return NextResponse.json({ error: 'No data found for the provided country' }, { status: 404 });
        }
        return NextResponse.json(betaUsData);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}