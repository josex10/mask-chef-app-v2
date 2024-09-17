import CardExpenseUpload from "@/components/private/admin/expenses/CardExpenseUpload";
import CardExpenseFinatialInfo from "@/components/private/admin/expenses/CardExpenseFinatialInfo";
import CardExpenseTable from "@/components/private/admin/expenses/ExpenseTable/CardExpenseTable";
import CardExpenseDetail from "@/components/private/admin/expenses/CardExpenseDetail";
import { ExpenseDateRangeFilter } from "@/components/private/admin/expenses/ExpenseTable/filters/ExpenseDateRangeFilter";
import { ListFilter } from "lucide-react";

const ExpensesPage = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <CardExpenseUpload />
              <CardExpenseFinatialInfo
                  content="Contempla el monto total de los gastos mostrados en la tabla."
                />
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-row justify-end items-center gap-2 my-2">
                Filters
                <ListFilter className="h-3.5 w-3.5" />
              </div>
              <div className="ml-auto  gap-2 mb-2">
                <ExpenseDateRangeFilter />
              </div>
            </div>
              <CardExpenseTable />
          </div>
          <div>
            <CardExpenseDetail />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ExpensesPage;
