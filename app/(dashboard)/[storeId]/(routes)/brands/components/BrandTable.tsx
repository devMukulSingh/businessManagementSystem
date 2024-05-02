import React, { FC } from "react";
import Header from "./Header";
import { BrandColumn, columns } from "@/components/ui/Brand/BrandColumn";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { DataTable } from "@/components/commons/DataTable";
import { BrandClientCompProps } from "./BrandClientComp";

const BrandTable: FC<BrandClientCompProps> = async ({ storeId }) => {
  const brands = await prisma.brand.findMany({
    where: {
      storeId: storeId,
    },
  });
  const formattedbrands: BrandColumn[] = brands.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <>
      <Header brand={brands} />
      <DataTable columns={columns} data={formattedbrands} />
    </>
  );
};

export default BrandTable;
