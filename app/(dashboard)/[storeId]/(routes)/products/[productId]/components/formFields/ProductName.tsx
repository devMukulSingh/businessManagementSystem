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
import { Input } from '@/components/ui/input';

const ProductName:FC<Iform> = ({
    form,loading
}) => {
  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>product name</FormLabel>
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
    </>
  );
}

export default ProductName