import { Table, TableBody } from "@/components/ui/table";
import CardExpenseTableRow from "./CardExpenseTableRow";
import { IGroupExpenseTable } from "@/utils/interfaces/private/admin/customGroupExpenseTable";

type TExpenseTableBodyProps = {
    expensesData: IGroupExpenseTable[];
};


const ExpenseTableBody = ({expensesData}:TExpenseTableBodyProps ) => {
  return (
    <div className="flex-1 overflow-auto">
      <Table className="z-0">
        <TableBody>
          {expensesData.map((expense, index) => (
            <CardExpenseTableRow key={index} expense={expense} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExpenseTableBody;
