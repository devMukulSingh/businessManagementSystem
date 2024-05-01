import { prisma } from "@/lib/prisma";
import { store } from "@/store/store";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json({ error: "body is required" }, { status: 401 });
    }
    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 401 },
      );
    }

    const store = await prisma.store.create({
      data: {
        userId,
        name,
      },
    });
    return NextResponse.json(store, { status: 200 });
  } catch (error) {
    console.log(`Error in get stores handler ${error}`);
    return NextResponse.json(error, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");
    if (!userId)
      return NextResponse.json(
        { error: "User id is required" },
        { status: 400 },
      );

    const stores = await prisma.store.findMany({
      where: {
        userId,
      },
    });

    return NextResponse.json(stores, { status: 200 });
  } catch (e) {
    console.log(`Error in GET Stores req ${e}`);
    return NextResponse.json(e, { status: 500 });
  }
}
