import { Skeleton } from "@/components/ui/skeleton";

const CardExpenseDetailSkeleton = () => {
  return (
    <div className="flex flex-col space-y-12 justify-center">
      <div className="space-y-1">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-80 w-full space-y-2" />
        <Skeleton className="h-12 w-full space-y-2" />
      </div>
    </div>
  );
};

export default CardExpenseDetailSkeleton;