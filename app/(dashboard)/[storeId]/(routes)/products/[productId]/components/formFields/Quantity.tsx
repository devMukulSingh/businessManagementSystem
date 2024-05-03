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

const Quantity:FC<Iform> = ({
    form,loading
}) => {
  return (
    <>
      <FormField
        defaultValue={1}
        control={form.control}
        name="quantity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Quantity</FormLabel>
            <FormControl>
              <Input
                disabled={loading}
                placeholder="quantity"
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

export default Quantity