import { IAdminLayoutTab } from "./IAdminLayoutTab";

export interface IAdminTabsConfiguration  {
    tabs: IAdminLayoutTab[];
    appPage: string;
    defaultTab: string;
};