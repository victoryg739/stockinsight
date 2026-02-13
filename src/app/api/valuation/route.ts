// pages/api/saveValuation.js

import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});
console.log("Prisma Client Initialized");

export async function POST(req: NextRequest) {
    const session = await getServerSession();

    if (!session || !session.user?.email) {
        return NextResponse.json(
            { error: 'Unauthorized - Please sign in to save valuations' },
            { status: 401 }
        );
    }

    if (req.method === 'POST') {
        const body = await req.json();
        const { symbol, email, inputs, fetchedInputs, stockInfo, valuationModel, valuationOutput, impliedSharePrice, roic_data, description, valuedDate } = body;

        // SECURITY FIX: Validate user can only create valuations for themselves
        if (email !== session.user.email) {
            return NextResponse.json(
                { error: 'Forbidden - You can only create valuations for your own account' },
                { status: 403 }
            );
        }

        // Input validation
        if (!symbol || typeof symbol !== 'string' || symbol.trim().length === 0) {
            return NextResponse.json(
                { error: 'Invalid symbol - Symbol is required' },
                { status: 400 }
            );
        }

        if (typeof impliedSharePrice !== 'number' || isNaN(impliedSharePrice)) {
            return NextResponse.json(
                { error: 'Invalid implied share price - Must be a number' },
                { status: 400 }
            );
        }

        console.log(roic_data)
        try {
            const newValuation = await prisma.valuation.create({
                data: {
                    symbol: symbol.trim().toUpperCase(),
                    email: session.user.email, // Use session email instead of body email
                    inputs,
                    fetched_inputs: fetchedInputs,
                    stock_info: stockInfo,
                    valuation_model: valuationModel,
                    valuation_output: valuationOutput,
                    implied_share_price: impliedSharePrice,
                    roic_data,
                    description,
                    valued_date: valuedDate,
                },
            });
            return NextResponse.json(newValuation, { status: 200 });
        } catch (error) {
            console.log(error);
            return NextResponse.json({ error: 'Failed to save valuation data' }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });

    }
}


export async function GET(req: NextRequest) {
    const session = await getServerSession();

    if (!session || !session.user?.email) {
        return NextResponse.json(
            { error: 'Unauthorized - Please sign in to view valuations' },
            { status: 401 }
        );
    }

    const searchParams = req.nextUrl.searchParams;
    const symbol = searchParams.get('symbol');

    try {
        if (symbol === null || symbol === 'null') {
            // SECURITY FIX: Filter by authenticated user's email
            // Only return valuations belonging to the logged-in user
            const result = await prisma.valuation.findMany({
                where: { email: session.user.email },
                orderBy: { valued_date: 'desc' }
            });
            return NextResponse.json(result, { status: 200 });

        } else {
            // SECURITY FIX: Filter by both symbol AND user email
            const result = await prisma.valuation.findMany({
                where: {
                    symbol: symbol.toUpperCase(),
                    email: session.user.email  // Only return user's own valuations
                },
                orderBy: { valued_date: 'desc' }
            });

            return NextResponse.json(result, { status: 200 });
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to retrieve valuation data' }, { status: 500 });
    }
}


