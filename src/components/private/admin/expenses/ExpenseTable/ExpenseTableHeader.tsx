import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useExpenseDateTypeBasedOnParams } from "@/lib/hooks/expenses/useExpenseDateTypeBasedOnParams";

const useGetExpenseTableHeaders = () => {
  const dateType = useExpenseDateTypeBasedOnParams();

  return {
    headers: [
      {
        headerLabel: "Proveedor",
        className: "w-[30vw]",
      },
      {
        headerLabel: "Estado",
        className: "hidden sm:table-cell",
      },
      {
        headerLabel: dateType?.value,
        className: "hidden md:table-cell",
      },
      {
        headerLabel: "Monto",
        className: "table-cell max-sm:text-end",
      },
    ],
  };
};

const ExpenseTableHeaderRow = () => {
  const headers = useGetExpenseTableHeaders();

  return (
    <TableRow>
      {headers.headers.map((header, index) => (
        <TableHead key={index} className={header.className}>
          {header.headerLabel}
        </TableHead>
      ))}
    </TableRow>
  );
};

const ExpenseTableHeader = () => {
  return (
    <div className="sticky top-0 z-10 bg-background">
      <Table>
        <TableHeader>
          <ExpenseTableHeaderRow />
        </TableHeader>
      </Table>
    </div>
  );
};

export default ExpenseTableHeader;
