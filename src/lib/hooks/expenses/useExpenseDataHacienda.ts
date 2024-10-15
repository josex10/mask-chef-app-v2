import { fetchDataForHaciendaAction } from "@/lib/actions/private/admin/expenses/ExpenseFetchDataForHacienda.action";
import { EQueryClientsKeys } from "@/utils/enums/queryClientKeys";
import { IServerActionResponse } from "@/utils/interfaces/private/admin/serverActionResponse";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useExpenseDataHacienta = () => {
  return useQuery<string | null>({
    queryKey: [EQueryClientsKeys.expensesHaciendaData],
    queryFn: async () => await fetchDataForHaciendaAction(),
    select(data) {
      return handleHaciendaResponse(data);
    },
  });
};

const handleHaciendaResponse = (data: string | null) => {
  try {
    if (!data) throw new Error("Error al obtener los datos");
    const parsedData = JSON.parse(data as string) as IServerActionResponse;
    if (!parsedData || parsedData.error)
      throw new Error("Error al obtener los datos");
    return JSON.stringify(parsedData.data);
  } catch (error: any) {
    toast.error("Ocurrió un error al realizar la acción de Hacienda");
    return null;
  }
};
