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
    <section className="flex w-full xl:flex-row">
      <div className="w-full">
        <Suspense fallback={<ProductFilterSkeleton />}>
          <ProductFilterWrapper />
        </Suspense>
        <Suspense fallback={<DataTableSkeleton />}>
          <ProductTableWrapper searchParams={searchParams} />
        </Suspense>
      </div>
    </section>
  );
};

export default Products;
