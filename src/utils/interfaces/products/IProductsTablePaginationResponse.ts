import { IProductsTable } from "./IProductsTable";

export interface IProductsTablePaginationResponse {
  records: IProductsTable[];
  totalCount: number;
}
