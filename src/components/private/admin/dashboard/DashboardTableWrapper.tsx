import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import DashboardCardTableComponent from "./DashboardTable";

const DashboardTableWrapperComponent = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Tipos de Venta</CardTitle>
          <CardDescription>
            Desgloce de los tipos de venta en la semana.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <DashboardCardTableComponent />
      </CardContent>
    </Card>
  );
};

export default DashboardTableWrapperComponent;
