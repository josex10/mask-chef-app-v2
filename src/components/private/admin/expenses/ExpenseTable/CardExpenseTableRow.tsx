"use client";

import TextFieldForCurrency from "@/components/shared/TextFieldForCurrency";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { convertDateToStandard } from "@/utils/helpers/dates";
import { cutExpenseClave, getExpensesQueryParams } from "@/utils/helpers/expenses";
import { IGroupExpenseTable } from "@/utils/interfaces/private/admin/customGroupExpenseTable";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type TCardExpenseProp = {
  expense: IGroupExpenseTable
};

const CardExpenseTableRow = ({ expense }: TCardExpenseProp) => {
  const router = useRouter();
  const pathName = usePathname();
  const { startDate, endDate, expenseId } = getExpensesQueryParams();


  const handleOnClick = () => {
    if (startDate || endDate) {
      router.push(
        `${pathName}?startDate=${startDate}&endDate=${endDate}&expenseId=${expense.id}`,
        { scroll: false }
      );
      return;
    }
    router.push(`${pathName}?expenseId=${expense.id}`, { scroll: false });
  };

  const selectedClass =
    expenseId && expense.id === expenseId ? "bg-muted/40" : "";

  return (
    <TableRow onClick={handleOnClick} className={selectedClass}>
      <TableCell>
        <div className="font-medium">{expense.providerName}</div>
        <div className="hidden text-sm text-muted-foreground md:inline">
          {cutExpenseClave(expense.clave)}
        </div>
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        <Badge className="text-xs" variant="secondary">
          Cancelado
        </Badge>
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
