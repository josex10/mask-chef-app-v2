import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CardExpenseNew = () => {
  return (
    <Card className="sm:col-span-2 md:h-[20vh]" x-chunk="dashboard-05-chunk-0">
      <CardHeader className="pb-3">
        <CardTitle>Nuevo</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Esta opción le permite agregar un nuevo gasto al sistema de manera detallada.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button>Agregar</Button>
      </CardFooter>
    </Card>
  );
};

export default CardExpenseNew;
