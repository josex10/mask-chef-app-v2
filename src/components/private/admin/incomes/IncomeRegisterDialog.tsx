import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useStoreIncomeRegisterDialog from "@/store/private/incomes/storeIncomeRegisterDialog";
import { CreditCard } from "lucide-react";
import IncomeRegisterForm from "./IncomeRegisterForm";

const IncomeRegisterDialogTrigger = () => {
  const handleDialog = useStoreIncomeRegisterDialog();

  return (
    <DialogTrigger asChild>
      <Button onClick={handleDialog.openDialog} variant="secondary" size="sm">
        <CreditCard size={16} />
      </Button>
    </DialogTrigger>
  );
};

const IncomeRegisterDialog = () => {
  const handleDialog = useStoreIncomeRegisterDialog();
  return (
    <Dialog open={handleDialog.isOpen}>
      <IncomeRegisterDialogTrigger />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Pagar Gasto</DialogTitle>
          <DialogDescription>Formulario de pago</DialogDescription>
        </DialogHeader>
        <IncomeRegisterForm />
      </DialogContent>
    </Dialog>
  );
};

export default IncomeRegisterDialog;
