"use client";

import CardExpenseDetail from "@/components/private/admin/expenses/ExpenseDetail/CardExpenseDetail";
import CardExpenseTable from "@/components/private/admin/expenses/ExpenseTable/CardExpenseTable";
import ExpenseFilterWrapper from "@/components/private/admin/expenses/ExpenseTable/filters/ExpenseFilterWrapper";
import SkeletonTable from "@/components/private/admin/expenses/Skeletons/SkeletonTable";
import { useGetExpenseTableData } from "@/lib/hooks/expenses/useExpenseTable";
import { EReactQueryStatus } from "@/utils/enums/EReactQueryStatus";

const headerDescription = {
  title: "Lista de Gastos",
  description: "Muestra la lista de gastos según el filtro seleccionado.",
};
const ExpenseSearch = () => {
  const { status, data } = useGetExpenseTableData();

  return (
    <section className="xl:flex xl:flex-row xl:gap-2 xl:h-[80vh] xl:overflow-x-hidden">
      <div className=" xl:w-[58vw]">
        <ExpenseFilterWrapper />

        {status === EReactQueryStatus.pending ? (
          <SkeletonTable />
        ) : (
          <CardExpenseTable
            showCreatedAt={true}
            data={data}
            header={headerDescription}
          />
        )}
      </div>

      <div className="xl:w-[22vw]">
        <CardExpenseDetail />
      </div>
    </section>
  );
};

export default ExpenseSearch;
