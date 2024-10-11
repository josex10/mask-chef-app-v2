"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CirclePlus, Landmark, Search } from "lucide-react";
import ExpenseTabNew from "./ExpenseTabNew";
import ExpenseTabHacienda from "./ExpenseTabHacienda";
import ExpenseTabSearch from "./ExpenseTabSearch";
import { useHandleExpenseParams } from "@/lib/hooks/expenses/useExpenseHandleQueryParams";
import { EExpenseQueryParams } from "@/utils/enums/expenseQueryParams";
import { EExpenseTabs } from "@/utils/enums/expensesEnums";

const ExpenseTabsItems = [
  {
    value: EExpenseTabs.NEW,
    icon: <CirclePlus size="16" className="mr-2" />,
    label: "Nuevo",
    content: <ExpenseTabNew />,
  },
  {
    value: EExpenseTabs.SEARCH,
    icon: <Search size="16" className="mr-2" />,
    label: "Buscar",
    content: <ExpenseTabSearch />,
  },
  {
    value: EExpenseTabs.HACIENDA,
    icon: <Landmark size="16" className="mr-2" />,
    label: "Hacienda",
    content: <ExpenseTabHacienda />,
  },
];

const ExpenseTabsList = () => {
  const { fnSetParams } = useHandleExpenseParams();
  function handleClick(value: EExpenseTabs) {
    fnSetParams([{ key: EExpenseQueryParams.expenseTab, value }]);
  }
  return (
    <TabsList className="w-full p-6">
      {ExpenseTabsItems.map(({ value, icon, label }) => (
        <TabsTrigger
          key={value}
          value={value}
          onClick={() => handleClick(value)}
        >
          {icon}
          {label}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

const ExpenseTabsContent = () => {
  return (
    <>
      {ExpenseTabsItems.map(({ value, content }) => (
        <TabsContent key={value} value={value}>
          {content}
        </TabsContent>
      ))}
    </>
  );
};

const ExpenseTabs = () => {
  const { getActualParams } = useHandleExpenseParams();
  const { expenseTab: expenseTabParams } = getActualParams;
  const defaultTab = expenseTabParams || EExpenseTabs.NEW;
  return (
    <Tabs defaultValue={defaultTab}>
      <ExpenseTabsList />
      <ExpenseTabsContent />
    </Tabs>
  );
};

export default ExpenseTabs;
