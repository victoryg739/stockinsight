import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

async function getOwnedGroup(email: string, groupId: number) {
  const group = await prisma.valuation_group.findUnique({ where: { id: groupId } });
  if (!group || group.email !== email) return null;
  return group;
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const groupId = parseInt(id);
  const group = await getOwnedGroup(session.user.email, groupId);
  if (!group) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const { valuationId } = await request.json();
  if (!valuationId) return NextResponse.json({ error: "valuationId required" }, { status: 400 });

  await prisma.valuation_group_member.upsert({
    where: { group_id_valuation_id: { group_id: groupId, valuation_id: valuationId } },
    create: { group_id: groupId, valuation_id: valuationId },
    update: {},
  });

  return NextResponse.json({ success: true }, { status: 201 });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const groupId = parseInt(id);
  const group = await getOwnedGroup(session.user.email, groupId);
  if (!group) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const { valuationId } = await request.json();
  if (!valuationId) return NextResponse.json({ error: "valuationId required" }, { status: 400 });

  await prisma.valuation_group_member.deleteMany({
    where: { group_id: groupId, valuation_id: valuationId },
  });

  return NextResponse.json({ success: true });
}
