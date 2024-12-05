import React from "react";
import ProductDataForm from "./ProductDataForm";
import { selectProvidersForComboboxOption } from "@/lib/actions/private/admin/providers/ActionProvidersSelect";
import { selectProductsCategoriesForComboboxOption } from "@/lib/actions/private/admin/products/categories/ActionProductCategoriesSelect";
import { selectProductsUnitOfMeasureForComboboxOption } from "@/lib/actions/private/admin/products/unitOfMeasure/ActionProductUnitOfMeasureSelect";
import { IComboboxOption } from "@/utils/interfaces/shared/IComboboxOption";

const ProductDataWrapper = async () => {
  const providers = await selectProvidersForComboboxOption();
  const categories = await selectProductsCategoriesForComboboxOption();
  const unitOfMeasures = await selectProductsUnitOfMeasureForComboboxOption();
  if (providers.error || categories.error || unitOfMeasures.error) {
    //TODO: handle error - Create a component error to handle error from the data server
    return "error";
  }

  return (
    <>
      <ProductDataForm
        categories={categories.data as IComboboxOption[]}
        providers={providers.data as IComboboxOption[]}
        unitOfMeasures={unitOfMeasures.data as IComboboxOption[]}
      />
    </>
  );
};

export default ProductDataWrapper;
