import React from "react";
import { Skeleton } from "../../../../../components/ui/skeleton";

const DashboardDataSkeleton = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-3">
      <Skeleton className="w-auto h-[135px]" />
      <Skeleton className="w-auto h-[135px]" />
      <Skeleton className="w-auto h-[135px]" />
    </section>
  );
};

export default DashboardDataSkeleton;
