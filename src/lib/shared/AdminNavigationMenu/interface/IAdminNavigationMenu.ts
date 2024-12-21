import { EKeyPaths } from "../enums";
import { IAdminNavigationMenubar } from "./IAdminNavigationMenubar";

export interface IAdminNavigationMenu {
  keyPath: EKeyPaths;
  pageTitle: string;
  menuBar: IAdminNavigationMenubar[];
}
