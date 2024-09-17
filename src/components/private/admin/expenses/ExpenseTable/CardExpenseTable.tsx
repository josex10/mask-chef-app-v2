"use client";

import { Card, CardContent } from "@/components/ui/card";
import { getAllExpenses } from "@/lib/actions/private/admin/expenses/GetExpensesActions";
import { useQuery } from "@tanstack/react-query";

import { IGroupExpenseTable } from "@/utils/interfaces/private/admin/customGroupExpenseTable";
import SkeletonTable from "@/components/shared/Skeletons/SkeletonTable";
import SharedCenterMessage from "@/components/shared/SharedCenterMessage";
import ExpenseTablePagination from "./ExpenseTablePagination";
import {
  useGetExpenseTableQueryClientKey,
  useGetExpensesQueryParams,
} from "@/utils/helpers/expenses";
import ExpenseTableHeader from "./ExpenseTableHeader";
import ExpenseTableBody from "./ExpenseTableBody";

const CardExpenseTable = () => {
  const { startDate, endDate, expenseId } = useGetExpensesQueryParams();

  const { data: expenses, isLoading } = useQuery<string | null>({
    queryKey: useGetExpenseTableQueryClientKey({
      startDate,
      endDate,
      expenseId,
    }),
    queryFn: async () =>
      await getAllExpenses({ startDate, endDate, expenseId }),
  });

  if (isLoading) return <SkeletonTable />;
  const expensesData = expenses
    ? (JSON.parse(expenses) as IGroupExpenseTable[])
    : [];
  return (
    <Card className="h-[55vh] overflow-y-auto">
      <CardContent>
        <ExpenseTableHeader />
        {!expensesData || expensesData.length === 0 ? (
          <SharedCenterMessage message="Sin Resultados" />
        ) : (
          <ExpenseTableBody expensesData={expensesData} />
        )}

        {!expensesData ||
          (expensesData.length > 10 && <ExpenseTablePagination />)}
      </CardContent>
    </Card>
  );
};

export default CardExpenseTable;
