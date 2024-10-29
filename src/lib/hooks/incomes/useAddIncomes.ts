"use client";

import { IServerActionResponse } from "@/utils/interfaces/private/admin/serverActionResponse";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addIncomes } from "@/lib/actions/private/admin/incomes/AddIncomes";
import { EQueryClientsKeys } from "@/utils/enums/queryClientKeys";

export const useAddIncomes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      return addIncomes(data);
    },
    onSuccess: async (data: string) => {
      const response = JSON.parse(data) as IServerActionResponse;
      if (response.error) throw new Error(response.message);

      //TODO Refetch query FOR NEW TAB OF INTCOMES
      queryClient.refetchQueries({
        queryKey: [EQueryClientsKeys.getIncomesLastCreated],
      });
      toast.success(response.message);
    },
    onError: (error: Error) => {
      toast.error(
        error.message ? error.message : "Ocurrió un error al realizar la acción"
      );
    },
  });
};
