"use client";

import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { convertDateToStandard } from "@/utils/helpers/dates";
import { cutExpenseClave } from "@/utils/helpers/expenses";
import { Badge } from "@/components/ui/badge";
import { ICustomSingleExpense } from "@/utils/interfaces/private/admin/customSingleExpense";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { ExpensePaymentDialog } from "../ExpensePayment/ExpensePaymentDialog";
import { ExpenseDetailPaymentDialog } from "./ExpenseDetailPaymentDialog";

const ExpenseDetailCardHeader = ({
  clave,
  fechaEmision,
  isPaid,
  expenseSummaryId,
  id,
}: ICustomSingleExpense) => {
  
  return (
    <div className="sticky top-0 z-10 bg-background">
      <CardHeader className="flex flex-row items-start bg-muted/50 w-full ">
        <div className="grid gap-0.5 w-full">
          <CardTitle className="flex flex-row justify-between items-center">
            <span>Detalle del Gasto</span>
            <ExpenseDetailPaymentDialog expenseId={id} expenseSummaryId={expenseSummaryId}/>
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
                <ExpensePaymentDialog />
              )}
            </div>
          </div>
        </div>
      </CardHeader>
    </div>
  );
};

export default ExpenseDetailCardHeader;
