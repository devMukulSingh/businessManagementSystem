"use client";
import React, { useState } from "react";
import { SizeColumn } from "./SizeColumn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Copy, Edit, Menu, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { AlertModal } from "../modals/AlertModal";

interface IsizeActionsProps {
  data: SizeColumn;
}

const SizeActions: React.FC<IsizeActionsProps> = ({ data }) => {
  const { storeId } = useParams();
  const { id: sizeId } = data;
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleCopy = () => {
    navigator.clipboard.writeText(sizeId);
    toast.success(`Size Id copied to clipboard`);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(`/api/${storeId}/size/${sizeId}`);
      if (res.status === 200) toast.success("Size Deleted");
      else if (res.status === 500) toast.error(`Something went wrong`);
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      toast.error(`Something went wrong`);
      console.log(`Error in handleDelete ${error}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main>
      <AlertModal
        isOpen={isOpen}
        loading={loading}
        onClose={() => setIsOpen(false)}
        onConform={handleDelete}
      />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Menu />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem className="" onClick={() => handleCopy()}>
            <Copy className="w-4 h-4 mr-3" /> Copy size Id
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/${storeId}/sizes/${sizeId}`)}
          >
            <Edit className="w-4 h-4 mr-3" /> Edit size
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsOpen(true)}>
            <Trash className="w-4 h-4 mr-3" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </main>
  );
};

export default SizeActions;
