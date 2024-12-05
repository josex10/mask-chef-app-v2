import { CTableLimitSize } from "@/utils/constants/CTableLimitSize";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { IDataTablePaginationProps } from "../interfaces";
import { useHandlePagination } from "../hooks";

const showTableNumberOfActualPage = (
  pageNumber: number,
  rowsNumber: number
) => {
  const startNumber = CTableLimitSize * (pageNumber - 1);
  const endNumber = rowsNumber + startNumber;
  return {
    startNumber,
    endNumber,
  };
};

const DataTablePagination = ({
  totalCount,
  pageNumber,
  numberOfRows,
}: IDataTablePaginationProps) => {
  const { paginationLoader, paginationButton } = useHandlePagination();

  const { startNumber, endNumber } = showTableNumberOfActualPage(
    pageNumber || 1,
    numberOfRows
  );

  return (
    <>
      {totalCount > CTableLimitSize ? (
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {`${startNumber + 1} - ${endNumber} de ${totalCount}`}
          </div>

          {paginationLoader ? (
            <div>
              <LoadingSpinner size={24} className="animate-spin" />
            </div>
          ) : (
            <div className="flex flex-row gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => paginationButton("PREV", pageNumber || 1)}
                disabled={pageNumber === 1 || pageNumber === undefined}
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => paginationButton("NEXT", pageNumber || 1)}
                disabled={endNumber === totalCount}
              >
                Siguiente
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {`${startNumber + 1} - ${endNumber} de ${totalCount}`}
          </div>
        </div>
      )}
    </>
  );
};

export default DataTablePagination;
