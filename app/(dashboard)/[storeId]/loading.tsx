import { Loader2Icon } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <div className="justify-center mt-10 flex w-full h-screen">
      <Loader2Icon className="animate-spin" />
    </div>
  );
};

export default loading;
