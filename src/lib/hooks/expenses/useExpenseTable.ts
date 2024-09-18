'use client';

import { getAllExpenses } from "@/lib/actions/private/admin/expenses/GetExpensesActions";
import { EQueryClientsKeys } from "@/utils/enums/queryClientKeys";
import { useGetExpensesQueryParams } from "@/utils/helpers/expenses";
import { useQuery } from "@tanstack/react-query";


export const useGetExpenseTableData = () => {
  const {startDate, endDate, expenseId} = useGetExpensesQueryParams();
  return useQuery<string | null>({
    queryKey: [EQueryClientsKeys.expensesTable],
    queryFn: async () =>
      await getAllExpenses({ startDate, endDate, expenseId }),
  });
};
