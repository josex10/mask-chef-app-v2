import {
  ProductFormSkeleton,
  ProductFormWrapper,
} from "@/lib/products/ProductsForm";
import { EProductFormType } from "@/lib/products/ProductsForm/enums";
import React, { Suspense } from "react";

const ProductEditPage = ({ params }: { params: { id: string } }) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex-1 p-4 h-full">
        <Suspense fallback={<ProductFormSkeleton />}>
          <ProductFormWrapper
            formType={EProductFormType.EDIT}
            productId={params.id}
          />
        </Suspense>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex-1 overflow-auto p-4">
          <h2 className="text-xl font-bold mb-4">Inventory</h2>
          <span>Working Progress...</span>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <h2 className="text-xl font-bold mb-4">Price History</h2>
          <span>Working Progress...</span>
        </div>
      </div>
    </section>
  );
};

export default ProductEditPage;
