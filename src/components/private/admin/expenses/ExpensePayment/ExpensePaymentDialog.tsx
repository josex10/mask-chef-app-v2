"use client";

import { CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { ExpensePaymentDetailSchema } from "@/utils/schemas/private/ExpensePaymentDetailSchema";

import useStoreAuth from "@/store/private/admin/auth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IExpensePaymentType } from "@/utils/interfaces/private/admin/expensePaymentType";
import { useState } from "react";
import { useGetExpensesQueryParams } from "@/utils/helpers/expenses";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { cn } from "@/lib/utils";
import { useGetExpensePaymentData } from "@/lib/hooks/expenses/useExpensePaymentType";
import { useExpenseAddPayment } from "@/lib/hooks/expenses/useExpenseAddPayment";

export function ExpensePaymentDialog() {
  const [open, setOpen] = useState(false);
  const userLogged = useStoreAuth((state) => state.user);
  const { expenseId } = useGetExpensesQueryParams();
  const {
    data,
    isLoading: isLoadingPayment,
    isFetching: isFetchingPayment,
  } = useGetExpensePaymentData();

  const mutation = useExpenseAddPayment();

  const form = useForm<z.infer<typeof ExpensePaymentDetailSchema>>({
    resolver: zodResolver(ExpensePaymentDetailSchema),
    defaultValues: {
      expense: expenseId || "",
      payment_type: "",
      referenceNumber: "",
      notes: "",
      payedBy: userLogged?.id || "",
    },
  });

  //TODO: CREATER A SKELETOR FOR THIS FORM
  if (isLoadingPayment || isFetchingPayment) return <div>Loading...</div>;

  const handleAction = async (data: any) => {
    mutation.mutate(data, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  const paymentTypes = data ? (JSON.parse(data) as IExpensePaymentType[]) : [];

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="h-8 gap-1"
          variant="ghost"
          onClick={() => setOpen(true)}
        >
          <CreditCard className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Pagar
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Pagar Gasto</DialogTitle>
          <DialogDescription>Formulario de pago</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleAction)}
              className="flex flex-col gap-6 px-4 py-4 mx-2 bg-content2 rounded-lg w-full sm:w-96"
            >
              <div className="grid items-center">
                <FormField
                  control={form.control}
                  name="payment_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>* Tipo de Pago</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={mutation.isPending}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione un tipo de pago" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {paymentTypes?.map((type) => (
                            <SelectItem key={type.id} value={type.id}>
                              {type.type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid items-center">
                <FormField
                  control={form.control}
                  name="referenceNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Número de Referencia
                        <span className="text-xs text-gray-400 ml-1">
                          (opcional)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={mutation.isPending}
                          placeholder="Ex: 123456789"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid items-center">
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Notas spam
                        <span className="text-xs text-gray-400 ml-1">
                          (opcional)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={mutation.isPending}
                          placeholder="Ex:Pago de gasto de la semana pasada"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter className="sm:justify-end">
                {mutation.isPending ? (
                  <div className="flex justify-center w-full">
                    <LoadingSpinner className={cn("text-gray-500")} />
                  </div>
                ) : (
                  <div className="flex w-full max-w-sm items-center justify-end space-x-2">
                    <Button type="submit" variant="default">
                      Pagar
                    </Button>
                    <DialogClose asChild>
                      <Button
                        type="button"
                        onClick={() => setOpen(false)}
                        variant="secondary"
                      >
                        Cerrar
                      </Button>
                    </DialogClose>
                  </div>
                )}
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
