"use client";

import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cutExpenseClave } from "@/utils/helpers/expenses";
import { Badge } from "@/components/ui/badge";
import { ICustomSingleExpense } from "@/utils/interfaces/private/admin/customSingleExpense";
import { ExpensePaymentDialog } from "../ExpensePayment/ExpensePaymentDialog";
import { ExpenseDetailDeleteExpenseDialog } from "./ExpenseDetailDeleteExpenseDialog";
import ExpenseDetailDateInput from "./ExpenseDetailDateInput";

const ExpenseDetailCardHeader = ({
  clave,
  fechaEmision,
  isPaid,
  expenseSummaryId,
  id,
  paymentExpirationDate
}: ICustomSingleExpense) => {
  return (
    <div className="sticky top-0 z-10 bg-background">
      <CardHeader className="flex flex-row items-start bg-muted/50 w-full ">
        <div className="grid gap-0.5 w-full">
          <CardTitle className="flex flex-row justify-between items-center">
            <span>Detalle del Gasto</span>
            <div className="flex flex-row gap-2">
              <ExpensePaymentDialog />
              <ExpenseDetailDeleteExpenseDialog
                expenseId={id}
                expenseSummaryId={expenseSummaryId}
              />
            </div>
          </CardTitle>
          <Separator className="my-2" />
          <CardDescription className="flex flex-row justify-between">
            <span className="font-bold">Clave: </span>
            <span>{cutExpenseClave(clave)}</span>
          </CardDescription>
          <div className="flex flex-row justify-between items-center">
            <CardDescription >
              <span className="font-bold">Fecha de Emisión: </span>
            </CardDescription>
            <ExpenseDetailDateInput expenseId={id}  isDisabled={true} initialDate={fechaEmision}/>
          </div>

          <div className="flex flex-row justify-between items-center">
            <CardDescription>
              <span className="font-bold">Fecha de Vencimiento: </span>
            </CardDescription>
            <ExpenseDetailDateInput expenseId={id} isDisabled={isPaid} initialDate={paymentExpirationDate}/>
          </div>

          <div className="flex flex-row justify-end">
            <div>
              {isPaid ? (
                <Badge className="text-xs text-center" variant="default">
                  Pagado
                </Badge>
              ) : (
                <Badge className="text-xs text-center" variant="outline">
                  Pendiente
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
    </div>
  );
};

export default ExpenseDetailCardHeader;
