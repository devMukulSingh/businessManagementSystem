import { prisma } from "@/lib/prisma";

export const getAllProducts = async (storeId: string) => {
  const products = await prisma.product.findMany({
    where: {
      storeId,
    },
  });
  const totalProducts = products.reduce( (prev,curr) => prev+curr.quantityAvailable,0 );
  console.log(totalProducts);
  
  return totalProducts;
};
