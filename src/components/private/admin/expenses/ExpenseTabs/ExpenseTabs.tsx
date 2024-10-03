"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CirclePlus, Landmark, Search } from "lucide-react";
import ExpenseTabNew from "./ExpenseTabNew";
import ExpenseTabHacienda from "./ExpenseTabHacienda";
import ExpenseTabSearch from "./ExpenseTabSearch";
import { useHandleExpenseParams } from "@/lib/hooks/expenses/useExpenseHandleQueryParams";
import { EExpenseQueryParams } from "@/utils/enums/expenseQueryParams";

enum ExpenseTabsEnum {
  NEW = "new",
  SEARCH = "search",
  HACIENDA = "hacienda",
}

const ExpenseTabsItems = [
  {
    value: ExpenseTabsEnum.NEW,
    icon: <CirclePlus size="16" className="mr-2" />,
    label: "Nuevo",
    content: <ExpenseTabNew />,
  },
  {
    value: ExpenseTabsEnum.SEARCH,
    icon: <Search size="16" className="mr-2" />,
    label: "Buscar",
    content: <ExpenseTabSearch />,
  },
  {
    value: ExpenseTabsEnum.HACIENDA,
    icon: <Landmark size="16" className="mr-2" />,
    label: "Hacienda",
    content: <ExpenseTabHacienda />,
  },
];

const ExpenseTabsList = () => {
  const { fnSetParams } = useHandleExpenseParams();
  function handleClick(value: ExpenseTabsEnum) {
    fnSetParams([{ key: EExpenseQueryParams.expenseTab, value }]);
  }
  return (
    <TabsList>
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
  const defaultTab = expenseTabParams || ExpenseTabsEnum.NEW;
  return (
    <Tabs defaultValue={defaultTab}>
      <ExpenseTabsList />
      <ExpenseTabsContent />
    </Tabs>
  );
};

export default ExpenseTabs;
