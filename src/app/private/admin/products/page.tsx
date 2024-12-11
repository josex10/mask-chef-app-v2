import ProductFilterSkeleton from "@/components/private/admin/products/productFilter/ProductFilterSkeleton";
import ProductFilterWrapper from "@/components/private/admin/products/productFilter/ProductFilterWrapper";
import ProductTableWrapper from "@/components/private/admin/products/productTable/ProductTableWrapper";
import { DataTableSkeleton } from "@/lib/components/shared/DataTable";
import { Suspense } from "react";

const Products = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  return (
    <section className="flex flex-1 flex-col shrink-0">
      <div className="">
        <Suspense fallback={<ProductFilterSkeleton />}>
          <ProductFilterWrapper />
        </Suspense>
      </div>
      <div className="">
        <Suspense fallback={<DataTableSkeleton />}>
          <ProductTableWrapper searchParams={searchParams} />
        </Suspense>
      </div>
    </section>
  );
};

export default Products;
