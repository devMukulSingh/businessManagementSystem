"use client";
import { ColumnDef } from "@tanstack/react-table";
import SizeActions from "./SizeActions";

export type SizeColumn = {
  name: string;
  value: string;
  id: string;
  createdAt: string;
};

export const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <SizeActions data={row.original} />,
  },
];
