"use client";

import { getAllExpenses } from "@/lib/actions/private/admin/expenses/GetExpensesActions";
import { EQueryClientsKeys } from "@/utils/enums/queryClientKeys";
import { IServerActionResponse } from "@/utils/interfaces/private/admin/serverActionResponse";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useHandleExpenseParams } from "./useExpenseHandleQueryParams";

export const useGetExpenseTableData = () => {
  
  const { getActualParams } = useHandleExpenseParams();
  const {
    startDate,
    endDate,
    dateType,
    expenseKey,
    expenseStatus,
    providerId,
  } = getActualParams;
  return useQuery<string | null>({
    queryKey: [EQueryClientsKeys.expensesTable],
    queryFn: async () =>
      await getAllExpenses({
        startDate,
        endDate,
        dateType,
        expenseKey,
        expenseStatus,
        providerId,
      }),
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
