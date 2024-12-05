"use client";
import { Table } from "@/components/ui/table";
import { DataTableBody, DataTableHeader, DataTablePagination } from ".";
import { useGetReactTableConfiguration } from "../hooks";
import { IDataTableProps } from "../interfaces";

export default function DataTable<TData, TValue>({
  columns,
  data,
  totalCount,
  pageNumber,
}: IDataTableProps<TData, TValue>) {
  const { tableConfig: table } = useGetReactTableConfiguration({
    data,
    columns,
  });

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <DataTableHeader table={table} />
          <DataTableBody table={table} columnsLength={columns.length} />
        </Table>
      </div>

      <DataTablePagination
        pageNumber={pageNumber}
        totalCount={totalCount}
        numberOfRows={data.length}
      />
    </div>
  );
}
