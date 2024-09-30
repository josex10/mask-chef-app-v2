"use client";

import TextFieldForCurrency from "@/components/shared/TextFieldForCurrency";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { useCutExpenseClave } from "@/lib/hooks/expenses/expenses";
import { useHandleExpenseParams } from "@/lib/hooks/expenses/useExpenseHandleQueryParams";
import { EExpenseQueryParams } from "@/utils/enums/expenseQueryParams";
import { EQueryClientsKeys } from "@/utils/enums/queryClientKeys";
import {
  checkIfDateIsBeforeToday,
  convertDateToStandard,
} from "@/utils/helpers/dates";
import { IGroupExpenseTable } from "@/utils/interfaces/private/admin/customGroupExpenseTable";
import { useQueryClient } from "@tanstack/react-query";

type TCardExpenseProp = {
  expense: IGroupExpenseTable;
  showCreatedAt: boolean;
};

const CardExpenseTableRow = ({ expense, showCreatedAt }: TCardExpenseProp) => {
  const queryClient = useQueryClient();
  const { getActualParams, useSetActualParams } = useHandleExpenseParams();
  const cutClave = useCutExpenseClave(expense.clave || "");

  if (!expense) return;

  const useHandleOnClick = () => {
    useSetActualParams([
      { key: EExpenseQueryParams.expenseId, value: expense.id },
    ]).then(() => {
      if (getActualParams.expenseId === expense.id) return;

      queryClient.refetchQueries({
        queryKey: [EQueryClientsKeys.singleExpense],
      });
    });
  };

  const selectedClass =
    getActualParams.expenseId && expense.id === getActualParams.expenseId
      ? "bg-muted/40"
      : "";

  const isOverdue = checkIfDateIsBeforeToday(expense.paymentExpirationDate);

  return (
    <TableRow onClick={useHandleOnClick} className={selectedClass}>
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
        {showCreatedAt
          ? convertDateToStandard(String(expense.createdAt))
          : convertDateToStandard(String(expense.fechaEmision))}
      </TableCell>
      <TableCell className="font-medium">
        <TextFieldForCurrency totalAmount={expense.totalComprobante} />
      </TableCell>
    </TableRow>
  );
};

export default CardExpenseTableRow;
