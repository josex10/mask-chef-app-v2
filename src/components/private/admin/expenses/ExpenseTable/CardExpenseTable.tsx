"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CardExpenseTableRow from "./CardExpenseTableRow";
import { getAllExpenses } from "@/lib/actions/private/admin/expenses/GetExpensesActions";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import {
  checkUnixStringDateIsValid,
  getTodayOnUnixTime,
} from "@/utils/helpers/dates";

import { IExpenseFilter } from "@/utils/interfaces/private/admin/expenseFilter";
import { IGroupExpenseTable } from "@/utils/interfaces/private/admin/customGroupExpenseTable";
import SkeletonTable from "@/components/shared/Skeletons/SkeletonTable";
import SharedCenterMessage from "@/components/shared/SharedCenterMessage";

const CardExpenseTable = () => {
  const searchParams = useSearchParams();
  const dates = getTodayOnUnixTime();

  const startDate = checkUnixStringDateIsValid(searchParams.get("startDate"))
    ? Number(searchParams.get("startDate"))
    : dates.start;
  const endDate = checkUnixStringDateIsValid(searchParams.get("endDate"))
    ? Number(searchParams.get("endDate"))
    : dates.end;
  const invoiceKey = searchParams.get("invoiceKey") || null;
  const expenseId = searchParams.get("expenseId") || null;

  const expenseFilter: IExpenseFilter = {
    startDate: startDate,
    endDate: endDate,
    invoiceKey: invoiceKey,
  };

  const { data: expenses, isLoading } = useQuery<string | null>({
    queryKey: [
      "expensesTable",
      expenseFilter.startDate,
      expenseFilter.endDate,
      String(expenseFilter.invoiceKey),
    ],
    queryFn: async () => await getAllExpenses(expenseFilter),
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
                expenseId={expenseId}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CardExpenseTable;
