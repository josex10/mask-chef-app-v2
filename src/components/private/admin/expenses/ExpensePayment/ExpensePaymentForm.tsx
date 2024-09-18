import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useExpenseAddPayment } from "@/lib/hooks/expenses/useExpenseAddPayment";
import { useGetExpensePaymentData } from "@/lib/hooks/expenses/useExpensePaymentType";
import useStoreAuth from "@/store/private/admin/auth";
import useStoreExpenseDetailPaymentDialog from "@/store/private/expenses/storeExpenseDetailPaymentDialog";
import { useGetExpensesQueryParams } from "@/utils/helpers/expenses";
import { IExpensePaymentType } from "@/utils/interfaces/private/admin/expensePaymentType";
import { ExpensePaymentDetailSchema } from "@/utils/schemas/private/ExpensePaymentDetailSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ExpensePaymentForm = () => {
  const { expenseId } = useGetExpensesQueryParams();
  const handleDialog = useStoreExpenseDetailPaymentDialog();
  const userLogged = useStoreAuth((state) => state.user);

  const mutationExpenseAddPayment = useExpenseAddPayment();
  const {
    data,
    isLoading: isLoadingPayment,
    isFetching: isFetchingPayment,
  } = useGetExpensePaymentData();

  const handleAction = async (data: any) => {
    mutationExpenseAddPayment.mutate(data, {
      onSuccess: () => {
        console.log("on success");
        handleDialog.closeDialog();
      },
    });
  };

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

  if (isLoadingPayment || isFetchingPayment) return <div>Loading...</div>;

  const paymentTypes = data ? (JSON.parse(data) as IExpensePaymentType[]) : [];

  return (
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
                    disabled={mutationExpenseAddPayment.isPending}
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
                      disabled={mutationExpenseAddPayment.isPending}
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
                      disabled={mutationExpenseAddPayment.isPending}
                      placeholder="Ex:Pago de gasto de la semana pasada"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {mutationExpenseAddPayment.isPending ? (
            <div className="flex justify-center w-full">
              <LoadingSpinner className="text-gray-500" />
            </div>
          ) : (
            <div className="flex w-full max-w-sm items-center justify-end space-x-2">
              <Button type="submit" variant="default">
                Pagar
              </Button>
              <Button
                type="button"
                onClick={() => handleDialog.closeDialog()}
                variant="secondary"
              >
                Cerrar
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default ExpensePaymentForm;
