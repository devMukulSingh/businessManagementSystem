import React, { FC } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Iform } from './BrandForm';

const BrandField:FC<Iform> = ({
    form,loading
}) => {
  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Brand name</FormLabel>
            <FormControl>
              <Input
                disabled={loading}
                placeholder="brand"
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

export default BrandField