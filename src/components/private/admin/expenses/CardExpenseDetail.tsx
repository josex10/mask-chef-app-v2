"use client";

import SharedCenterMessage from "@/components/shared/SharedCenterMessage";
import TextFieldForCurrency from "@/components/shared/TextFieldForCurrency";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { getSingleExpense } from "@/lib/actions/private/admin/expenses/GetExpensesActions";
import { convertDateToStandard } from "@/utils/helpers/dates";
import { ICustomSingleExpense } from "@/utils/interfaces/private/admin/customSingleExpense";
import { useQuery } from "@tanstack/react-query";
import { MoreVertical } from "lucide-react";
import { useSearchParams } from "next/navigation";
import CardExpenseDetailSkeleton from "./Skeletons/CardExpenseDetailSkeleton";
import { cutExpenseClave } from '../../../../utils/helpers/expenses';

const CardExpenseDetail = () => {
  const searchParams = useSearchParams();

  const expenseId = searchParams.get("expenseId");

  const { data: expense, isLoading } = useQuery<string | null>({
    queryKey: ["singleExpense", String(expenseId)],
    queryFn: async () => await getSingleExpense(expenseId),
  });

  if (isLoading) {
    return <CardExpenseDetailSkeleton />
  }

  if (!expense) {
    return  <SharedCenterMessage message="Seleccione un gasto" />;
  }

  const expenseData = JSON.parse(expense) as ICustomSingleExpense;

  return (
    <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="text-lg">Detalle del Gasto</CardTitle>
          <Separator className="my-2" />
          <CardDescription>{cutExpenseClave(expenseData.clave)}</CardDescription>
          <CardDescription>
            Fecha: {convertDateToStandard(String(expenseData.fechaEmision))}
          </CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline" className="h-8 w-8">
                <MoreVertical className="h-3.5 w-3.5" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem disabled>Export</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled>Trash</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
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
              <dd>
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
        {/* <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Payment Information</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-1 text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                Visa
              </dt>
              <dd>**** **** **** 4532</dd>
            </div>
          </dl>
        </div> */}
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
