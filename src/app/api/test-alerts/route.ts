import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession();

        // Only allow authenticated users to test (you can remove this in production)
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Call the cron job endpoint
        const cronUrl = new URL('/api/cron/check-price-alerts', request.url);
        const cronResponse = await fetch(cronUrl, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${process.env.CRON_SECRET}`
            }
        });

        const result = await cronResponse.json();

        return NextResponse.json({
            message: "Test alert check completed",
            result,
            status: cronResponse.status
        });

    } catch (error) {
        console.error("Error in test alerts:", error);
        return NextResponse.json(
            { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
} 