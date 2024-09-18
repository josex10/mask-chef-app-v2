"use client";

import { addExpensePayment } from "@/lib/actions/private/admin/expenses/AddExpensePayment";
import { EQueryClientsKeys } from "@/utils/enums/queryClientKeys";
import { IServerActionResponse } from "@/utils/interfaces/private/admin/serverActionResponse";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useExpenseAddPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      return addExpensePayment(data);
    },
    onSuccess: async (data: string) => {
      const response = JSON.parse(data) as IServerActionResponse;

      queryClient.refetchQueries({
        queryKey: [EQueryClientsKeys.expensesTable],
      });
      queryClient.refetchQueries({
        queryKey: [EQueryClientsKeys.singleExpense],
      });
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
