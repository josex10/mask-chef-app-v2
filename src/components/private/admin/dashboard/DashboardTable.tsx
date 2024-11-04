import TextFieldForCurrency from "@/components/shared/TextFieldForCurrency";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IDashboardTableData } from "@/utils/interfaces/dashboard/IDashboardTableData";

type TDashboardCardTableProps = {
  tableData: IDashboardTableData[];
};
const DashboardCardTableComponent = ({
  tableData,
}: TDashboardCardTableProps) => {
  const tableHeaders = [
    { label: "Tipo", className: "" },
    { label: "Total de Ventas", className: "text-right" },
  ];
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {tableHeaders.map((header, index) => {
            return (
              <TableHead key={index} className={header.className}>
                {header.label}
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData.map((row, index) => {
          return (
            <TableRow key={index}>
              <TableCell>
                <div className="font-medium">{row.type}</div>
              </TableCell>
              <TableCell className="text-right font-medium">
                <TextFieldForCurrency totalAmount={row.amount} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default DashboardCardTableComponent;
