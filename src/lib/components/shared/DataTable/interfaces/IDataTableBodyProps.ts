import { Table } from "@tanstack/react-table";

export interface IDataTableBodyProps<TData> {
    table: Table<TData>;
    columnsLength: number;
  }