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
    const { name, quantity, price, colorId, brandId } = body;
    const { storeId } = params;

    if (!userId)
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

    const store = await prisma.store.findMany({
      where: {
        userId,
      },
    });

    if (!store)
      return NextResponse.json({ error: "Unathorised" }, { status: 402 });

    if (!storeId)
      return NextResponse.json(
        { error: "Store id is required" },
        { status: 400 },
      );

    if (!name)
      return NextResponse.json({ error: "name required" }, { status: 400 });

    if (!colorId)
      return NextResponse.json(
        { error: "colorId is required" },
        { status: 400 },
      );

    // if (!images || images.length < 0)
    //   return NextResponse.json({ error: "image is required" }, { status: 400 });
    // if (!categoryId)
    //   return NextResponse.json(
    //     { error: "categoryId is required" },
    //     { status: 400 },
    //   );

    if (!price)
      return NextResponse.json({ error: "price is required" }, { status: 400 });

    if (!brandId)
      return NextResponse.json(
        { error: "brandId is required" },
        { status: 400 },
      );

    //converting the string into array
    // let descriptionArray = [];
    // if (description) {
    //   descriptionArray = description.split("\n");
    // }

    const product = await prisma.product.create({
      data: {
        name,
        price,
        quantityAvailable: quantity,
        storeId,
        colorId,
        brandId,
        // images: {
        //   createMany: {
        //     data: [...images.map((img: { url: string }) => img)],
        //   },
        // },
      },
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.log(`Error in product POST req ${error}`);
    return NextResponse.json(error, { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { storeId } = params;
    const { userId } = auth();
    if (!storeId)
      return NextResponse.json(
        { error: "Store id is required" },
        { status: 400 },
      );

    const products = await prisma.product.findMany({
      where: {
        storeId,
      },
      // include: {
      //   images: true,
      // },
    });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.log(`Error in product GET req ${error}`);
    return NextResponse.json(error, { status: 500 });
  }
}
