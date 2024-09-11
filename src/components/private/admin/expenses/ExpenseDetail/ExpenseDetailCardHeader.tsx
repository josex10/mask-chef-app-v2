import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { convertDateToStandard } from "@/utils/helpers/dates";
import { cutExpenseClave } from "@/utils/helpers/expenses";
import { DialogExpensePayment } from "../DialogExpensePayment";
import { Badge } from "@/components/ui/badge";
import { ICustomSingleExpense } from "@/utils/interfaces/private/admin/customSingleExpense";

const ExpenseDetailCardHeader = ({
  clave,
  fechaEmision,
  isPaid,
}: ICustomSingleExpense) => {
  return (
    <CardHeader className="flex flex-row items-start bg-muted/50 w-full ">
      <div className="grid gap-0.5 w-full">
        <CardTitle className="text-lg">Detalle del Gasto</CardTitle>
        <Separator className="my-2" />
        <CardDescription>{cutExpenseClave(clave)}</CardDescription>
        <CardDescription className="flex flex-row justify-between">
          <p>Fecha: {convertDateToStandard(String(fechaEmision))}</p>
          <div>
            {isPaid ? (
              <Badge className="text-xs text-center" variant="default">
                Pagado
              </Badge>
            ) : (
              <DialogExpensePayment />
            )}
          </div>
        </CardDescription>
      </div>
      {/* <div className="ml-auto flex items-center gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="outline" className="h-8 w-8">
              <MoreVertical className="h-3.5 w-3.5" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <DialogExpensePayment />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>Eliminar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div> */}
    </CardHeader>
  );
};

export default ExpenseDetailCardHeader;
