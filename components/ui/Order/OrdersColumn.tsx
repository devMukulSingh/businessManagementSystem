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
  orderPrice: number | null;
  quantity: number | null;
};

export const columns: ColumnDef<OrdersColumn>[] = [
  // {
  //   accessorKey: "id",
  //   header: "Id",
  // },
  {
    accessorKey: "name",
    header: "Product name",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <>₹{row.original.price}</>,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "orderPrice",
    header: "Total",
    cell: ({ row }) => <>₹{row.original.orderPrice}</>,
  },
  {
    accessorKey: "dueAmount",
    header: "Due amount",
    cell: ({ row }) => <>₹{row.original.dueAmount}</>,
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
