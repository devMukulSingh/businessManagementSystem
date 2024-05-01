"use client";

import { ColumnDef } from "@tanstack/react-table";
import BillboardActions from "./BillboardActions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillboardColumn = {
  id: string;
  label: string;
  createdAt: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    id: "actions",
    cell: ({ row }) => <BillboardActions data={row.original} />,
  },
];
