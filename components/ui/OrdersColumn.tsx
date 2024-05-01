"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrdersColumn = {
  id: string;
  phone: string;
  address: string;
  products: string;
  isPaid: boolean;
  totalPrice: number;
  createdAt: string;
};

export const columns: ColumnDef<OrdersColumn>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },

  {
    accessorKey: "createdAt",
    header: "Date",
  },
];
