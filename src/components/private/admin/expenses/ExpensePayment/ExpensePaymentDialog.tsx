"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useStoreExpenseDetailPaymentDialog from "@/store/private/expenses/storeExpenseDetailPaymentDialog";
import ExpensePaymentForm from "./ExpensePaymentForm";
import ExpensePaymentDialogTrigger from "./ExpensePaymentDialogTrigger";

export function ExpensePaymentDialog() {
  const handleDialog = useStoreExpenseDetailPaymentDialog();
  return (
    <Dialog open={handleDialog.isOpen}>
      <ExpensePaymentDialogTrigger />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Pagar Gasto</DialogTitle>
          <DialogDescription>Formulario de pago</DialogDescription>
        </DialogHeader>
        <ExpensePaymentForm />
      </DialogContent>
    </Dialog>
  );
}
