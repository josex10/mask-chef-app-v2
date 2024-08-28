import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddEditProviderFormComponent from "./AddEditProviderForm";
import { PlusCircle } from "lucide-react";

const AddEditProviderDialogComponent = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Agregar
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar un nuevo proveedor</DialogTitle>
         
        </DialogHeader>
       
        <AddEditProviderFormComponent />
      </DialogContent>
    </Dialog>
  );
};

export default AddEditProviderDialogComponent;
