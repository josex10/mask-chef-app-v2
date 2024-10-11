import CardExpenseDetail from "@/components/private/admin/expenses/ExpenseDetail/CardExpenseDetail";
import ExpenseTabs from "@/components/private/admin/expenses/ExpenseTabs/ExpenseTabs";

const ExpensesPage = () => {
  return (
    // <div className="flex flex-col md:flex-row gap-2 md:justify-center md:items-center h-[92vh] p-2">
    <div className="w-full">
      <ExpenseTabs />
    </div>
  );
};

export default ExpensesPage;
