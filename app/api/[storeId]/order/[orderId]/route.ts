import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { storeId: string; orderId: string } },
) {
  try {
    const { storeId, orderId } = params;

    if (!storeId)
      return NextResponse.json(
        { error: "StoreId is required" },
        { status: 400 },
      );

    if (!orderId)
      return NextResponse.json(
        { error: "orderId is required" },
        { status: 400 },
      );

    const order = await prisma.order.findFirst({
      where: {
        storeId,
        id: orderId,
      },
    });

    return NextResponse.json(order, { status: 200 });
  } catch (e) {
    console.log(`Error in GET order req ${e}`);
    return NextResponse.json(e, { status: 500 });
  }
}
