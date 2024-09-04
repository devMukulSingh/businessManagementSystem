import { prisma } from "@/lib/prisma";
import { cache } from "react";

export const getOrders = cache(async (storeId: string) => {
  try {
    console.log("orders");

    const orders = await prisma.order.findMany({
      where: {
        storeId,
      },
      include: {
        product:true
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return orders;
  } catch (e) {
    console.log(`Error in getOrders ${e}`);
    return [];
  }
});
