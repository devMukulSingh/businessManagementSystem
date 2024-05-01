"use client";
import { useAppDispatch } from "@/store/hooks";
import { setOpenSidebar } from "@/store/slice";
import { MenuIcon } from "lucide-react";

const Menu = () => {
  const dispatch = useAppDispatch();

  return (
    <MenuIcon
      className="lg:hidden"
      onClick={() => dispatch(setOpenSidebar())}
    />
  );
};

export default Menu;
