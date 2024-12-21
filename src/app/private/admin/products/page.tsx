import ProductFilterSkeleton from "@/components/private/admin/products/productFilter/ProductFilterSkeleton";
import ProductFilterWrapper from "@/components/private/admin/products/productFilter/ProductFilterWrapper";
import ProductTableWrapper from "@/components/private/admin/products/productTable/ProductTableWrapper";
import { DataTableSkeleton } from "@/lib/shared/DataTable";
import { Suspense } from "react";

const Products = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  return (
    <section>
      <Suspense fallback={<ProductFilterSkeleton />}>
        <ProductFilterWrapper />
      </Suspense>
      <div>
        <Suspense fallback={<DataTableSkeleton />}>
          <ProductTableWrapper searchParams={searchParams} />
        </Suspense>
      </div>
    </section>
  );
};

export default Products;
