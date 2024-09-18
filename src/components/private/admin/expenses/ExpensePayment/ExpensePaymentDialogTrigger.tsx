import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import useStoreExpenseDetailPaymentDialog from "@/store/private/expenses/storeExpenseDetailPaymentDialog";
import { CreditCard } from "lucide-react";

const ExpensePaymentDialogTrigger = () => {
  const handleDialog = useStoreExpenseDetailPaymentDialog();

  return (
    <DialogTrigger asChild>
      <Button
        size="sm"
        className="h-8 gap-1"
        variant="ghost"
        onClick={() => handleDialog.openDialog()}
      >
        <CreditCard className="h-3.5 w-3.5" />
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          Pagar
        </span>
      </Button>
    </DialogTrigger>
  );
};

export default ExpensePaymentDialogTrigger;
