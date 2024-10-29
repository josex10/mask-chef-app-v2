"use client";

import { EQueryClientsKeys } from "@/utils/enums/queryClientKeys";
import { useQuery } from "@tanstack/react-query";
import { IServerActionResponse } from "../../../utils/interfaces/private/admin/serverActionResponse";
import toast from "react-hot-toast";
import { getIncomesLastCreated } from "@/lib/actions/private/admin/incomes/GetIncomesLastCreated";
import useStoreAuth from "@/store/private/admin/auth";

export const useGetIncomesLastCreated = () => {
  const rest = useStoreAuth((state) => state.selectedRestaurant);

  return useQuery<string | null>({
    queryKey: [EQueryClientsKeys.getIncomesLastCreated],
    queryFn: async () => await getIncomesLastCreated(rest?.id),
    refetchOnWindowFocus: false,
    select(data) {
      try {
        const parsedData = JSON.parse(data as string) as IServerActionResponse;
        if (!parsedData || parsedData.error)
          throw new Error(parsedData?.message || "Error");
        return JSON.stringify(parsedData.data);
      } catch (error: any) {
        toast.error("Ocurrió un error al realizar la acción solicitada");
        return null;
      }
    },
  });
};
