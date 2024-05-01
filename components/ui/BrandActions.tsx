"use client";
import React, { useState } from "react";
import { BrandColumn } from "./BrandColumn";
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

interface BrandActionsProps {
  data: BrandColumn;
}

const BrandActions: React.FC<BrandActionsProps> = ({ data }) => {
  const { storeId } = useParams();
  const { id: brandId } = data;
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleCopy = () => {
    navigator.clipboard.writeText(brandId);
    toast.success(`brand Id copied to clipboard`);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(`/api/${storeId}/brand/${brandId}`);
      if (res.status === 200) toast.success("Brand Deleted");
      else if (res.status === 500) toast.error(`Something went wrong`);
      setIsOpen(false);
      router.refresh();
    } catch (error: any) {
      if (error.response.data.code === "P2014") {
        toast.error(
          `This brand is in use, delete the associated Product to continue`,
        );
      } else {
        toast.error(`Something went wrong`);
      }
      console.log(error);
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
            <Copy className="w-4 h-4 mr-3" /> Copy brand Id
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/${storeId}/brands/${brandId}`)}
          >
            <Edit className="w-4 h-4 mr-3" /> Edit brand
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsOpen(true)}>
            <Trash className="w-4 h-4 mr-3" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </main>
  );
};

export default BrandActions;
