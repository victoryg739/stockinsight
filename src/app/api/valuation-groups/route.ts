import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const groups = await prisma.valuation_group.findMany({
    where: { email: session.user.email },
    include: { members: { select: { valuation_id: true } } },
    orderBy: { id: "asc" },
  });

  const result = groups.map((g) => ({
    id: g.id,
    name: g.name,
    color: g.color,
    memberCount: g.members.length,
    memberIds: g.members.map((m) => m.valuation_id),
  }));

  return NextResponse.json(result);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, color } = await request.json();
  if (!name?.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const group = await prisma.valuation_group.create({
    data: {
      name: name.trim(),
      color: color || "blue",
      email: session.user.email,
    },
  });

  return NextResponse.json({ ...group, memberCount: 0, memberIds: [] }, { status: 201 });
}
