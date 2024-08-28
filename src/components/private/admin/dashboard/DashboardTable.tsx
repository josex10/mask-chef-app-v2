import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DashboardCardTableComponent = () => {
  const tableHeaders = [
    { label: "Tipo", className: "" },
    { label: "Total de Ventas", className: "text-right" },
  ];

  const tableBody = [
    { day: "Efectivo", date: "2024-07-01", amount: "$120.00" },
    { day: "Sinpe", date: "2024-07-02", amount: "$187.00" },
    { day: "Tarjeta", date: "2024-07-03", amount: "$250.00" },
    { day: "Uber", date: "2024-07-04", amount: "$325.00" },
    { day: "Didi", date: "2024-07-05", amount: "$480.00" },
    { day: "Pedidos YA", date: "2024-07-06", amount: "$375.00" }
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
        {tableBody.map((row, index) => {
          return (
            <TableRow key={index}>
              <TableCell>
                <div className="font-medium">{row.day}</div>
              </TableCell>
              <TableCell className="text-right font-medium">{row.amount}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default DashboardCardTableComponent;
