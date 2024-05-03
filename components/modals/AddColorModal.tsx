"use client";
import React, { FC, useState } from "react";
import { Modal } from "../ui/modal";
import ColorFormDialog from "@/app/(dashboard)/[storeId]/(routes)/products/[productId]/components/ColorFormDialog";

interface AddColorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddColorModal: FC<AddColorModalProps> = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal description="" isOpen={isOpen} onClose={onClose} title="Add brand">
        <ColorFormDialog onClose={onClose} />
      </Modal>
    </>
  );
};

export default AddColorModal;
