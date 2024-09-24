"use client";

import { getExpensesSummary } from "@/lib/actions/private/admin/expenses/GetExpensesSummary";
import useStoreAuth from "@/store/private/admin/auth";
import { EQueryClientsKeys } from "@/utils/enums/queryClientKeys";
import { convertUnixToDate } from "@/utils/helpers/dates";
import { useGetExpensesQueryParams } from "@/utils/helpers/expenses";
import { useQuery } from "@tanstack/react-query";

export const useExpenseTotalAmountOfTable = () => {
  const { startDate, endDate } = useGetExpensesQueryParams();
  const rest = useStoreAuth((state) => state.selectedRestaurant);
  return useQuery<number>({
    queryKey: [EQueryClientsKeys.expensesFinantialInfo],
    queryFn: async () =>
      getExpensesSummary(
        rest?.id,
        convertUnixToDate(startDate),
        convertUnixToDate(endDate)
      ),
  });
};
