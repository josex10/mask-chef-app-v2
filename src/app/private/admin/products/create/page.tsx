import {
  ProductFormSkeleton,
  ProductFormWrapper,
} from "@/lib/products/ProductsForm";
import { EProductFormType } from "@/lib/products/ProductsForm/enums";
import React, { Suspense } from "react";

const ProductsCreatePage = () => {
  return (
    <>
      <div className="hidden w-full xl:block xl:max-w-96">
        <Suspense fallback={<ProductFormSkeleton />}>
          <ProductFormWrapper formType={EProductFormType.CREATE} />
        </Suspense>
      </div>
    </>
  );
};

export default ProductsCreatePage;
