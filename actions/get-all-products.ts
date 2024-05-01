import { prisma } from "@/lib/prisma";

export const getAllProducts = async (storeId: string) => {
  const products = await prisma.product.findMany({
    where: {
      storeId,
      // isArchived: false,
    },
  });
  return products.length;
};
