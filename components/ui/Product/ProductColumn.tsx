"use client";

import { ColumnDef } from "@tanstack/react-table";
import ProductActions from "./ProductActions";
import SellButton from "./SellButton";

export type ProductColumn = {
  id: string;
  name: string;
  color: {
    name:string,
    value:string
  };
  quantity: number;
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
    accessorKey: "color.name",
    header: "Color",
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
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <SellButton data={row.original} />,
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
