// pages/api/saveValuation.js

import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    if (req.method === 'POST') {
        const body = await req.json();
        const { symbol, email, inputs, fetchedInputs, stockInfo, valuationModel, valuationOutput, impliedSharePrice, description, valuedDate } = body;
        try {
            const newValuation = await prisma.valuation.create({
                data: {
                    symbol,
                    email,
                    inputs,
                    fetched_inputs: fetchedInputs,
                    stock_info: stockInfo,
                    valuation_model: valuationModel,
                    valuation_output: valuationOutput,
                    implied_share_price: impliedSharePrice,
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
    const searchParams = req.nextUrl.searchParams;
    const symbol = searchParams.get('symbol');

    try {
        if (symbol === null) {
            //search entire db
            const result = await prisma.valuation.findMany()
            return NextResponse.json(result, { status: 200 });

        } else {
            const result = await prisma.valuation.findMany({
                where: { symbol: symbol },
            });

            return NextResponse.json(result, { status: 200 });
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to save valuation data' }, { status: 500 });
    }
}


