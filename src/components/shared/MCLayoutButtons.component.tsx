"use client";

import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import { IMCLayoutTab } from "@/utils/interfaces/shared/IMCLayoutTab";

const HelperLayoutIsTabSelected = (
  urlComplete: string,
  appPage: string,
  compareTab: string,
  defaultTab: string
) => {
  const arrayOfParams = urlComplete.split("/");
  const getLatestParam = arrayOfParams[arrayOfParams.length - 1];
  return getLatestParam === appPage && compareTab === defaultTab
    ? true
    : getLatestParam === compareTab
    ? true
    : false;
};

const useSetClassForTabs = ({
  appPage,
  defaultTab,
  tabs,
}: TMCLayoutTabComponentProps) => {
  const pathName = usePathname();
  return tabs.map((tab) => {
    return {
      ...tab,
      class: HelperLayoutIsTabSelected(
        pathName,
        appPage,
        tab.compareTab,
        defaultTab
      )
        ? "underline"
        : "",
    };
  });
  //   return [
  //     {
  //       class: fnGetActualUrl(link, EExpenseTabs.NEW) ? "underline" : "",
  //       href: "/private/admin/expenses",
  //       text: "Nuevo",
  //     },
  //     {
  //       class: fnGetActualUrl(link, EExpenseTabs.SEARCH) ? "underline" : "",
  //       href: "/private/admin/expenses/search",
  //       text: "Buscar",
  //     },
  //     {
  //       class: fnGetActualUrl(link, EExpenseTabs.HACIENDA) ? "underline" : "",
  //       href: "/private/admin/expenses/hacienda",
  //       text: "Hacienda",
  //     },
  //   ];
};

type TMCLayoutTabComponentProps = {
  tabs: IMCLayoutTab[];
  appPage: string;
  defaultTab: string;
};
const MCLayoutTabComponent = (props: TMCLayoutTabComponentProps) => {
  const buttonLinks = useSetClassForTabs(props);
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

export default MCLayoutTabComponent;
