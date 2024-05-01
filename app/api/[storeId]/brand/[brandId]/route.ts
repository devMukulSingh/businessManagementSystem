import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { brandId: string; storeId: string };
  },
) {
  try {
    const { brandId } = params;

    if (!brandId)
      return NextResponse.json(
        { error: "Brand id is required" },
        { status: 400 },
      );

    const brand = await prisma.brand.findUnique({
      where: {
        id: brandId,
      },
    });
    return NextResponse.json(brand, { status: 200 });
  } catch (error) {
    console.log(`Error in brand GET req ${error}`);
    return NextResponse.json(error, {
      status: 500,
    });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: { brandId: string; storeId: string };
  },
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { brandId, storeId } = params;
    const { name } = body;

    if (!userId)
      return NextResponse.json({ error: "Unauthenticated" }, { status: 403 });
    if (!brandId)
      return NextResponse.json(
        { error: "brand id is required" },
        { status: 400 },
      );
    if (!name)
      return NextResponse.json({ error: "name is required" }, { status: 400 });

    const storeByUserId = await prisma.store.findUnique({
      where: {
        userId,
        id: storeId,
      },
    });
    if (!storeByUserId)
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

    const updatedbrand = await prisma.brand.update({
      where: {
        id: brandId,
        storeId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(updatedbrand, { status: 200 });
  } catch (error) {
    console.log(`Error in brand PATCH req ${error}`);
    return NextResponse.json(error, {
      status: 500,
    });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: { brandId: string; storeId: string };
  },
) {
  try {
    const { userId } = auth();
    const { brandId, storeId } = params;

    if (!userId)
      return NextResponse.json({ error: "Authenticated" }, { status: 401 });

    if (!brandId)
      return NextResponse.json(
        { error: "brand id is required" },
        { status: 400 },
      );

    const storeByUserId = await prisma.store.findUnique({
      where: {
        userId,
        id: storeId,
      },
    });

    if (!storeByUserId)
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

    await prisma.brand.delete({
      where: {
        id: brandId,
        storeId,
      },
    });
    return NextResponse.json({ msg: "brand deleted" }, { status: 200 });
  } catch (error) {
    console.log(`Error in brand DELETE req ${error}`);
    return NextResponse.json(error, {
      status: 500,
    });
  }
}
