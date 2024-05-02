"use client";
import { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";

interface IalertModalProps {
  isOpen: boolean;
  onConform: () => void;
  onClose: () => void;
  loading: boolean;
}

export const AlertModal: React.FC<IalertModalProps> = ({
  onConform,
  onClose,
  isOpen,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Modal
      title="Are you sure?"
      description="This action can't be undone"
      isOpen={isOpen}
      onClose={onClose}
    >
      {" "}
      <footer className="flex gap-5">
        <Button disabled={loading} variant="destructive" onClick={onConform}>
          Continue
        </Button>
        <Button disabled={loading} onClick={onClose}>
          Cancel
        </Button>
      </footer>
    </Modal>
  );
};
