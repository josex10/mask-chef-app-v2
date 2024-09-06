import { Skeleton } from "@/components/ui/skeleton";

const CardExpenseFinatialInfoSkeleton = () => {
  return (
    <div className="flex flex-col space-y-8 justify-center">
      <div className="space-y-3">
        <Skeleton className="h-3 w-[100px]" />
        <Skeleton className="h-10 w-[200px]" />
        <Skeleton className="h-1 w-[100px]" />
        <Skeleton className="h-4 w-[200px] space-y-2" />
      </div>
    </div>
  );
};

export default CardExpenseFinatialInfoSkeleton;
