"use client";

import TextFieldForCurrency from "@/components/shared/TextFieldForCurrency";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { useRouterPush } from "@/lib/hooks/shared/useRouterPush";
import { EQueryClientsKeys } from "@/utils/enums/queryClientKeys";
import {
  checkIfDateIsBeforeToday,
  convertDateToStandard,
} from "@/utils/helpers/dates";
import {
  cutExpenseClave,
  generateExpensePath,
  useGetExpensesQueryParams,
} from "@/utils/helpers/expenses";
import { IGroupExpenseTable } from "@/utils/interfaces/private/admin/customGroupExpenseTable";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

type TCardExpenseProp = {
  expense: IGroupExpenseTable;
};

const CardExpenseTableRow = ({ expense }: TCardExpenseProp) => {
  const pathName = usePathname();
  const { startDate, endDate, expenseId, offset } = useGetExpensesQueryParams();
  const routerPuskHook = useRouterPush();
  const queryClient = useQueryClient();

  if (!expense) return;

  const handleOnClick = () => {
    const newUrl = `${pathName}${generateExpensePath(
      startDate,
      endDate,
      expense.id, 
      offset
    )}`;
    routerPuskHook(newUrl).then(() => {
      if (expenseId === expense.id) return;
      queryClient.refetchQueries({
        queryKey: [EQueryClientsKeys.singleExpense],
      });
    });
  };

  const selectedClass =
    expenseId && expense.id === expenseId ? "bg-muted/40" : "";

  const isOverdue = checkIfDateIsBeforeToday(expense.paymentExpirationDate);

  return (
    <TableRow onClick={handleOnClick} className={selectedClass}>
      <TableCell className="w-[30vw] ">
        <div className="font-medium">{expense.providerName}</div>
        <div className="hidden text-sm text-muted-foreground md:inline">
          {cutExpenseClave(expense.clave)}
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
        {convertDateToStandard(String(expense.fechaEmision))}
      </TableCell>
      <TableCell className="font-medium">
        <TextFieldForCurrency totalAmount={expense.totalComprobante} />
      </TableCell>
    </TableRow>
  );
};

export default CardExpenseTableRow;
