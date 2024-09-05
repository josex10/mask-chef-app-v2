"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

const CardExpenseTable = () => {
  const searchParams = useSearchParams();
  const dates = getTodayOnUnixTime();

  const startDate = checkUnixStringDateIsValid(searchParams.get("startDate"))
    ? Number(searchParams.get("startDate"))
    : dates.start;
  const endDate = checkUnixStringDateIsValid(searchParams.get("endDate"))
    ? Number(searchParams.get("endDate"))
    : dates.end;

  const expenseFilter: IExpenseFilter = {
    startDate: startDate,
    endDate: endDate,
    invoiceKey: searchParams.get("invoiceKey") || null,
  };

  console.log({ expenseFilter });

  const { data: expenses, isLoading } = useQuery<string | null>({
    queryKey: [
      "expensesTable",
      expenseFilter.startDate,
      expenseFilter.endDate,
      String(expenseFilter.invoiceKey),
    ],
    queryFn: async () => await getAllExpenses(expenseFilter),
    select: (data) => (data ? JSON.parse(data) : []),
  });

  //TODO: CREATE A LOCADING SKELLETON COMPONENT FOR THIS
  if (isLoading) return <div>Loading...</div>;

  //TODO: CREATE A EMPTY COMPONENT FOR THIS
  if (!expenses || expenses.length === 0)
    return <div>No hay gastos registrados</div>;

  return (
    <Card x-chunk="dashboard-05-chunk-3">
      {/* <CardHeader className="px-7">
        <CardTitle>Gastos</CardTitle>
        <CardDescription>
          Ultimos gastos registrados en el sistema.
        </CardDescription>
      </CardHeader> */}
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Gasto</TableHead>
              <TableHead className="hidden sm:table-cell">Tipo</TableHead>
              <TableHead className="hidden sm:table-cell">Estado</TableHead>
              <TableHead className="hidden md:table-cell">Fecha</TableHead>
              <TableHead className="table-cell">Monto</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense, index) => (
              <CardExpenseTableRow key={index} expense={expense} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CardExpenseTable;
