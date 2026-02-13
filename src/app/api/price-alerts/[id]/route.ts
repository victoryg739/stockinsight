import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

// DELETE - Delete a specific price alert
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession();

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const alertId = parseInt(id);

        if (isNaN(alertId)) {
            return NextResponse.json({ error: "Invalid alert ID" }, { status: 400 });
        }

        // Check if the alert exists and belongs to the user
        const alert = await prisma.price_alert.findUnique({
            where: {
                id: alertId,
            },
        });

        if (!alert) {
            return NextResponse.json({ error: "Alert not found" }, { status: 404 });
        }

        if (alert.email !== session.user.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        // Delete the alert
        await prisma.price_alert.delete({
            where: {
                id: alertId,
            },
        });

        return NextResponse.json({ message: "Alert deleted successfully" });
    } catch (error) {
        console.error("Error deleting price alert:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// PUT - Update a specific price alert
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession();

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const alertId = parseInt(id);

        if (isNaN(alertId)) {
            return NextResponse.json({ error: "Invalid alert ID" }, { status: 400 });
        }

        const body = await request.json();
        const { targetPrice, condition, expiresAt, status } = body;

        // Check if the alert exists and belongs to the user
        const alert = await prisma.price_alert.findUnique({
            where: {
                id: alertId,
            },
        });

        if (!alert) {
            return NextResponse.json({ error: "Alert not found" }, { status: 404 });
        }

        if (alert.email !== session.user.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        // Prepare update data
        const updateData: any = {};

        if (targetPrice !== undefined) {
            if (targetPrice <= 0) {
                return NextResponse.json({ error: "Target price must be positive" }, { status: 400 });
            }
            updateData.target_price = parseFloat(targetPrice);
        }

        if (condition !== undefined) {
            if (!["ABOVE", "BELOW"].includes(condition)) {
                return NextResponse.json({ error: "Invalid condition" }, { status: 400 });
            }
            updateData.condition = condition;
        }

        if (expiresAt !== undefined) {
            updateData.expires_at = expiresAt ? new Date(expiresAt) : null;
        }

        if (status !== undefined) {
            if (!["ACTIVE", "TRIGGERED", "CANCELLED"].includes(status)) {
                return NextResponse.json({ error: "Invalid status" }, { status: 400 });
            }
            updateData.status = status;
        }

        // Update the alert
        const updatedAlert = await prisma.price_alert.update({
            where: {
                id: alertId,
            },
            data: updateData,
        });

        return NextResponse.json(updatedAlert);
    } catch (error) {
        console.error("Error updating price alert:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
} 