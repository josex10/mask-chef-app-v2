import ProductsFilterForm from "./ProductFilterForm";
import { IComboboxOption } from "@/utils/interfaces/shared/IComboboxOption";
import { selectProvidersForComboboxOption } from "@/lib/actions/private/admin/providers/ActionProvidersSelect";
import { selectProductsCategoriesForComboboxOption } from "@/lib/actions/private/admin/products/categories/ActionProductCategoriesSelect";
import { selectProductsUnitOfMeasureForComboboxOption } from "@/lib/actions/private/admin/products/unitOfMeasure/ActionProductUnitOfMeasureSelect";
import { selectProductsForComboboxOption } from "@/lib/actions/private/admin/products/ActionProductSelect";

const ProductFilterWrapper = async () => {
  const products = await selectProductsForComboboxOption();
  const providers = await selectProvidersForComboboxOption();
  const categories = await selectProductsCategoriesForComboboxOption();
  const unitOfMeasures = await selectProductsUnitOfMeasureForComboboxOption();
  if (providers.error || categories.error || unitOfMeasures.error) {
    //TODO: handle error - Create a component error to handle error from the data server
    return "error";
  }
  return (
    <>
      <ProductsFilterForm
        products={products.data as IComboboxOption[]}
        categories={categories.data as IComboboxOption[]}
        providers={providers.data as IComboboxOption[]}
        unitOfMeasures={unitOfMeasures.data as IComboboxOption[]}
      />
    </>
  );
};
export default ProductFilterWrapper;
