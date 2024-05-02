"use client";
import { ColumnDef } from "@tanstack/react-table";
import BrandActions from "./BrandActions";

export type BrandColumn = {
  id: string;
  name: string;
  createdAt: string;
};

export const columns: ColumnDef<BrandColumn>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <BrandActions data={row.original} />,
  },
];
