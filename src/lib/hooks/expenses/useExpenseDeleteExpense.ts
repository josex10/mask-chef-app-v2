"use client";
import { deleteExpenseAction } from "@/lib/actions/private/admin/expenses/DeleteExpenseAction";
import { EQueryClientsKeys } from "@/utils/enums/queryClientKeys";
import { IDeleteExpenseAction } from "@/utils/interfaces/private/admin/expenseDeleteAction";
import { IServerActionResponse } from "@/utils/interfaces/private/admin/serverActionResponse";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useExpenseDeleteExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IDeleteExpenseAction) => {
      return deleteExpenseAction(data);
    },
    onSuccess: async (data: string) => {
      const response = JSON.parse(data) as IServerActionResponse;

      if (response.error) {
        toast.error(response.message);
        return;
      }

      await queryClient.refetchQueries({
        queryKey: [EQueryClientsKeys.expensesTableLastCreated],
      });

      await queryClient.refetchQueries({
        queryKey: [EQueryClientsKeys.expensesTable],
      });

      queryClient.setQueryData<string | null>(
        [EQueryClientsKeys.singleExpense],
        () => {
          return null;
        }
      );

      response.error
        ? toast.error(response.message)
        : toast.success(response.message);
    },
    onError: (error: any) => {
      const response = JSON.parse(error) as IServerActionResponse;
      response.error
        ? toast.error(response.message)
        : toast.error("Ocurrió un error al realizar la acción");
    },
  });
};
