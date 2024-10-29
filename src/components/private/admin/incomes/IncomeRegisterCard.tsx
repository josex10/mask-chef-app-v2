import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import IncomeRegisterDialog from "./IncomeRegisterDialog";
const IncomeRegisterCard = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Nuevo Ingreso</CardTitle>
        <CardDescription className="text-balance leading-relaxed">
          Módulo para registrar un nuevo ingreso en el sistema.
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-end">
        <IncomeRegisterDialog />
      </CardFooter>
    </Card>
  );
};

export default IncomeRegisterCard;
