import { Skeleton } from "@/components/ui/skeleton";

const SkeletonTable = () => {
  return (
    //className="max-h-[500px] mb-5 overflow-y-auto mt-2"
    <div className="flex flex-col space-y-12 justify-center max-h-[500px] mb-5 mt-2">
      <div className="space-y-3">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-80 w-full space-y-2" />
      </div>
    </div>
  );
};

export default SkeletonTable;