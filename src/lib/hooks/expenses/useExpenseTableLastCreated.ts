"use client";

import { getExpenseTableLastCreated } from "@/lib/actions/private/admin/expenses/GetExpenseTableLastCreated";
import { EQueryClientsKeys } from "@/utils/enums/queryClientKeys";
import { useQuery } from "@tanstack/react-query";
import { IServerActionResponse } from "../../../utils/interfaces/private/admin/serverActionResponse";
import toast from "react-hot-toast";

export const useGetExpenseTableLastCreated = () => {
  return useQuery<string | null>({
    queryKey: [EQueryClientsKeys.expensesTableLastCreated],
    queryFn: async () => await getExpenseTableLastCreated(),
    refetchOnWindowFocus: false,
    select(data) {
      //TODO: IMPROVE THE RESPONSE
      try {
        if (!data) throw new Error("Error al obtener los datos");
        const parsedData = JSON.parse(data as string) as IServerActionResponse;
        if (!parsedData || parsedData.error)
          throw new Error("Error al obtener los datos");
        return JSON.stringify(parsedData.data);
      } catch (error: any) {
        toast.error("Ocurrió un error al realizar la acción");
        return null;
      }
    },
  });
};
