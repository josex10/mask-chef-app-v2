"use client";
import { getAllProvidersForSelect } from "@/lib/actions/private/admin/providers/providersActionts";
import useStoreAuth from "@/store/private/admin/auth";
import { EQueryClientsKeys } from "@/utils/enums/queryClientKeys";
import { useQuery } from "@tanstack/react-query";

export const useGetAllProvidersForSelect = () => {
    const rest = useStoreAuth((state) => state.selectedRestaurant);
  
    return useQuery<string | null>({
      queryKey: [EQueryClientsKeys.getAllProvidersForSelect],
      queryFn: async () => await getAllProvidersForSelect(rest?.id),
    });
  };