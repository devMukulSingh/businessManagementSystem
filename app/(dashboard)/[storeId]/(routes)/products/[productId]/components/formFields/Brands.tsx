import React, { FC, useState } from "react";
import { Iform } from "../ProductForm";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, PlusCircle } from "lucide-react";
import AddBrandModal from "@/components/modals/AddBrandModal";
import { Brand } from "@prisma/client";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import Loader from "@/components/commons/Loader";

const Brands: FC<Iform> = ({ form, loading }) => {
  const { storeId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const handleOnClose = () => {
    setIsOpen(false);
  };
  const { data, error, isLoading } = useSWR(`/api/${storeId}/brand`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  if (error) console.log(`Error in getCategories`, error);
  return (
    <>
      <AddBrandModal isOpen={isOpen} onClose={handleOnClose} />
      <FormField
        name="brandId"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Brand</FormLabel>
            <Select
              disabled={loading || isLoading}
              onValueChange={field.onChange}
              defaultValue={field.value}
              value={field.value}
            >
              <SelectTrigger>
                <FormControl>
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <SelectValue placeholder="Select brand" />
                  )}
                </FormControl>
              </SelectTrigger>
              <SelectContent>
                {data?.map((brand: Brand) => (
                  <SelectItem value={brand.id} key={brand.id}>
                    {brand.name}
                  </SelectItem>
                ))}
                <Button
                  onClick={() => setIsOpen(true)}
                  variant="ghost"
                  className="flex gap-2 w-full justify-start"
                >
                  <PlusCircle />
                  Add Brand
                </Button>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default Brands;
