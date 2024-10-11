"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IGroupExpenseTable } from "@/utils/interfaces/private/admin/customGroupExpenseTable";
import SharedCenterMessage from "@/components/shared/SharedCenterMessage";
import ExpenseTableHeader from "./ExpenseTableHeader";
import ExpenseTableBody from "./ExpenseTableBody";

type TExpenseTableDescriptionProps = {
  title?: string;
  description?: string;
};
const ExpenseTableDescription = ({
  title,
  description,
}: TExpenseTableDescriptionProps) => {
  return (
    <CardHeader className="px-7">
      <CardTitle>{title && title}</CardTitle>
      <CardDescription>{description && description}</CardDescription>
    </CardHeader>
  );
};

type TCardExpenseTableProps = {
  data: string | null | undefined;
  showCreatedAt: boolean;
  header?: TExpenseTableDescriptionProps;
};
const CardExpenseTable = ({ data, header }: TCardExpenseTableProps) => {
  const expensesData = data
    ? (JSON.parse(data as string) as IGroupExpenseTable[])
    : [];
  return (
    <>
      {header && (
        <ExpenseTableDescription
          title={header.title}
          description={header.description}
        />
      )}
      <Card className="max-h-[500px] mb-5 overflow-y-auto mt-2 xl:h-[49vh]">
        <CardContent>
          <ExpenseTableHeader />
          {!expensesData || expensesData.length === 0 ? (
            <SharedCenterMessage message="Sin Resultados" />
          ) : (
            <ExpenseTableBody expensesData={expensesData} />
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default CardExpenseTable;
