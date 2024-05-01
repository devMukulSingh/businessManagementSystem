import { BASE_URL_FRONTEND } from "@/lib/BASE_URL";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const corsHeader = {
  "Access-Control-Allow-Origin": "*",
  "Acess-Control-Allow-Methods": "GET, POST, PUT, DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeader });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { storeId: string } },
) {
  try {
    const { productIds, storeId } = await req.json();

    if (!productIds || productIds?.length < 0)
      return NextResponse.json(
        { error: "ProductIds is required" },
        { status: 400 },
      );
    if (!storeId || storeId === "")
      return NextResponse.json(
        { error: "storeId is required" },
        { status: 400 },
      );

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: [...productIds],
        },
        storeId,
      },
    });
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    products.forEach((product) => {
      line_items.push({
        quantity: 1,
        price_data: {
          currency: "INR",
          product_data: {
            name: product.name,
          },
          unit_amount: product.price * 100,
        },
      });
    });

    const order = await prisma.order.create({
      data: {
        storeId,
        orderItems: {
          create: productIds?.map((productId: string) => ({
            product: {
              // "connect" method -> connect method to establish this relationship during the creation process
              connect: {
                id: productId,
              },
            },
          })),
        },
      },
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      billing_address_collection: "required",
      
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${BASE_URL_FRONTEND}/${storeId}/cart?sucess=1`,
      cancel_url: `${BASE_URL_FRONTEND}/${storeId}/cart?canceled=1`,
      metadata: {
        orderId: order.id,
      },
    });

    return NextResponse.json(
      { url: session.url, session },
      { headers: corsHeader },
    );
  } catch (e) {
    console.log(`Error in POST checkout req ${e}`);
    return NextResponse.json(e, { status: 500 });
  }
}
