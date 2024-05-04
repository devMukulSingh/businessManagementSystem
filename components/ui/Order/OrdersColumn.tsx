"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrdersColumn = {
  id: string;
  name: string;
  price: number;
  createdAt: string;
  dueAmount: number;
  isPaymentDue: string;
  customerName: string | null;
};

export const columns: ColumnDef<OrdersColumn>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Product name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "dueAmount",
    header: "Due amount",
  },
  {
    accessorKey: "isPaymentDue",
    header: "Payment due",
  },
  {
    accessorKey: "customerName",
    header: "Customer name",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
];
