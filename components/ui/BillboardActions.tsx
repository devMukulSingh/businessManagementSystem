"use client";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Copy, Edit, MenuIcon, Trash } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { AlertModal } from "../modals/AlertModal";
import { toast } from "react-hot-toast";
import { BillboardColumn } from "./BillboardColumn";

interface IcellActionProps {
  data: BillboardColumn;
}

const CellAction: React.FC<IcellActionProps> = ({ data }) => {
  useEffect(() => {
    router.prefetch(`/${storeId}/billboards/${billboardId}`);
  }, []);
  const { storeId } = useParams();
  const { id: billboardId } = data;
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleCopy = () => {
    navigator.clipboard.writeText(billboardId);
    toast.success(`Billboard Id copied to clipboard`);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(
        `/api/${storeId}/billboard/${billboardId}`,
      );
      if (res.status === 200) toast.success("Billboard Deleted");
      else if (res.status === 500) toast.error(`Something went wrong`);
      setIsOpen(false);
      router.refresh();
    } catch (error: any) {
      if (error.response.data.code === "P2014") {
        toast.error(
          `This Billboard is in use, delete the associated Category to continue`,
        );
      } else {
        toast.error(`Something went wrong`);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <AlertModal
        loading={loading}
        isOpen={isOpen}
        onConform={handleDelete}
        onClose={() => setIsOpen(false)}
      />
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MenuIcon className="cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                router.push(`/${storeId}/billboards/${billboardId}`)
              }
            >
              <Edit className="mr-3 h-4 w-4" />
              Update
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleCopy()}>
              <Copy className="mr-3 h-4 w-4" /> Copy
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsOpen(true)}>
              <Trash className="mr-3 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default CellAction;
