import { BrandColumn } from "@/components/ui/Brand/BrandColumn";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { cache } from "react";

export const getBrands = cache(async (storeId: string) => {
  const brands = await prisma.brand.findMany({
    where: {
      storeId: storeId,
    },
  });
  console.log("brands");

  return brands;
});
