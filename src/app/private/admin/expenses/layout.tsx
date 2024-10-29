"use client";

import { Button } from "@/components/ui/button";
import { EExpenseTabs } from "@/utils/enums/expensesEnums";
import Link from "next/link";
import { usePathname } from "next/navigation";

const fnGetActualUrl = (url: string, compare: string) => {
  const arrayOfParams = url.split("/");
  const getLatestParam = arrayOfParams[arrayOfParams.length - 1];
  return getLatestParam === "expenses" && compare === EExpenseTabs.NEW
    ? true
    : getLatestParam === compare
    ? true
    : false;
};

const getBtnLinks = (link: string) => {
  return [
    {
      class: fnGetActualUrl(link, EExpenseTabs.NEW) ? "underline" : "",
      href: "/private/admin/expenses",
      text: "Nuevo",
    },
    {
      class: fnGetActualUrl(link, EExpenseTabs.SEARCH) ? "underline" : "",
      href: "/private/admin/expenses/search",
      text: "Buscar",
    },
    {
      class: fnGetActualUrl(link, EExpenseTabs.HACIENDA) ? "underline" : "",
      href: "/private/admin/expenses/hacienda",
      text: "Hacienda",
    },
  ];
};

const ExpensesLayoutButtons = () => {
  const pathName = usePathname();
  const buttonLinks = getBtnLinks(pathName);
  return (
    <section>
      <div className="flex flex-row w-full justify-center gap-4 bg-muted rounded-sm p-2">
        {buttonLinks.map((button, index) => (
          <Button
            key={`${index}-${button.text}`}
            asChild
            className={button.class}
            variant={`ghost`}
          >
            <Link href={button.href}>{button.text}</Link>
          </Button>
        ))}
      </div>
    </section>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-2">
      <ExpensesLayoutButtons />
      <div>{children}</div>
    </div>
  );
}
