import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useStoreExpenseNewDialog from "@/store/private/expenses/storeExpenseNewDialog";

const ExpenseNewDialogTrigger = () => {
  const handleDialog = useStoreExpenseNewDialog();
  return (
    <DialogTrigger asChild>
      <Button onClick={handleDialog.openDialog} variant="default">
        Agregar
      </Button>
    </DialogTrigger>
  );
};

const ExpenseNewDialog = () => {
  const handleDialog = useStoreExpenseNewDialog();
  return (
    <Dialog open={handleDialog.isOpen}>
      <ExpenseNewDialogTrigger />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Pagar Gasto</DialogTitle>
          <DialogDescription>Formulario de pago</DialogDescription>
        </DialogHeader>
        {/* <ExpensePaymentForm /> */}
      </DialogContent>
    </Dialog>
  );
};

const CardExpenseNew = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Nuevo</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Esta opción le permite agregar un nuevo gasto al sistema de manera
          detallada.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <ExpenseNewDialog />
      </CardFooter>
    </Card>
  );
};

export default CardExpenseNew;
