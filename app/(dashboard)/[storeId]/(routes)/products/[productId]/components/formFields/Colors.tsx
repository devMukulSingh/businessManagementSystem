import React, { FC, useState } from "react";
import { Iform } from "../ProductForm";
import {
  FormControl,
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
import { PlusCircle } from "lucide-react";
import AddColorModal from "@/components/modals/AddColorModal";
const Colors: FC<Iform> = ({ form, loading, colors }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOnClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <AddColorModal isOpen={isOpen} onClose={handleOnClose} />
      <FormField
        control={form.control}
        name="colorId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Color</FormLabel>
            <Select
              onValueChange={field.onChange}
              value={field.value}
              disabled={loading}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="SelectColor" />
                </SelectTrigger>
              </FormControl>

              <SelectContent>
                {colors?.map((color) => (
                  <SelectItem value={color.id} key={color.id}>
                    {color.name}
                  </SelectItem>
                ))}
                <Button
                  onClick={() => setIsOpen(true)}
                  variant="ghost"
                  className="flex gap-2 w-full justify-start"
                >
                  <PlusCircle />
                  Add Color
                </Button>
              </SelectContent>
              <FormMessage />
            </Select>
          </FormItem>
        )}
      ></FormField>
    </>
  );
};

export default Colors;
