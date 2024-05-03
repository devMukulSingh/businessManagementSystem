import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, user } = body;

    if (!user) {
      return NextResponse.json({ error: "user is required" }, { status: 401 });
    }

    if (!name) {
      return NextResponse.json({ error: "name is required" }, { status: 401 });
    }

    const store = await prisma.store.create({
      data: {
        userId: user.id,
        name,
      },
    });

    await prisma.user.create({
      data: {
        id: user.id,
        name: user.fullName,
        email: user.primaryEmailAddress.emailAddress,
      },
    });

    return NextResponse.json(store, { status: 200 });
  } catch (error) {
    console.log(`Error in get stores handler`, error);
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
