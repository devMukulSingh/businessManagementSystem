import React, { FC } from 'react'
import { Iform } from '../ProductForm';
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
const Colors:FC<Iform> = ({
    form,loading,colors
}) => {
  return (
    <>
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
              </SelectContent>
              <FormMessage />
            </Select>
          </FormItem>
        )}
      ></FormField>
    </>
  );
}

export default Colors