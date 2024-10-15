"use client";

import TextFieldForCurrency from "@/components/shared/TextFieldForCurrency";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { useCutExpenseClave } from "@/lib/hooks/expenses/expenses";
import { useExpenseDateTypeBasedOnParams } from "@/lib/hooks/expenses/useExpenseDateTypeBasedOnParams";
import { useHandleExpenseParams } from "@/lib/hooks/expenses/useExpenseHandleQueryParams";
import { EExpenseQueryParams } from "@/utils/enums/expenseQueryParams";
import { EExpenseFilterDateType } from "@/utils/enums/expensesEnums";
import { EQueryClientsKeys } from "@/utils/enums/queryClientKeys";
import {
  checkIfDateIsBeforeToday,
  convertDateToStandard,
} from "@/utils/helpers/dates";
import { IGroupExpenseTable } from "@/utils/interfaces/private/admin/customGroupExpenseTable";
import { useQueryClient } from "@tanstack/react-query";

type TCardExpenseProp = {
  expense: IGroupExpenseTable;
};

const CardExpenseTableRow = ({ expense }: TCardExpenseProp) => {
  const cutClave = useCutExpenseClave(expense.clave || "");
  const dateType = useExpenseDateTypeBasedOnParams();
  const queryClient = useQueryClient();
  const { fnSetParams, getActualParams } = useHandleExpenseParams();

  if (!expense) return;

  const selectedClass =
    getActualParams.expenseId && expense.id === getActualParams.expenseId
      ? "bg-muted/40"
      : "";

  const isOverdue = checkIfDateIsBeforeToday(expense.paymentExpirationDate);

  const fnHandleClick = (expenseId: string) => {
    fnSetParams([
      { key: EExpenseQueryParams.expenseId, value: expenseId },
    ]).then(() => {
      if (getActualParams.expenseId === expenseId) return;

      queryClient.refetchQueries({
        queryKey: [EQueryClientsKeys.singleExpense],
      });
    });
  };

  return (
    <TableRow
      onClick={() => fnHandleClick(expense.id)}
      className={selectedClass}
    >
      <TableCell className="w-[30vw] ">
        <div className="font-medium">{expense.providerName}</div>
        <div className="hidden text-sm text-muted-foreground md:inline">
          {cutClave}
        </div>
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        {expense.isPaid ? (
          <Badge className="text-xs" variant="default">
            Pagado
          </Badge>
        ) : (
          <Badge
            className="text-xs"
            variant={isOverdue ? "destructive" : "outline"}
          >
            Pendiente
          </Badge>
        )}
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        {dateType?.key === EExpenseFilterDateType.Created
          ? convertDateToStandard(String(expense.createdAt))
          : dateType?.key === EExpenseFilterDateType.Emision
          ? convertDateToStandard(String(expense.fechaEmision))
          : convertDateToStandard(String(expense.paymentExpirationDate))}
      </TableCell>
      <TableCell className="font-medium">
        <TextFieldForCurrency totalAmount={expense.totalComprobante} />
      </TableCell>
    </TableRow>
  );
};

export default CardExpenseTableRow;
