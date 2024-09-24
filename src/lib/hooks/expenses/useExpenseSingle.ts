'use client';

import { getSingleExpense } from "@/lib/actions/private/admin/expenses/GetExpensesActions";
import { EQueryClientsKeys } from "@/utils/enums/queryClientKeys";
import { useGetExpensesQueryParams } from "@/utils/helpers/expenses";
import { useQuery } from "@tanstack/react-query";


export const useGetExpenseSingleData = () => {
  const {expenseId} = useGetExpensesQueryParams();

  return useQuery<string | null>({
    queryKey: [EQueryClientsKeys.singleExpense],
    queryFn: async () => await getSingleExpense(expenseId),
  });
};