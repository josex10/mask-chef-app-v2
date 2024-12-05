import { IAdminNavigationMenubarItem } from "./IAdminNavigationMenubarItem";

export interface IAdminNavigationMenubar {
  icon: React.ReactNode;
  title: string | null;
  noItemHref: string | null;
  isPrimary: boolean;
  items: IAdminNavigationMenubarItem[] | null;
}
