import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UploadExpenseBtn from "./UploadExpenseBtn";

const CardExpenseUpload = () => {
  return (
    // <Card className="sm:col-span-2 md:h-[20vh]">
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Importar <span className="text-sm text-muted">Válido solo para CRC.</span></CardTitle>
        <CardDescription className="text-balance leading-relaxed">
          Importa sus gastos fácilmente al sistema, subiendo el archivo XML
          emitido por Hacienda. 
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <UploadExpenseBtn />
      </CardFooter>
    </Card>
  );
};

export default CardExpenseUpload;
