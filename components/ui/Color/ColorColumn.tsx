"use client";
import { ColumnDef } from "@tanstack/react-table";
import ColorActions from "./ColorActions";

export type ColorColumn = {
  name: string;
  value: string;
  id: string;
  createdAt: string;
};

export const columns: ColumnDef<ColorColumn>[] = [
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
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-4 ">
          {row.original.value}
          <div
            className="rounded-full h-8 w-8"
            style={{ backgroundColor: row.original.value }}
          ></div>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <ColorActions data={row.original} />,
  },
];
