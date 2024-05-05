import React, { FC } from "react";
import { Iform } from "./ColorForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const ColorName: FC<Iform> = ({ form, loading }) => {
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem className="w-1/3">
          <FormLabel>Color name</FormLabel>
          <FormControl>
            <Input
              disabled={loading}
              placeholder="name"
              {...field}
              autoComplete="off"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    ></FormField>
  );
};

export default ColorName;
