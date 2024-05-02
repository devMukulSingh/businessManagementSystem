"use client";
import React, { FC, useState } from "react";
import { ProductColumn } from "./ProductColumn";
import { Button } from "./button";
import SellModal from "../modals/SellModal";

interface SellButtonProps {
  data: ProductColumn;
}

const SellButton: FC<SellButtonProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SellModal
        product={data}
        availableQuanity={data.quantity}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <Button onClick={() => setIsOpen(true)}>Sell</Button>
    </>
  );
};

export default SellButton;
