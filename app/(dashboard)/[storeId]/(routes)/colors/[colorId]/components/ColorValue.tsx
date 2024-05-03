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

const ColorValue: FC<Iform> = ({ form, loading }) => {
  return (
    <FormField
      control={form.control}
      name="value"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Hex value</FormLabel>
          <FormControl>
            <Input
              disabled={loading}
              placeholder="value"
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

export default ColorValue;
