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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, PlusCircle } from "lucide-react";
import AddBrandModal from "@/components/modals/AddBrandModal";

const Brands: FC<Iform> = ({ form, loading, brands }) => {
      const [isOpen, setIsOpen] = useState(false);
      const handleOnClose = () => {
        setIsOpen(false);
        
      }
  return (
    <>
    <AddBrandModal
      isOpen={isOpen}
      onClose={handleOnClose}
    />
      <FormField
        name="brandId"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Brand</FormLabel>
            <Select
              disabled={loading}
              onValueChange={field.onChange}
              defaultValue={field.value}
              value={field.value}
            >
              <SelectTrigger>
                <FormControl>
                  <SelectValue placeholder="Select brand" />
                </FormControl>
              </SelectTrigger>
              <SelectContent>
                {brands?.map((brand) => (
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
