"use client";

import { Card, CardContent } from "@/components/ui/card";
import { IGroupExpenseTable } from "@/utils/interfaces/private/admin/customGroupExpenseTable";
import SkeletonTable from "@/components/shared/Skeletons/SkeletonTable";
import SharedCenterMessage from "@/components/shared/SharedCenterMessage";
import ExpenseTablePagination from "./ExpenseTablePagination";
import ExpenseTableHeader from "./ExpenseTableHeader";
import ExpenseTableBody from "./ExpenseTableBody";
import { useGetExpenseTableData } from "@/lib/hooks/expenses/useExpenseTable";

const CardExpenseTable = () => {
  const { data: expenses, isLoading, isFetching } = useGetExpenseTableData();

  if (isLoading || isFetching) return <SkeletonTable />;

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
