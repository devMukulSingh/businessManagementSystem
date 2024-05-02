// import { prisma } from "@/lib/prisma";
// import { auth } from "@clerk/nextjs";
// import { NextResponse } from "next/server";

// export async function GET(
//   req: Request,
//   {
//     params,
//   }: {
//     params: { billboardId: string; storeId: string };
//   },
// ) {
//   try {
//     const { billboardId } = params;

//     if (!billboardId)
//       return NextResponse.json(
//         { error: "Billboard id is required" },
//         { status: 400 },
//       );

//     const billboard = await prisma.billboard.findUnique({
//       where: {
//         id: billboardId,
//       },
//       include: {
//         images: true,
//       },
//     });
//     return NextResponse.json(billboard, { status: 200 });
//   } catch (error) {
//     console.log(`Error in billboard GET req ${error}`);
//     return NextResponse.json(error, { status: 500 });
//   }
// }

// export async function PATCH(
//   req: Request,
//   {
//     params,
//   }: {
//     params: { billboardId: string; storeId: string };
//   },
// ) {
//   try {
//     const { userId } = auth();
//     const body = await req.json();
//     const { billboardId, storeId } = params;
//     const { label, images } = body;

//     if (!userId)
//       return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
//     if (!billboardId)
//       return NextResponse.json(
//         { error: "Billboard id is required" },
//         { status: 400 },
//       );
//     if (!label)
//       return NextResponse.json({ error: "label is required" }, { status: 400 });
//     if (images.length < 0)
//       return NextResponse.json(
//         { error: "images is required" },
//         { status: 400 },
//       );

//     const storeByUserId = await prisma.store.findUnique({
//       where: {
//         userId,
//         id: storeId,
//       },
//     });
//     if (!storeByUserId)
//       return NextResponse.json({ error: "Unauthorised" }, { status: 402 });

//     await prisma.billboard.update({
//       where: {
//         id: billboardId,
//         storeId,
//       },
//       data: {
//         label,
//         images: {
//           deleteMany: {},
//         },
//       },
//     });

//     const updatedBillboard = await prisma.billboard.update({
//       where: {
//         id: billboardId,
//         storeId,
//       },
//       data: {
//         storeId,
//         label,
//         images: {
//           createMany: {
//             data: [...images.map((image: { url: string }) => image)],
//           },
//         },
//       },
//     });

//     return NextResponse.json(updatedBillboard, { status: 201 });
//   } catch (error) {
//     console.log(`Error in Billboard PATCH req ${error}`);
//     return NextResponse.json(error, { status: 500 });
//   }
// }

// export async function DELETE(
//   req: Request,
//   {
//     params,
//   }: {
//     params: { billboardId: string; storeId: string };
//   },
// ) {
//   try {
//     const { userId } = auth();
//     const { billboardId, storeId } = params;

//     if (!userId)
//       return NextResponse.json({ error: "Authenticated" }, { status: 401 });

//     if (!billboardId)
//       return NextResponse.json(
//         { error: "Billboard id is required" },
//         { status: 400 },
//       );

//     const storeByUserId = await prisma.store.findUnique({
//       where: {
//         userId,
//         id: storeId,
//       },
//     });

//     if (!storeByUserId)
//       return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

//     await prisma.billboard.delete({
//       where: {
//         id: billboardId,
//         storeId,
//       },
//     });
//     return NextResponse.json({ msg: "Billboard deleted" }, { status: 200 });
//   } catch (error) {
//     console.log(`Error in billboard DELETE req ${error}`);
//     return NextResponse.json(error, { status: 500 });
//   }
// }
