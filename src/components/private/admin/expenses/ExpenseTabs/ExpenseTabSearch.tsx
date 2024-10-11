import ExpenseFilterWrapper from "../ExpenseTable/filters/ExpenseFilterWrapper";
import { useGetExpenseTableData } from "@/lib/hooks/expenses/useExpenseTable";
import SkeletonTable from "../Skeletons/SkeletonTable";
import CardExpenseTable from "../ExpenseTable/CardExpenseTable";
import CardExpenseDetail from "../ExpenseDetail/CardExpenseDetail";
import { EReactQueryStatus } from "@/utils/enums/EReactQueryStatus";

const headerDescription = {
  title: "Lista de Gastos",
  description: "Muestra la lista de gastos según el filtro seleccionado.",
};

const ExpenseTabSearch = () => {
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

export default ExpenseTabSearch;
