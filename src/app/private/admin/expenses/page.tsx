import { File, ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CardExpenseUpload from "@/components/private/admin/expenses/CardExpenseUpload";
import CardExpenseFinatialInfo from "@/components/private/admin/expenses/CardExpenseFinatialInfo";
import SharedBreadcrumb from "@/components/shared/SharedBreadcrumb";
import CardExpenseTable from "@/components/private/admin/expenses/CardExpenseTable";
import CardExpenseDetail from "@/components/private/admin/expenses/CardExpenseDetail";
import useStoreAuth from "@/store/private/admin/auth";
import {
  getStardAndEndDateOfTheMonth,
  getStardAndEndDateOfTheWeek,
} from "@/utils/helpers/dates";
import { Suspense } from "react";
import CardExpenseFinatialInfoSkeleton from "@/components/private/admin/expenses/CardExpenseFinatialInfoSkeleton";

const ExpensesPage =() => {
  const currentDate = new Date();
  const { startWeek, endWeek } = getStardAndEndDateOfTheWeek(currentDate);
  const { startMonth, endMonth } = getStardAndEndDateOfTheMonth(currentDate);

  // const user = useStoreAuth((state) => state.user);

  // console.log(user);
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <SharedBreadcrumb />
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <CardExpenseUpload />
              <Suspense fallback={<div>Loading...</div>}>
                <CardExpenseFinatialInfo />
              </Suspense>
              <Suspense fallback={<CardExpenseFinatialInfoSkeleton />}>
                <CardExpenseFinatialInfo loader={true} />
              </Suspense>
            </div>
            <div className="flex flex-col">
              <div className="ml-auto flex items-center gap-2 mb-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 gap-1 text-sm"
                    >
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only">Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Fulfilled
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Declined
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Refunded
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 gap-1 text-sm"
                >
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Export</span>
                </Button>
              </div>
              <CardExpenseTable filter="today" />
            </div>
            
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
