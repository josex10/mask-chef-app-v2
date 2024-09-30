"use client";

import { useGetExpenseTableLastCreated } from "@/lib/hooks/expenses/useExpenseTableLastCreated";
import CardExpenseTable from "../ExpenseTable/CardExpenseTable";
import CardExpenseUpload from "../ExpenseUpload/CardExpenseUpload";
import SkeletonTable from "@/components/private/admin/expenses/Skeletons/SkeletonTable";
import CardExpenseNew from "../ExpenseNew/CardExpenseNew";

const headerDescription = {
  title: "Lista de Gastos",
  description: "Muestra la lista de los últimos 10 gastos agregados.",
};

const ExpenseTabNew = () => {
  const { data, isLoading, isFetching } = useGetExpenseTableLastCreated();
  return (
    <>
      <div className="flex flex-col gap-2  md:flex-row">
        <CardExpenseNew />
        <CardExpenseUpload />
      </div>

      {isLoading || isFetching ? (
        <SkeletonTable />
      ) : (
        <CardExpenseTable
          showCreatedAt={true}
          data={data}
          header={headerDescription}
        />
      )}
    </>
  );
};

export default ExpenseTabNew;
