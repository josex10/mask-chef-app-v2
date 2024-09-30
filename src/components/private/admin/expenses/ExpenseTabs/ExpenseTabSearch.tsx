import ExpenseFilterWrapper from "../ExpenseTable/filters/ExpenseFilterWrapper";
import { useGetExpenseTableData } from "@/lib/hooks/expenses/useExpenseTable";
import SkeletonTable from "../Skeletons/SkeletonTable";
import CardExpenseTable from "../ExpenseTable/CardExpenseTable";

const headerDescription = {
  title: "Lista de Gastos",
  description: "Muestra la lista de gastos según el filtro seleccionado.",
};

const ExpenseTabSearch = () => {
  const { data, isLoading, isFetching } = useGetExpenseTableData();

  return (
    <>
      <ExpenseFilterWrapper />
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

export default ExpenseTabSearch;
