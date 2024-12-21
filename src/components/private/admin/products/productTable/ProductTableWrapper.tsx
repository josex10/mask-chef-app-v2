"use server";
import { ProductTableColumns } from "./ProductTableColumns";
import { actionProductSelectFilter } from "@/lib/actions/private/admin/products/ActionProductSelectFilter";
import { IProductsTablePaginationResponse } from "@/utils/interfaces/products/IProductsTablePaginationResponse";
import { DataTable } from "@/lib/shared/DataTable";

const ProductTableWrapper = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { name, categories, providers, unitOfMeasures, page } =
    await searchParams;
  const pageParse = page ? parseInt(page as string) : undefined;
  const serverResponse = await actionProductSelectFilter({
    name,
    categories,
    providers,
    unitOfMeasures,
    page: pageParse,
  });
  if (serverResponse.error) {
    console.log("ERROR", serverResponse.message);
    return (
      <>
        <span>Error</span>
      </>
    );
  }
  const { records, totalCount } =
    serverResponse.data as IProductsTablePaginationResponse;

  return (
    // <section className="p-4 rounded-xl bg-muted/50">
    <DataTable
      columns={ProductTableColumns}
      data={records}
      totalCount={totalCount}
      pageNumber={pageParse}
    />
  );
};

export default ProductTableWrapper;
