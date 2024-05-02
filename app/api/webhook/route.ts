// import Stripe from "stripe";
// import { headers } from "next/headers";
// import { stripe } from "@/lib/stripe";
// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export async function POST(req: Request, res: Response) {
//   try {
//     const body = await req.text();

//     const signature = headers().get("Stripe-Signature") as string;

//     let event: Stripe.Event;
//     try {
//       event = stripe.webhooks.constructEvent(

//         body,
//         signature,
//         process.env.STRIPE_WEBHOOK_SECRET!,
//       );
//     } catch (e) {
//       console.log(`Error in stripe ConstructEvent ${e}`);
//       return NextResponse.json(e, { status: 500 });
//     }
//     const session = event.data.object as Stripe.Checkout.Session;
//     const address = session?.customer_details?.address;

//     const addressComponents = [
//       address?.line1,
//       address?.line2,
//       address?.city,
//       address?.state,
//       address?.postal_code,
//       address?.country,
//     ];

//     const addressString = addressComponents
//       .filter((c) => c !== null)
//       .join(", ");

//     if (event.type === "checkout.session.completed") {
//       const order = await prisma.order.update({
//         where: {
//           id: session?.metadata?.orderId,
//         },
//         data: {
//           isPaid: true,
//           address: addressString,
//           phone: session?.customer_details?.phone || "",
//         },
//         include: {
//           orderItems: {
//             include: {
//               product: true,
//             },
//           },
//         },
//       });

//       const productIds = order.orderItems.map((product) => product.id);

//       await prisma.product.updateMany({
//         where: {
//           id: {
//             in: [...productIds],
//           },
//         },
//         data: {
//           isArchived: true,
//         },
//       });
//       return NextResponse.json(null, { status: 200 });
//     }
//     return new NextResponse(`Error in event`, { status: 500 });
//   } catch (e) {
//     return NextResponse.json(e, { status: 500 });
//   }
// }
