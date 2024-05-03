"use client";
import React, { FC, useState } from "react";
import { Modal } from "../ui/modal";
import BrandFormDialog from "@/app/(dashboard)/[storeId]/(routes)/products/[productId]/components/BrandFormDialog";

interface AddBrandModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddBrandModal: FC<AddBrandModalProps> = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal description="" isOpen={isOpen} onClose={onClose} title="Add brand">
        <BrandFormDialog onClose={onClose} />
      </Modal>
    </>
  );
};

export default AddBrandModal;
