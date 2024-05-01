import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { storeId } = params;
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;

    if (!userId) {
      return NextResponse.json(
        {
          error: "Unauthenticated",
        },
        { status: 401 },
      );
    }

    if (!storeId) {
      return NextResponse.json(
        {
          error: "StoreId is required",
        },
        { status: 400 },
      );
    }

    if (!name) {
      return NextResponse.json(
        {
          error: "name is required",
        },
        { status: 400 },
      );
    }

    const store = await prisma.store.update({
      where: {
        userId,
        id: storeId,
      },
      data: {
        name,
      },
    });
    return NextResponse.json(store, { status: 200 });
  } catch (error) {
    console.log(`Error in Patch Stores ${error}`);
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { storeId } = params;
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json(
        {
          error: "Unauthenticated",
        },
        { status: 401 },
      );
    }

    if (!storeId) {
      return NextResponse.json(
        {
          error: "StoreId is required",
        },
        { status: 400 },
      );
    }

    const store = await prisma.store.delete({
      where: {
        userId,
        id: storeId,
      },
    });
    return NextResponse.json(store, { status: 200 });
  } catch (error) {
    console.log(`Error in Delete Stores ${error}`);
    return NextResponse.json(error, { status: 500 });
  }
}
