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
    <Card className="sm:col-span-2 md:h-[20vh]" x-chunk="dashboard-05-chunk-0">
      <CardHeader className="pb-3">
        <CardTitle>Gastos</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Carga tus gastos fácilmente al sistema, subiendo el archivo XML
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
