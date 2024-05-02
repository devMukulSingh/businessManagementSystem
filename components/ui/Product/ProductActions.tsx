"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { Copy, Edit, MenuIcon, Trash } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { AlertModal } from "../../modals/AlertModal";
import { toast } from "react-hot-toast";
import { ProductColumn } from "./ProductColumn";

interface IproductActionsProps {
  data: ProductColumn;
}

const ProductActions: React.FC<IproductActionsProps> = ({ data }) => {
  const { storeId } = useParams();
  const { id: productId } = data;
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleCopy = () => {
    navigator.clipboard.writeText(productId);
    toast.success(`product Id copied to clipboard`);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(`/api/${storeId}/product/${productId}`);
      if (res.status === 200) toast.success("product Deleted");
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
              onClick={() => router.push(`/${storeId}/products/${productId}`)}
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

export default ProductActions;
