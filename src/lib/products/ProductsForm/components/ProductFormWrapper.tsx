"use server";

import ProductForm from "./ProductForm";
import { IComboboxOption } from "@/utils/interfaces/shared/IComboboxOption";
import { IProductFormWrapperProps } from "../interfaces";
import { ActionSelectCategoriesForCombobox } from "../../actions/categories";
import { ActionSelectProviderForCombobox } from "@/lib/providers/actions";
import { ActionSelectUnitOfMeasureForCombobox } from "../../actions/unitOfMeasure";
import { ActionSelectProductById } from "../../actions/products";
import { IProduct } from "../../interfaces";

const ProductFormWrapper = async ({
  formType,
  productId,
}: IProductFormWrapperProps) => {
  const providers = await ActionSelectProviderForCombobox();
  const categories = await ActionSelectCategoriesForCombobox();
  const unitOfMeasures = await ActionSelectUnitOfMeasureForCombobox();
  const product =
    (productId && (await ActionSelectProductById(productId))) || null;
  if (
    providers.error ||
    categories.error ||
    unitOfMeasures.error ||
    (product && product.error)
  ) {
    //TODO: handle error - Create a component error to handle error from the data server
    return "error";
  }

  return (
    <>
      <ProductForm
        categories={categories.data as IComboboxOption[]}
        providers={providers.data as IComboboxOption[]}
        unitOfMeasures={unitOfMeasures.data as IComboboxOption[]}
        formType={formType}
        product={product ? product.data : null}
      />
    </>
  );
};

export default ProductFormWrapper;
