"use client";

import SharedCenterMessage from "@/components/shared/SharedCenterMessage";
import TextFieldForCurrency from "@/components/shared/TextFieldForCurrency";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { convertDateToStandard } from "@/utils/helpers/dates";
import { ICustomSingleExpense } from "@/utils/interfaces/private/admin/customSingleExpense";
import CardExpenseDetailSkeleton from "../Skeletons/CardExpenseDetailSkeleton";
import ExpenseDetailPaymentSection from "./ExpenseDetailPaymentSection";
import ExpenseDetailCardHeader from "./ExpenseDetailCardHeader";
import { useGetExpenseSingleData } from "@/lib/hooks/expenses/useExpenseSingle";

const CardExpenseDetail = () => {
  const { data: expense, isLoading, isFetching } = useGetExpenseSingleData();

  if (isLoading || isFetching) {
    return <CardExpenseDetailSkeleton />;
  }

  if (!expense) {
    return <SharedCenterMessage message="Seleccione un gasto" />;
  }

  const expenseData = JSON.parse(expense) as ICustomSingleExpense;

  return (
    <Card className="h-[88vh] overflow-y-auto">
      <ExpenseDetailCardHeader {...expenseData} />
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Detalle</div>
          <ul className="grid gap-3">
            {expenseData.lineDetails.map((line) => {
              return (
                <li className="flex items-center justify-between" key={line.id}>
                  <span className="text-muted-foreground">
                    {line.Detalle} x <span>{line.Cantidad}</span>
                  </span>
                  <TextFieldForCurrency totalAmount={line.SubTotal} />
                </li>
              );
            })}
          </ul>
          <Separator className="my-2" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <TextFieldForCurrency
                totalAmount={expenseData.expenseSummaryTotalVenta}
              />
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Descuento</span>
              <TextFieldForCurrency
                totalAmount={expenseData.expenseSummaryTotalDescuentos}
              />
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Impuesto</span>
              <TextFieldForCurrency
                totalAmount={expenseData.expenseSummaryTotalImpuesto}
              />
            </li>
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Total</span>
              <TextFieldForCurrency
                totalAmount={expenseData.expenseSummaryTotalComprobante}
              />
            </li>
          </ul>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Información del Proveedor</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Proveedor</dt>
              <dd>{expenseData.providerName}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Correo</dt>
              <dd className="text-right">
                <a href="mailto:">{expenseData.providerEmail}</a>
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Teléfono</dt>
              <dd>
                <a href="tel:">{expenseData.providerPhone}</a>
              </dd>
            </div>
          </dl>
        </div>
        {expenseData.paymentDetail && (
          <ExpenseDetailPaymentSection {...expenseData.paymentDetail} />
        )}
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Creado por {expenseData.createdByEmail} el{" "}
          {convertDateToStandard(String(expenseData.xataCreatedAt))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default CardExpenseDetail;
