"use client";

import { ColumnDef } from "@tanstack/react-table";
import ProductActions from "./ProductActions";

export type ProductColumn = {
  id: string;
  name: string;
  color: string;
  quantity:number,
  price: number;
  brand: string;
  // category: string;
  // isFeatured: boolean;
  // isArchived: boolean;
  // createdAt: string;
  // ratings: Decimal | null;
  // description: string | undefined;
};
export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },

  {
    id: "actions",
    cell: ({ row }) => <ProductActions data={row.original} />,
  },
  // {
  //   accessorKey: "ratings",
  //   header: "Rating",
  // },
  // {
  //   accessorKey: "isFeatured",
  //   header: "isFeatured",
  // },
  // {
  //   accessorKey: "isArchived",
  //   header: "isArchived",
  // },
];
