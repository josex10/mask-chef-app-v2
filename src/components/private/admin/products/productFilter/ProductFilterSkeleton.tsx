import { Skeleton } from "@/components/ui/skeleton";
const ProductFilterSkeleton = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
        <div className="flex flex-col gap-4 md:w-[60%] justify-center">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="flex flex-col gap-4 md:w-[40%] justify-center">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-4">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-16" />
      </div>
    </>
  );
};

export default ProductFilterSkeleton;
