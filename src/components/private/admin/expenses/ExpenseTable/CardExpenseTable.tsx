"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CardExpenseTableRow from "./CardExpenseTableRow";
import { getAllExpenses } from "@/lib/actions/private/admin/expenses/GetExpensesActions";
import { useQuery } from "@tanstack/react-query";

import { IGroupExpenseTable } from "@/utils/interfaces/private/admin/customGroupExpenseTable";
import SkeletonTable from "@/components/shared/Skeletons/SkeletonTable";
import SharedCenterMessage from "@/components/shared/SharedCenterMessage";
import ExpenseTablePagination from "./ExpenseTablePagination";
import { getExpenseTableQueryClientKey, useGetExpensesQueryParams } from "@/utils/helpers/expenses";

const CardExpenseTable = () => {
  const { startDate, endDate, expenseId } = useGetExpensesQueryParams();

  const { data: expenses, isLoading } = useQuery<string | null>({
    queryKey: getExpenseTableQueryClientKey(),
    queryFn: async () =>
      await getAllExpenses({ startDate, endDate, expenseId }),
  });

  if (isLoading) return <SkeletonTable />;

  if (!expenses) {
    return <SharedCenterMessage message="Sin Resultados" />;
  }

  const expensesData = JSON.parse(expenses) as IGroupExpenseTable[];

  if (!expensesData || expensesData.length === 0) {
    return <SharedCenterMessage message="Sin Resultados" />;
  }

  return (
    <Card>
      <CardContent>
        <Table className="z-0">
          <TableHeader>
            <TableRow>
              <TableHead>Proveedor</TableHead>
              <TableHead className="hidden sm:table-cell">Estado</TableHead>
              <TableHead className="hidden md:table-cell">Fecha</TableHead>
              <TableHead className="table-cell">Monto</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expensesData.map((expense, index) => (
              <CardExpenseTableRow
                key={index}
                expense={expense}
              />
            ))}
          </TableBody>
          {/* <TableFooter>
            <ExpenseTablePagination />
          </TableFooter> */}
        </Table>
      </CardContent>
    </Card>
  );
};

export default CardExpenseTable;
