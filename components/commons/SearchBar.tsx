import React, { FC, useState } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  tableData: any;
  setTableData: (data: any) => void;
}

export function SearchBar({ tableData, setTableData }: SearchBarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.trim().toLowerCase();
    const filterdData = tableData.filter((item: any) =>
      item?.name.toLowerCase().includes(query) 
        || 
    item?.customerName.toLowerCase().includes(query)
    );
    setTableData(filterdData);
  };
  return (
    <div className="flex justify-center">
      <div
        className="
        flex 
        justify-between 
        px-5 
        py-1 
        rounded-md 
        items-center 
        w-full
        sm:w-1/2
        focus-visible-ring-2
        border-2
        "
      >
        <Search className="cursor-pointer" />
        <Input
          className="focus-visible:ring-0 border-0 focus-visible:ring-offset-0 "
          onChange={handleChange}
          placeholder="Type here to search..."
        />
      </div>
    </div>
  );
}

export default SearchBar;
