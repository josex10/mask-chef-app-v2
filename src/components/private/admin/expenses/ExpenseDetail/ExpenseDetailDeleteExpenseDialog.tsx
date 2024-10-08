import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useExpenseDeleteExpense } from "@/lib/hooks/expenses/useExpenseDeleteExpense";
import { useHandleExpenseParams } from "@/lib/hooks/expenses/useExpenseHandleQueryParams";
import useStoreExpenseDeleteExpenseDialog from "@/store/private/expenses/storeExpenseDeleteExpenseDialog";
import { EExpenseQueryParams } from "@/utils/enums/expenseQueryParams";
import { Trash2 } from "lucide-react";

type TExpenseDetailDeleteExpenseDialogProps = {
  expenseId: string;
  expenseSummaryId: string;
};
export function ExpenseDetailDeleteExpenseDialog({
  expenseId,
  expenseSummaryId,
}: TExpenseDetailDeleteExpenseDialogProps) {
  const handleDialog = useStoreExpenseDeleteExpenseDialog();
  const deleleExpenseMutation = useExpenseDeleteExpense();
  const { fnSetParams } = useHandleExpenseParams();

  const handleDelete = async () => {
    deleleExpenseMutation.mutate(
      { expenseId, expenseSummaryId },
      {
        onSuccess: () => {
          fnSetParams([
            { key: EExpenseQueryParams.expenseId, value: expenseId },
          ],true);
          handleDialog.closeDialog();
        },
      }
    );
  };

  return (
    <Dialog open={handleDialog.isOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={handleDialog.openDialog}
          variant="destructive"
          size="sm"
        >
          <Trash2 size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Eliminar Gasto</DialogTitle>
          <DialogDescription>
            Esta acción requiere eliminar el gasto seleccionado, lo cual no se
            puede deshacer una vez realizado.
          </DialogDescription>
        </DialogHeader>
        {deleleExpenseMutation.isPending ? (
          <div className="flex justify-center w-full">
            <LoadingSpinner className="text-gray-500" />
          </div>
        ) : (
          <DialogFooter>
            <Button onClick={handleDelete}>Eliminar</Button>
            <Button onClick={handleDialog.closeDialog}>Cancelar</Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
