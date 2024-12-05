import { IAdminTabsConfiguration } from "@/utils/interfaces/shared/IAdminTabsConfiguration";

const adminPath = "/private/admin";

export const ETabsConfiguration: IAdminTabsConfiguration[] = [
  {
    appPage: "products",
    defaultTab: "new",
    tabs: [
      {
        class: "",
        href: `${adminPath}/products`,
        text: "Nuevo",
        compareTab: "new",
      },
    ],
  },
  {
    appPage: "incomes",
    defaultTab: "new",
    tabs: [
      {
        class: "",
        href: `${adminPath}/incomes`,
        text: "Nuevo",
        compareTab: "new",
      },
      {
        class: "",
        href: `${adminPath}/incomes/search`,
        text: "Buscar",
        compareTab: "search",
      },
    ],
  },
];
