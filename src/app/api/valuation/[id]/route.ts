import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: idParam } = await params;
    const id = Number(idParam);

    try {
        const valuation = await prisma.valuation.findUnique({
            where: { id: id },
        });
        if (!valuation) {
            return NextResponse.json({ error: 'Valuation not found' }, { status: 404 });
        }

        return NextResponse.json(valuation, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch valuation data' }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: idParam } = await params;
    const id = Number(idParam);

    try {
        const valuation = await prisma.valuation.findUnique({ where: { id } });

        if (!valuation) {
            return NextResponse.json({ error: 'Valuation not found' }, { status: 404 });
        }

        if (valuation.email !== session.user.email) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const body = await request.json();
        const { inputs, fetchedInputs, stockInfo, valuationModel, valuationOutput, impliedSharePrice, roic_data, description, tags, valuedDate } = body;

        const updated = await prisma.valuation.update({
            where: { id },
            data: {
                inputs,
                fetched_inputs: fetchedInputs,
                stock_info: stockInfo,
                valuation_model: valuationModel,
                valuation_output: valuationOutput,
                implied_share_price: impliedSharePrice,
                roic_data,
                description,
                tags,
                valued_date: valuedDate,
            },
        });

        return NextResponse.json(updated, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to update valuation' }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: idParam } = await params;
    const id = Number(idParam);

    try {
        const valuation = await prisma.valuation.findUnique({ where: { id } });

        if (!valuation) {
            return NextResponse.json({ error: 'Valuation not found' }, { status: 404 });
        }

        if (valuation.email !== session.user.email) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        await prisma.valuation.delete({ where: { id } });

        return NextResponse.json({ message: 'Valuation deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to delete valuation' }, { status: 500 });
    }
}
