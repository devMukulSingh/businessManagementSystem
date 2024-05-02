import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, res: NextResponse) {
  try {
    const {
      quantity,
      productId,
      storeId,
      dueAmount,
      customerName = "",
    } = await req.json();

    if (!quantity || quantity === 0)
      return NextResponse.json(
        {
          error: "Quantity is required",
        },
        { status: 400 },
      );

    if (!productId)
      return NextResponse.json(
        { error: "product id is required" },
        { status: 400 },
      );
    if (!storeId)
      return NextResponse.json(
        { error: "store id is required" },
        { status: 400 },
      );

    const updatedProduct = await prisma.product.update({
      where: {
        id: productId,
        storeId,
      },
      data: {
        quantityAvailable: {
          decrement: quantity,
        },
        quantitySold: {
          increment: quantity,
        },
      },
    });

    await prisma.order.create({
      data: {
        dueAmount,
        customerName,
        productId: updatedProduct.id,
        storeId,
      },
    });

    return NextResponse.json(
      { msg: "Product updated", updatedProduct },
      { status: 200 },
    );
  } catch (e) {
    console.log("Error in sell - product", e);
    return NextResponse.json(e, { status: 500 });
  }
}
