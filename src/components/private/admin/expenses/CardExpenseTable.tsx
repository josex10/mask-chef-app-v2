import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CardExpenseTableRow from "./CardExpenseTableRow";
import { getAllExpenses } from "@/lib/actions/private/admin/expenses/GetExpensesActions";

type CardExpenseTableProps = {
  filter: string;
};

const CardExpenseTable = async ({ filter }: CardExpenseTableProps) => {
  // const expenses = await getAllExpenses();
  const expenses: any[] = [];
  return (
    <Card x-chunk="dashboard-05-chunk-3">
      <CardHeader className="px-7">
        <CardTitle>Gastos</CardTitle>
        <CardDescription>
          Ultimos gastos registrados en el sistema.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Gasto</TableHead>
              <TableHead className="hidden sm:table-cell">Tipo</TableHead>
              <TableHead className="hidden sm:table-cell">Estado</TableHead>
              <TableHead className="hidden md:table-cell">Fecha</TableHead>
              <TableHead className="table-cell">Monto</TableHead>
              {/* <TableHead className="hidden sm:table-cell">
                Registrado Por
              </TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense, index) => (
              <CardExpenseTableRow key={index} expense={expense} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CardExpenseTable;
