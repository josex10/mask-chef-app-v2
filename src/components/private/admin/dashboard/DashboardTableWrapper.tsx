import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import DashboardCardTableComponent from "./DashboardTable";
import { IDashboardTableData } from "@/utils/interfaces/dashboard/IDashboardTableData";

type TDashboardTableWrapperProps = {
  tableData: IDashboardTableData[];
};
const DashboardTableWrapperComponent = ({
  tableData,
}: TDashboardTableWrapperProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Tipos de Venta</CardTitle>
          <CardDescription>
            Desgloce de los tipos del mes.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <DashboardCardTableComponent tableData={tableData} />
      </CardContent>
    </Card>
  );
};

export default DashboardTableWrapperComponent;
