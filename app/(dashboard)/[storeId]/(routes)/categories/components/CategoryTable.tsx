import React, { FC } from "react";
import { DataTable } from "@/components/commons/DataTable";
import { CategoryColumn, columns } from "@/components/ui/CategoryColumn";
import { prisma } from "@/lib/prisma";
import { CategoriesClientCompProps } from "./CategoriesClientComp";
import { format } from "date-fns";
import Header from "./Header";

const CategoryTable: FC<CategoriesClientCompProps> = async ({ storeId }) => {
  const categories = await prisma.category.findMany({
    where: {
      storeId: storeId,
    },
    include: {
      billboard: true,
    },
  });
  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
    billboardLabel: item?.billboard?.label,
  }));
  return (
    <>
      <Header categories={categories} />
      <DataTable columns={columns} data={formattedCategories} />
    </>
  );
};

export default CategoryTable;
