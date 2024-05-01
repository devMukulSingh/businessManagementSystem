import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { colorId: string; storeId: string };
  },
) {
  try {
    const { colorId } = params;

    if (!colorId)
      return NextResponse.json(
        { error: "color id is required" },
        { status: 400 },
      );

    const color = await prisma.color.findUnique({
      where: {
        id: colorId,
      },
    });
    return NextResponse.json(color, { status: 200 });
  } catch (error) {
    console.log(`Error in color GET req ${error}`);
    return NextResponse.json(error, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: { colorId: string; storeId: string };
  },
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { colorId, storeId } = params;
    const { value, name } = body;

    if (!userId)
      return NextResponse.json({ error: "Unauthenticated" }, { status: 403 });
    if (!colorId)
      return NextResponse.json(
        { error: "color id is required" },
        { status: 400 },
      );
    if (!value)
      return NextResponse.json(
        { error: "color value is required" },
        { status: 400 },
      );
    if (!name)
      return NextResponse.json(
        { error: "color name is required" },
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

    const updatedcolor = await prisma.color.update({
      where: {
        id: colorId,
        storeId,
      },
      data: {
        value,
        name,
      },
    });

    return NextResponse.json(updatedcolor, { status: 200 });
  } catch (error) {
    console.log(`Error in color PATCH req ${error}`);
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: { colorId: string; storeId: string };
  },
) {
  try {
    const { userId } = auth();
    const { colorId, storeId } = params;

    if (!userId)
      return NextResponse.json({ error: "Authenticated" }, { status: 401 });

    if (!colorId)
      return NextResponse.json(
        { error: "color id is required" },
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

    await prisma.color.delete({
      where: {
        id: colorId,
        storeId,
      },
    });
    return NextResponse.json({ msg: "color deleted" }, { status: 200 });
  } catch (error) {
    console.log(`Error in color DELETE req ${error}`);
    return NextResponse.json(error, { status: 500 });
  }
}
