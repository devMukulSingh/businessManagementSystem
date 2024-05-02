import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { productId: string; storeId: string };
  },
) {
  try {
    const { productId,storeId } = params;

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
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
        storeId
      },
      // include: {
      //   images: true,
      // },
    });
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log(`Error in product GET req ${error}`);
    return NextResponse.json(error, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: { productId: string; storeId: string };
  },
) {
  try {
    const { storeId, productId } = params;
    const { userId } = auth();
    const body = await req.json();
    const {
      name,
      brandId,
      price,
      colorId,
      quantity,
      // categoryId,
      // isArchived,
      // isFeatured,
      // description,
      // ratings,
      // images,
    } = body;

    if (!userId)
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

    if (!storeId)
      return NextResponse.json(
        { error: "storeId is required" },
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

    if (!price)
      return NextResponse.json({ error: "price is required" }, { status: 400 });

    if (!brandId)
      return NextResponse.json(
        { error: "brandId is required" },
        { status: 400 },
      );

    // if(!description) return NextResponse.json({ error:'description is required',{status:400});

    const storeByUserId = await prisma.store.findUnique({
      where: {
        userId,
        id: storeId,
      },
    });
    if (!storeByUserId)
      return NextResponse.json({ error: "Unauthorised" }, { status: 402 });

    const updatedproducts = await prisma.product.update({
      where: {
        id: productId,
        storeId,
      },
      include: {
        // images: true,
        // category: true,
        color: true,
      },
      data: {
        name,
        price,
        colorId,
        storeId,
        brandId,
        quantityAvailable:quantity
        // ratings,
        // sizeId,
        // categoryId,
        // isArchived,
        // isFeatured,
        // description: descriptionArray,
        // images: {
        //   deleteMany: {},
        // },
      },
    });

    // const updatedproducts = await prisma.product.update({
    //   where: {
    //     id: productId,
    //     storeId,
    //   },
    //   include: {
    //     images: true,
    //   },
    //   data: {
    //     images: {
    //       createMany: {
    //         data: [...images.map((img: { url: string }) => img)],
    //       },
    //     },
    //   },
    // });

    return NextResponse.json(updatedproducts, { status: 201 });
  } catch (error) {
    console.log(`Error in product PATCH req ${error}`);
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: { productId: string; storeId: string };
  },
) {
  try {
    const { userId } = auth();
    const { productId, storeId } = params;

    if (!userId)
      return NextResponse.json({ error: "Authenticated" }, { status: 401 });

    if (!productId)
      return NextResponse.json(
        { error: "product id is required" },
        { status: 400 },
      );

    const storeByUserId = await prisma.store.findUnique({
      where: {
        userId,
        id: storeId,
      },
      include: {
        // categories: true,
        // sizes: true,
        colors: true,
        products: true,
      },
    });

    if (!storeByUserId)
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

    await prisma.product.delete({
      where: {
        id: productId,
        storeId,
      },
    });
    return NextResponse.json({ msg: "product deleted" }, { status: 200 });
  } catch (error) {
    console.log(`Error in product DELETE req ${error}`);
    return NextResponse.json(error, { status: 500 });
  }
}
