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
import useStoreExpenseDetailPaymentDialog from "@/store/private/expenses/storeExpenseDetailPaymentDialog";
import { Trash2 } from "lucide-react";

type TExpenseDetailPaymentDialogProps = {
  expenseId: string;
  expenseSummaryId: string;
};
export function ExpenseDetailPaymentDialog({
  expenseId,
  expenseSummaryId,
}: TExpenseDetailPaymentDialogProps) {
  const handleDialog = useStoreExpenseDetailPaymentDialog();
  const deleleExpenseMutation = useExpenseDeleteExpense();

  const handleDelete = async () => {
    deleleExpenseMutation.mutate(
      { expenseId, expenseSummaryId },
      {
        onSuccess: () => {
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
          <DialogDescription>
            <div className="flex justify-center w-full">
              <LoadingSpinner className="text-gray-500" />
            </div>
          </DialogDescription>
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
