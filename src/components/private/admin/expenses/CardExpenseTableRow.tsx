import TextFieldForCurrency from "@/components/shared/TextFieldForCurrency";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { convertDateToStandard } from "@/utils/helpers/dates";

const cutExpenseClave = (clave: string) => {
  if (!clave) return "N/A";
  if (clave.length > 30) {
    return `...${clave.slice(30)}`;
  }
  return clave;
};

const CardExpenseTableRow = ({ expense }: any) => {
  const totalAmount = expense.expenseSummary.TotalComprobante
    ? expense.expenseSummary.TotalComprobante
    : 0;

  return (
    <TableRow>
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
      {/* <TableCell className="text-right">
        {expense.createdBy.email ? expense.createdBy.email : "NA"}
      </TableCell> */}
    </TableRow>
  );
};

export default CardExpenseTableRow;
