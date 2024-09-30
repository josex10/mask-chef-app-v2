"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CirclePlus, Landmark, Search } from "lucide-react";
import ExpenseTabNew from "./ExpenseTabNew";
import ExpenseTabHacienda from "./ExpenseTabHacienda";
import ExpenseTabSearch from "./ExpenseTabSearch";

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
  return (
    <TabsList>
      {ExpenseTabsItems.map(({ value, icon, label }) => (
        <TabsTrigger key={value} value={value}>
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
  return (
    <Tabs defaultValue={ExpenseTabsEnum.NEW}>
      <ExpenseTabsList />
      <ExpenseTabsContent />
    </Tabs>
  );
};

export default ExpenseTabs;
