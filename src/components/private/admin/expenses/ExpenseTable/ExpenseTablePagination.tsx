'use client' ;

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Table, TableCell, TableFooter, TableRow } from "@/components/ui/table";
import { useRouterPush } from "@/lib/hooks/shared/useRouterPush";
import { EQueryClientsKeys } from "@/utils/enums/queryClientKeys";
import {
  generateExpensePath,
  useGetExpensesQueryParams,
} from "@/utils/helpers/expenses";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

const OFFSETTABLEVALUES = 10;

type TExpenseTablePaginationProps = {
  hasNextPage: boolean;
};
const paginationValues = (actualOffset: number, hasNextPage: boolean) => {
  if (actualOffset === 0) {
    return {
      hasPrevPage: false,
      hasNextPage: hasNextPage,
      actualPage: 1,
      prevPage: null,
      nextPage: 2,
    };
  }
};

const ExpenseTablePagination = ({
  hasNextPage,
}: TExpenseTablePaginationProps) => {
  const pathName = usePathname();
  const { offset, startDate, endDate, expenseId } = useGetExpensesQueryParams();
  const routerPuskHook = useRouterPush();
  const queryClient = useQueryClient();

  const pagValues = paginationValues(offset, hasNextPage);
  const handleNext = () => {
    const newUrl = `${pathName}${generateExpensePath(
      startDate,
      endDate,
      expenseId,
      offset + OFFSETTABLEVALUES
    )}`;
    routerPuskHook(newUrl).then(() => {
      queryClient.refetchQueries({
        queryKey: [EQueryClientsKeys.expensesTable],
      });
    });
  };

  const handlePrevious = () => {
    //TODO: Implement handlePrevious
  };

  return (
    <div className="sticky bottom-0 z-10 bg-background border-t">
      <Table>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4} className="text-right">
              <Pagination>
                <PaginationContent>
                  {pagValues?.hasPrevPage && (
                    <PaginationItem>
                      <PaginationPrevious onClick={handlePrevious} href="#" />
                    </PaginationItem>
                  )}

                  {pagValues?.prevPage && (
                    <PaginationItem>
                      <PaginationLink href="#">
                        {pagValues?.prevPage}
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  {pagValues?.actualPage && (
                    <PaginationItem>
                      <PaginationLink href="#" isActive>
                        {pagValues?.actualPage}
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  {pagValues?.hasNextPage && (
                    <>
                      <PaginationItem>
                        <PaginationLink href="#">
                          {pagValues?.nextPage}
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext onClick={handleNext} href="#" />
                      </PaginationItem>
                    </>
                  )}
                </PaginationContent>
              </Pagination>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default ExpenseTablePagination;
