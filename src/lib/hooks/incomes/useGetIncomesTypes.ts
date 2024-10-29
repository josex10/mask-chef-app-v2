import { getIncomesType } from "@/lib/actions/private/admin/incomes/GetIncomesType";
import useStoreAuth from "@/store/private/admin/auth";
import { EQueryClientsKeys } from "@/utils/enums/queryClientKeys";
import { IServerActionResponse } from "@/utils/interfaces/private/admin/serverActionResponse";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetIncomesTypes = () => {
  const rest = useStoreAuth((state) => state.selectedRestaurant);

  return useQuery<string | null>({
    queryKey: [EQueryClientsKeys.getIncomesTypes],
    queryFn: async () => await getIncomesType(rest?.id),
    select(data) {
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
