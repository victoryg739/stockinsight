import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

// GET - Fetch all alerts for the authenticated user
export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession();

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const alerts = await prisma.price_alert.findMany({
            where: {
                email: session.user.email,
            },
            orderBy: {
                created_at: 'desc',
            },
        });

        return NextResponse.json(alerts);
    } catch (error) {
        console.error("Error fetching price alerts:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// POST - Create a new price alert
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession();

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { symbol, targetPrice, condition, expiresAt } = body;

        // Validation
        if (!symbol || !targetPrice || !condition) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        if (!["ABOVE", "BELOW"].includes(condition)) {
            return NextResponse.json({ error: "Invalid condition" }, { status: 400 });
        }

        if (targetPrice <= 0) {
            return NextResponse.json({ error: "Target price must be positive" }, { status: 400 });
        }

        // Check if user already has an active alert for this symbol and condition
        const existingAlert = await prisma.price_alert.findFirst({
            where: {
                email: session.user.email,
                symbol: symbol.toUpperCase(),
                condition,
                status: "ACTIVE",
            },
        });

        if (existingAlert) {
            return NextResponse.json({
                error: "You already have an active alert for this symbol and condition"
            }, { status: 400 });
        }

        const alert = await prisma.price_alert.create({
            data: {
                email: session.user.email,
                symbol: symbol.toUpperCase(),
                target_price: parseFloat(targetPrice),
                condition,
                expires_at: expiresAt ? new Date(expiresAt) : null,
            },
        });

        return NextResponse.json(alert, { status: 201 });
    } catch (error) {
        console.error("Error creating price alert:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
} 