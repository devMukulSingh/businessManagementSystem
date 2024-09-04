import { prisma } from "@/lib/prisma";
import { cache } from "react";

export const getAllProducts = cache(async (storeId: string) => {
  const products = await prisma.product.findMany({
    where: {
      storeId,
    },
  });
  const totalProducts = products.reduce(
    (prev, curr) => prev + curr.quantityAvailable,
    0,
  );
  console.log("products");
  
  return totalProducts;
});
