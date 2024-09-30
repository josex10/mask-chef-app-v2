"use client";

import { getSingleExpense } from "@/lib/actions/private/admin/expenses/GetExpensesActions";
import { EQueryClientsKeys } from "@/utils/enums/queryClientKeys";
import { useQuery } from "@tanstack/react-query";
import { useHandleExpenseParams } from "./useExpenseHandleQueryParams";

export const useGetExpenseSingleData = () => {
  const { getActualParams } = useHandleExpenseParams();
  const { expenseId } = getActualParams;

  return useQuery<string | null>({
    queryKey: [EQueryClientsKeys.singleExpense],
    queryFn: async () => await getSingleExpense(expenseId),
  });
};
