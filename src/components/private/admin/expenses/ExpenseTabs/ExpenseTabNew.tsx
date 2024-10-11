"use client";

import { useGetExpenseTableLastCreated } from "@/lib/hooks/expenses/useExpenseTableLastCreated";
import CardExpenseTable from "../ExpenseTable/CardExpenseTable";
import CardExpenseUpload from "../ExpenseUpload/CardExpenseUpload";
import SkeletonTable from "@/components/private/admin/expenses/Skeletons/SkeletonTable";
import CardExpenseNew from "../ExpenseNew/CardExpenseNew";
import CardExpenseDetail from "../ExpenseDetail/CardExpenseDetail";
import { EReactQueryStatus } from "@/utils/enums/EReactQueryStatus";

const headerDescription = {
  title: "Lista de Gastos",
  description: "Muestra la lista de los últimos 10 gastos agregados.",
};

const ExpenseTabNew = () => {
  const { status, data } = useGetExpenseTableLastCreated();
  return (
    <section className="xl:flex xl:flex-row xl:gap-2 xl:h-[80vh] xl:overflow-x-hidden">
      <div className=" xl:w-[58vw]">
        <div className="flex flex-col gap-2 md:flex-row xl:h-[20vh]">
          <CardExpenseNew />
          <CardExpenseUpload />
        </div>

        <div>
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
      </div>

      <div className="xl:w-[22vw]">
        <CardExpenseDetail />
      </div>
    </section>
  );
};

export default ExpenseTabNew;
