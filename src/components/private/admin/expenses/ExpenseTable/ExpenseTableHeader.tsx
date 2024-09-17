import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ExpenseTableHeader = () => {
  return (
    <div className="sticky top-0 z-10 bg-background">
      <Table>
        <TableHeader>
          <TableRow className="sticky top-0 z-[100]">
            <TableHead className="w-[30vw]">Proveedor</TableHead>
            <TableHead className="hidden sm:table-cell">Estado</TableHead>
            <TableHead className="hidden md:table-cell">Fecha</TableHead>
            <TableHead className="table-cell max-sm:text-end">Monto</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    </div>
  );
};

export default ExpenseTableHeader;
