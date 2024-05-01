import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { sizeId: string; storeId: string };
  },
) {
  try {
    const { sizeId } = params;

    if (!sizeId)
      return NextResponse.json(
        { error: "size id is required" },
        { status: 400 },
      );

    const size = await prisma.size.findUnique({
      where: {
        id: sizeId,
      },
    });
    return NextResponse.json(size, { status: 200 });
  } catch (error) {
    console.log(`Error in Size GET req ${error}`);
    return NextResponse.json(error, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: { sizeId: string; storeId: string };
  },
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { sizeId, storeId } = params;
    const { name, value } = body;

    if (!userId)
      return NextResponse.json({ error: "Unauthenticated" }, { status: 403 });
    if (!sizeId)
      return NextResponse.json(
        { error: "size id is required" },
        { status: 400 },
      );
    if (!name)
      return NextResponse.json({ error: "name is required" }, { status: 400 });
    if (!value)
      return NextResponse.json(
        { error: "Size value is required" },
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

    const updatedSize = await prisma.size.update({
      where: {
        id: sizeId,
        storeId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(updatedSize, { status: 200 });
  } catch (error) {
    console.log(`Error in Size PATCH req ${error}`);
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: { sizeId: string; storeId: string };
  },
) {
  try {
    const { userId } = auth();
    const { sizeId, storeId } = params;

    if (!userId)
      return NextResponse.json({ error: "Authenticated" }, { status: 401 });

    if (!sizeId)
      return NextResponse.json(
        { error: "size id is required" },
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

    await prisma.size.delete({
      where: {
        id: sizeId,
        storeId,
      },
    });
    return NextResponse.json({ msg: "size deleted" }, { status: 200 });
  } catch (error) {
    console.log(`Error in size DELETE req ${error}`);
    return NextResponse.json(error, { status: 500 });
  }
}
