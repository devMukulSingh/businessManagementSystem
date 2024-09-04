import { prisma } from "@/lib/prisma";
import { cache } from "react";

export const getProducts = cache(async (storeId: string) => {
  console.log("products");

  const products = await prisma.product.findMany({
    where: {
      storeId,
    },
    include: {
      color: true,
      brand: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return products;
});
