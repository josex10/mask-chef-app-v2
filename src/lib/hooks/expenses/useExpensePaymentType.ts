"use client";
import { getExpensesPaymentType } from "@/lib/actions/private/admin/expenses/GetExpensesPaymentType";
import useStoreAuth from "@/store/private/admin/auth";
import { EQueryClientsKeys } from "@/utils/enums/queryClientKeys";
import { useQuery } from "@tanstack/react-query";

export const useGetExpensePaymentData = () => {
  const rest = useStoreAuth((state) => state.selectedRestaurant);

  return useQuery<string | null>({
    queryKey: [EQueryClientsKeys.expensePaymentType],
    queryFn: async () => await getExpensesPaymentType(rest?.id),
  });
};
