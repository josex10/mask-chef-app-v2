"use client";

import { updateExpenseExpirationPaymentDate } from "@/lib/actions/private/admin/expenses/UpdateExpenseExpirationPaymentDate";
import { IExpenseUpdatePaymentDate } from "@/utils/interfaces/private/admin/expenseUpdatePaymentDate";
import { IServerActionResponse } from "@/utils/interfaces/private/admin/serverActionResponse";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useExpenseUpdateExpenseExpirationPaymentDate = () => {
  return useMutation({
    mutationFn: (data: IExpenseUpdatePaymentDate) => {
      return updateExpenseExpirationPaymentDate(data);
    },
    onSuccess: async (data: string) => {
      const response = JSON.parse(data) as IServerActionResponse;
      toast.success(response.message);
    },
    onError: (error: any) => {
      const response = JSON.parse(error) as IServerActionResponse;
      response.error
        ? toast.error(response.message)
        : toast.error("Ocurrió un error al realizar la acción");
    },
  });
};
