"use client";

import { getExpensesSummary } from "@/lib/actions/private/admin/expenses/GetExpensesSummary";
import useStoreAuth from "@/store/private/admin/auth";
import { EQueryClientsKeys } from "@/utils/enums/queryClientKeys";
import { convertUnixToDate } from "@/utils/helpers/dates";
import { useQuery } from "@tanstack/react-query";
import { useHandleExpenseParams } from "./useExpenseHandleQueryParams";

export const useExpenseTotalAmountOfTable = () => {
  const { getActualParams } = useHandleExpenseParams();
  const { startDate, endDate } = getActualParams;
  const rest = useStoreAuth((state) => state.selectedRestaurant);
  return useQuery<number>({
    queryKey: [EQueryClientsKeys.expensesFinantialInfo],
    queryFn: async () =>
      getExpensesSummary(
        rest?.id,
        convertUnixToDate(Number(startDate)),
        convertUnixToDate(Number(endDate))
      ),
  });
};
