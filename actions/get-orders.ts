import { prisma } from "@/lib/prisma";

export const getOrders = async (storeId: string) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        storeId,
      },
      include: {
        
      },
    });
    return orders;
  } catch (e) {
    console.log(`Error in getOrders ${e}`);
    return [];
  }
};
