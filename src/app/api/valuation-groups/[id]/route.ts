import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const groupId = parseInt(id);
  const existing = await prisma.valuation_group.findUnique({ where: { id: groupId } });

  if (!existing || existing.email !== session.user.email) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { name, color } = await request.json();
  if (!name?.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const updated = await prisma.valuation_group.update({
    where: { id: groupId },
    data: { name: name.trim(), color: color || existing.color },
  });

  return NextResponse.json(updated);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const groupId = parseInt(id);
  const existing = await prisma.valuation_group.findUnique({ where: { id: groupId } });

  if (!existing || existing.email !== session.user.email) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Cascade delete handles members automatically
  await prisma.valuation_group.delete({ where: { id: groupId } });

  return NextResponse.json({ success: true });
}
