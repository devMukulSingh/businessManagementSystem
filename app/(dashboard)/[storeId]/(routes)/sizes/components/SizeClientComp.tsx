"use client";

import { PlusCircle, Router } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "@/components/commons/DataTable";
import { Billboard } from "@prisma/client";
import { SizeColumn, columns } from "@/components/ui/SizeColumn";
import ApiList from "@/components/commons/ApiList";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface SizeClientCompProps {
  size: SizeColumn[];
}

const SizeClientComp: React.FC<SizeClientCompProps> = ({ size }) => {
  const { storeId } = useParams();
  const router = useRouter();
  return (
    <main className="flex flex-col gap-4 p-5">
      <header className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Size({size.length})</h1>
          <p className="text-sm text-slate-500">Manage Sizes</p>
        </div>
        <Link href={`/${storeId}/sizes/new`} prefetch={true}>
          <Button className="flex gap-2">
            <PlusCircle />
            Add New
          </Button>
        </Link>
      </header>
      <DataTable columns={columns} data={size} />
      <Separator />
      <ApiList entityIdName="{sizeId}" entityName="size" />
    </main>
  );
};

export default SizeClientComp;
