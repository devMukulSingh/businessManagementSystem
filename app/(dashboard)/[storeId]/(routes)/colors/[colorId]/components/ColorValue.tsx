import React, { FC, useState } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import { Iform } from "./ColorForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const ColorValue: FC<Iform> = ({ form, loading }) => {
  const[color,setColor ] = useColor("#000000")
  return (
    <FormField
      control={form.control}
      name="value"
      render={({ field }) => (
        <FormItem className="w-1/3">
          <FormLabel>Hex value</FormLabel>
          <FormControl>
            <ColorPicker
              hideInput={["rgb", "hsv"]}
              color={color}
              onChange={ (selected) => {
                console.log(selected);
                
                setColor(selected);
                field.onChange(selected.hex);
              }}
            />
 
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    ></FormField>
  );
};

export default ColorValue;
