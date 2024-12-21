import ProductsFilterForm from "./ProductFilterForm";
import { IComboboxOption } from "@/utils/interfaces/shared/IComboboxOption";
import { selectProductsForComboboxOption } from "@/lib/actions/private/admin/products/ActionProductSelect";
import { ActionSelectProviderForCombobox } from "@/lib/providers/actions";
import { ActionSelectCategoriesForCombobox } from "@/lib/products/actions/categories";
import { ActionSelectUnitOfMeasureForCombobox } from "@/lib/products/actions/unitOfMeasure";

const ProductFilterWrapper = async () => {
  const products = await selectProductsForComboboxOption();
  const providers = await ActionSelectProviderForCombobox();
  const categories = await ActionSelectCategoriesForCombobox();
  const unitOfMeasures = await ActionSelectUnitOfMeasureForCombobox();
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
