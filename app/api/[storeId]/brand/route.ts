import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;
    const { storeId } = params;

    if (!userId)
      return NextResponse.json({ error: "Unauthenticated" }, { status: 403 });

    const store = await prisma.store.findMany({
      where: {
        userId,
      },
    });

    if (!store)
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

    if (!name)
      return NextResponse.json({ error: "name is required" }, { status: 400 });

    const brand = await prisma.brand.create({
      data: {
        name,
        storeId,
      },
    });
    return NextResponse.json(brand, { status: 201 });
  } catch (error) {
    console.log(`Error in brand POST req ${error}`);
    return NextResponse.json(error, { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { storeId } = params;

    if (!storeId)
      return NextResponse.json(
        { error: "Store id is required" },
        { status: 400 },
      );

    const brands = await prisma.brand.findMany({
      where: {
        storeId,
      },
    });
    return NextResponse.json(brands, { status: 200 });
  } catch (error) {
    console.log(`Error in brand GET req ${error}`);
    return NextResponse.json(error, { status: 500 });
  }
}
