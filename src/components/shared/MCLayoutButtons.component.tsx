"use client";

import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import { ETabsConfiguration } from "@/utils/enums/shared/EAdminTabsConfiguration";


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

const useSetClassForTabs = () => {
  const pathName = usePathname();
  const tabConfiguration = ETabsConfiguration.find((tab) => {
    if (pathName.includes(tab.appPage)) {
      return tab;
    }
  });

  if(!tabConfiguration) return null;

  const {tabs, appPage, defaultTab} = tabConfiguration;
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
};

const MCLayoutTabComponent = () => {
  const buttonLinks = useSetClassForTabs();
  if(!buttonLinks) return null;
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
