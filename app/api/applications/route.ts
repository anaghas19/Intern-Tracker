import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  const apps = await prisma.application.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(apps);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { company, role, status } = body;

  if (!company || !role || !status) {
    return new NextResponse("Missing fields", { status: 400 });
  }

  const app = await prisma.application.create({
    data: { company, role, status },
  });

  return NextResponse.json(app);
}

export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
  
    if (!id) {
      return new NextResponse("Missing id", { status: 400 });
    }
  
    await prisma.application.delete({
      where: { id },
    });
  
    return new NextResponse(null, { status: 204 });
  }
  