import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});
console.log("Prisma Client Initialized");

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = Number(params.id);

    try {
        const valuation = await prisma.valuation.findUnique({
            where: { id: id },
        });
        console.log(valuation)
        if (!valuation) {
            return NextResponse.json({ error: 'Valuation not found' }, { status: 404 });
        }

        return NextResponse.json(valuation, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch valuation data' }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = Number(params.id);
    console.log(`Deleting valuation with ID: ${id}`);

    try {
        const deletedValuation = await prisma.valuation.delete({
            where: { id: id },
        });

        console.log(deletedValuation);
        return NextResponse.json({ message: 'Valuation deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error(error);

        return NextResponse.json({ error: 'Failed to delete valuation' }, { status: 500 });
    }
}