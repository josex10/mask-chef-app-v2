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
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { ExpensePaymentDetailSchema } from "@/utils/schemas/private/ExpensePaymentDetailSchema";
import { getExpensesPaymentType } from "@/lib/actions/private/admin/expenses/GetExpensesPaymentType";
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
import { addExpensePayment } from "@/lib/actions/private/admin/expenses/AddExpensePayment";
import toast from "react-hot-toast";
import {
  getExpenseTableQueryClientKey,
  getSingleExpenseQueryClientKey,
  useGetExpensesQueryParams,
} from "@/utils/helpers/expenses";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { cn } from "@/lib/utils";
import { IServerActionResponse } from "@/utils/interfaces/private/admin/serverActionResponse";
import { ICustomSingleExpense } from "@/utils/interfaces/private/admin/customSingleExpense";
import { IGroupExpenseTable } from "@/utils/interfaces/private/admin/customGroupExpenseTable";

const test = async () => {
  return await new Promise((resolve) => setTimeout(resolve, 3000));
};

export function DialogExpensePayment() {
  const queryClient = useQueryClient();
  const rest = useStoreAuth((state) => state.selectedRestaurant);
  const singleExpenseKey = getSingleExpenseQueryClientKey();
  const tableExpenseKey = getExpenseTableQueryClientKey();
  const { data, isLoading } = useQuery<string | null>({
    queryKey: ["expensePaymentType"],
    queryFn: async () => await getExpensesPaymentType(rest?.id),
  });
  const { expenseId } = useGetExpensesQueryParams();

  const [open, setOpen] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof ExpensePaymentDetailSchema>>({
    resolver: zodResolver(ExpensePaymentDetailSchema),
    defaultValues: {
      expense: expenseId || "",
      payment_type: "",
      referenceNumber: "",
      notes: "",
    },
  });

  if (isLoading) return <div>Loading...</div>;

  const handleAction = async (data: any) => {
    try {
      setIsLoading(true);

      const cacheData = queryClient.getQueryData<string | null>(
        singleExpenseKey
      );
      if (!cacheData) {
        toast.error("No se pudo obtener el gasto");
        setIsLoading(false);
        return;
      }

      const response = await addExpensePayment(data);
      const { error, message } = JSON.parse(response) as IServerActionResponse;

      if (error) {
        toast.error(message);
        setIsLoading(false);
        return;
      }

      const cacheExpense = JSON.parse(cacheData) as ICustomSingleExpense;
      cacheExpense.isPaid = true;
      const newCacheData = JSON.stringify(cacheExpense);
      queryClient.setQueryData<string | null>(singleExpenseKey, () => {
        return newCacheData;
      });

      const cacheTableData = queryClient.getQueryData<string | null>(
        tableExpenseKey
      );
      if (cacheTableData) {
        const cacheTable = JSON.parse(cacheTableData) as IGroupExpenseTable[];
        const newCacheTable = cacheTable.map((expense) => {
          if (expense.id === expenseId) {
            expense.isPaid = true;
          }
          return expense;
        });
        queryClient.setQueryData<string | null>(tableExpenseKey, () => {
          return JSON.stringify(newCacheTable);
        });
      }

      toast.success(message);
      setIsLoading(false);
      setOpen(false);
    } catch (error) {
      toast.error("Ocurrió un error al realizar la acción");
      setIsLoading(false);
    }
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
                        disabled={loading}
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
                          disabled={loading}
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
                          disabled={loading}
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
                {loading ? (
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
