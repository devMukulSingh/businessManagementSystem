import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: { storeId: string };
  },
) {
  try {
    const body = await req.json();
    const { name, billboardId } = body;
    const { userId } = auth();
    const { storeId } = params;

    if (!userId)
      return NextResponse.json({ error: "Unauthenticated" }, { status: 403 });

    if (!storeId)
      return NextResponse.json({ error: "UserId required" }, { status: 400 });

    if (!name)
      return NextResponse.json({ error: "name is required" }, { status: 400 });

    if (!billboardId)
      return NextResponse.json(
        { error: "billboardId is required" },
        { status: 400 },
      );

    const category = await prisma.category.create({
      data: {
        name,
        billboardId,
        storeId,
      },
    });
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.log(`Error in category POST ${error}`);
    return NextResponse.json(error, { status: 500 });
  }
}

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { storeId: string };
  },
) {
  try {
    const { storeId } = params;

    if (!storeId)
      return NextResponse.json(
        { error: "storeId is required" },
        { status: 400 },
      );

    const categories = await prisma.category.findMany({
      where: {
        storeId,
      },
    });

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.log(`Error in Categories GET request ${error}`);
    return NextResponse.json(error);
  }
}
