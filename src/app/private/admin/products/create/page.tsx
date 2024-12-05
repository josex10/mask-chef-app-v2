import ProductDataSkeleton from '@/components/private/admin/products/productData/ProductDataSkeleton'
import ProductDataWrapper from '@/components/private/admin/products/productData/ProductDataWrapper'
import React, { Suspense } from 'react'

const ProductsCreatePage = () => {
  return (
    <>
      <div className="hidden w-full xl:block xl:max-w-96">
        <Suspense fallback={<ProductDataSkeleton />}>
          <ProductDataWrapper />
        </Suspense>
      </div>
    </>
  )
}

export default ProductsCreatePage