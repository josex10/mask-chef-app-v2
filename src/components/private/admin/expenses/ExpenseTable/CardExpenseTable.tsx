"use client";

import { Card, CardContent } from "@/components/ui/card";
import { IGroupExpenseTable } from "@/utils/interfaces/private/admin/customGroupExpenseTable";
import SkeletonTable from "@/components/shared/Skeletons/SkeletonTable";
import SharedCenterMessage from "@/components/shared/SharedCenterMessage";
import ExpenseTablePagination from "./ExpenseTablePagination";
import ExpenseTableHeader from "./ExpenseTableHeader";
import ExpenseTableBody from "./ExpenseTableBody";
import { useGetExpenseTableData } from "@/lib/hooks/expenses/useExpenseTable";
import { IServerActionResponse } from "@/utils/interfaces/private/admin/serverActionResponse";
import { IPaginationOutput } from "@/utils/interfaces/private/admin/paginationOutput";

const convertServerPaginationResponse = (serverResp: string) => {
  try {
    const originalResponse = JSON.parse(serverResp) as IServerActionResponse;
    if (!originalResponse) throw new Error("Respuesta no válida");

    if (originalResponse.error) {
      throw new Error(originalResponse.message);
    }

    const paginationOutput = originalResponse.data as IPaginationOutput;
    return {
      expenseGroupData: paginationOutput.data as IGroupExpenseTable[],
      paginationData: paginationOutput.pagination,
    };
  } catch (error) {
    return null;
  }
};
const CardExpenseTable = () => {
  const {
    data: serverResponse,
    isLoading,
    isFetching,
  } = useGetExpenseTableData();

  if (isLoading || isFetching) return <SkeletonTable />;

  if (!serverResponse) {
    <SharedCenterMessage message="Sin Resultados" />;
  }

  const convertion = convertServerPaginationResponse(serverResponse as string);

  if (!convertion) {
    <SharedCenterMessage message="Sin Resultados" />;
  }

  const expensesData = convertion?.expenseGroupData;

  return (
    <Card className="h-[55vh] overflow-y-auto">
      <CardContent>
        <ExpenseTableHeader />
        {!expensesData || expensesData.length === 0 ? (
          <SharedCenterMessage message="Sin Resultados" />
        ) : (
          <ExpenseTableBody expensesData={expensesData} />
        )}

        {/* {!expensesData ||
          (expensesData.length > 1 && (
            <ExpenseTablePagination
              hasNextPage={convertion.paginationData.hasNextPage}
            />
          ))} */}
      </CardContent>
    </Card>
  );
};

export default CardExpenseTable;
