"use client";

import TextFieldForCurrency from "@/components/shared/TextFieldForCurrency";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { convertDateToStandard } from "@/utils/helpers/dates";
import { cutExpenseClave } from "@/utils/helpers/expenses";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const CardExpenseTableRow = ({ expense }: any) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  const totalAmount = expense.expenseSummary.TotalComprobante
    ? expense.expenseSummary.TotalComprobante
    : 0;

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

  return (
    <TableRow onClick={handleOnClick}>
      <TableCell>
        <div className="font-medium">
          {expense.provider.name ? expense.provider.name : "N/A"}
        </div>
        <div className="hidden text-sm text-muted-foreground md:inline">
          {cutExpenseClave(expense.clave)}
        </div>
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        <Badge className="text-xs" variant="secondary">
          Crédito
        </Badge>
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        <Badge className="text-xs" variant="secondary">
          Cancelado
        </Badge>
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        {expense.fechaEmision
          ? convertDateToStandard(String(expense.fechaEmision))
          : "NA"}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <TextFieldForCurrency totalAmount={totalAmount} />
      </TableCell>
    </TableRow>
  );
};

export default CardExpenseTableRow;
