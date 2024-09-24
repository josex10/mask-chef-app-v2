import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import useStoreExpenseDetailPaymentDialog from "@/store/private/expenses/storeExpenseDetailPaymentDialog";
import { CreditCard } from "lucide-react";

const ExpensePaymentDialogTrigger = () => {
  const handleDialog = useStoreExpenseDetailPaymentDialog();

  return (
    <DialogTrigger asChild>
      <Button
          onClick={handleDialog.openDialog}
          variant="secondary"
          size="sm"
        >
          <CreditCard size={16} />
        </Button>
    </DialogTrigger>
  );
};

export default ExpensePaymentDialogTrigger;
