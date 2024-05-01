import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { storeId: string } },
) {
  try {
    const { storeId } = params;

    if (!storeId)
      return NextResponse.json(
        { error: "StoreId is required" },
        { status: 400 },
      );

    const orders = await prisma.order.findMany({
      where: {
        storeId,
      },
    });

    return NextResponse.json(orders, { status: 200 });
  } catch (e) {
    console.log(`Error in GET orders req ${e}`);
    return NextResponse.json(e, { status: 500 });
  }
}
