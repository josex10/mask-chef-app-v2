import { ColumnDef } from "@tanstack/react-table";

export interface IDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalCount: number;
  showHideColumnsButton?: boolean;
  pageNumber?: number | undefined;
}
