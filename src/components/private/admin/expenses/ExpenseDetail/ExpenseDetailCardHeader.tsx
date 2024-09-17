"use client";

import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { convertDateToStandard } from "@/utils/helpers/dates";
import {
  cutExpenseClave,
  useGetExpensesQueryParams,
  useGetExpenseTableQueryClientKey,
  useGetSingleExpenseQueryClientKey,
} from "@/utils/helpers/expenses";
import { DialogExpensePayment } from "../DialogExpensePayment";
import { Badge } from "@/components/ui/badge";
import { ICustomSingleExpense } from "@/utils/interfaces/private/admin/customSingleExpense";
import { Button } from "@/components/ui/button";
import { deleteExpenseAction } from "@/lib/actions/private/admin/expenses/DeleteExpenseAction";
import { IServerActionResponse } from "@/utils/interfaces/private/admin/serverActionResponse";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { IGroupExpenseTable } from "@/utils/interfaces/private/admin/customGroupExpenseTable";
import { Trash2 } from "lucide-react";

const ExpenseDetailCardHeader = ({
  clave,
  fechaEmision,
  isPaid,
  expenseSummaryId,
  id,
}: ICustomSingleExpense) => {
  const queryClient = useQueryClient();
  const { startDate, endDate, expenseId } = useGetExpensesQueryParams();
  const singleExpenseKey = useGetSingleExpenseQueryClientKey({
    startDate,
    endDate,
    expenseId,
  });
  const tableExpenseKey = useGetExpenseTableQueryClientKey({
    startDate,
    endDate,
    expenseId,
  });

  const handleDelete = async () => {
    const result = await deleteExpenseAction({
      expenseId: id,
      expenseSummaryId: expenseSummaryId,
    });
    const { error, message } = JSON.parse(result) as IServerActionResponse;
    if (error) {
      toast.error(message);
      return;
    }
    queryClient.setQueryData<string | null>(singleExpenseKey, () => {
      return null;
    });

    const cacheTableData = queryClient.getQueryData<string | null>(
      tableExpenseKey
    );
    if (cacheTableData) {
      const cacheTable = JSON.parse(cacheTableData) as IGroupExpenseTable[];
      const newCacheTable = cacheTable.map((expense) => {
        if (expense.id !== expenseId) {
          return expense;
        }
      });

      queryClient.setQueryData<string | null>(tableExpenseKey, () => {
        if (newCacheTable.length === 0) {
          return null;
        }
        return JSON.stringify(newCacheTable);
      });
    }
    toast.success(message);
  };
  return (
    <div className="sticky top-0 z-10 bg-background">
      <CardHeader className="flex flex-row items-start bg-muted/50 w-full ">
        <div className="grid gap-0.5 w-full">
          <CardTitle className="flex flex-row justify-between items-center">
            <span>Detalle del Gasto</span>
            <Button onClick={handleDelete} variant="destructive" size="sm">
              <Trash2 size={16} />
            </Button>
          </CardTitle>
          <Separator className="my-2" />
          <CardDescription>{cutExpenseClave(clave)}</CardDescription>
          <div className="flex flex-row justify-between">
            <div>Fecha: {convertDateToStandard(String(fechaEmision))}</div>
            <div>
              {isPaid ? (
                <Badge className="text-xs text-center" variant="default">
                  Pagado
                </Badge>
              ) : (
                <DialogExpensePayment />
              )}
            </div>
          </div>
        </div>
      </CardHeader>
    </div>
  );
};

export default ExpenseDetailCardHeader;
