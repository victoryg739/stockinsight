import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

// GET - Fetch preferences for the authenticated user
export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession();

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const prefs = await prisma.user_preferences.upsert({
            where: { email: session.user.email },
            update: {},
            create: { email: session.user.email, dark_mode: false },
        });

        return NextResponse.json(prefs);
    } catch (error) {
        console.error("Error fetching user preferences:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// PATCH - Update preferences for the authenticated user
export async function PATCH(request: NextRequest) {
    try {
        const session = await getServerSession();

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { dark_mode } = body;

        const prefs = await prisma.user_preferences.upsert({
            where: { email: session.user.email },
            update: { dark_mode },
            create: { email: session.user.email, dark_mode },
        });

        return NextResponse.json(prefs);
    } catch (error) {
        console.error("Error updating user preferences:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
