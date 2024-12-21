import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const DataTableSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 w-full">
     <Skeleton className="h-16 w-full" />
     <Skeleton className="h-60 w-full" />
    </div>
  );
};

export default DataTableSkeleton;
