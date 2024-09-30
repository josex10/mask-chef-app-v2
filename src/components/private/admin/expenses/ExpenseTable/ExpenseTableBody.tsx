import { Table, TableBody } from "@/components/ui/table";
import CardExpenseTableRow from "./CardExpenseTableRow";
import { IGroupExpenseTable } from "@/utils/interfaces/private/admin/customGroupExpenseTable";

type TExpenseTableBodyProps = {
    expensesData: IGroupExpenseTable[];
    showCreatedAt: boolean;
};


const ExpenseTableBody = ({expensesData, showCreatedAt}:TExpenseTableBodyProps ) => {
  return (
    <div className="flex-1 overflow-auto">
      <Table className="z-0">
        <TableBody>
          {expensesData.map((expense, index) => (
            <CardExpenseTableRow key={index} expense={expense} showCreatedAt={showCreatedAt}/>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExpenseTableBody;
