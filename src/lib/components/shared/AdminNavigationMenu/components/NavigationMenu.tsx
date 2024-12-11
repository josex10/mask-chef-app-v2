"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { EllipsisVertical, PlusCircle, Settings } from "lucide-react";
import { IAdminNavigationMenu } from "../interface";
import { EKeyPaths } from "../enums";

const getKeyPath = (path: string) => {
  const replaceMainPath = path.replace("/private/admin/", "");
  const splitPathChildren = replaceMainPath.split("/");
  return splitPathChildren[0];
};

export const ArrayOfNavigationMenuItems: IAdminNavigationMenu[] = [
  {
    keyPath: EKeyPaths.PRODUCTS,
    pageTitle: "Productos",
    menuBar: [
      {
        icon: <PlusCircle size={16} />,
        title: null,
        noItemHref: "/private/admin/products/create",
        isPrimary: true,
        items: null,
      },
      {
        icon: <EllipsisVertical size={16} />,
        title: null,
        noItemHref: null,
        isPrimary: false,
        items: [
          {
            title: "Lista",
            href: "/private/admin/products",
          },
          {
            title: "Nuevo",
            href: "/private/admin/products/create",
          },
        ],
      },
      {
        icon: <Settings size={16} />,
        title: null,
        noItemHref: null,
        isPrimary: false,
        items: [
          {
            title: "U.Medida",
            href: "/private/admin/products",
          },
          {
            title: "Categorías",
            href: "/private/admin/products/create",
          },
        ],
      },
    ],
  },
];

const NavigationMenu = () => {
  const usePath = usePathname();
  const keyPath = getKeyPath(usePath);
  const getListItemsOfActualPath = ArrayOfNavigationMenuItems.find(
    (item) => item.keyPath === keyPath
  );

  return (
    <section className="flex flex-row justify-between">
      <h2 className="text-2xl">{getListItemsOfActualPath?.pageTitle}</h2>
      <Menubar>
        {getListItemsOfActualPath?.menuBar.map((menu, index) => (
          <MenubarMenu key={`${index}-${menu.title}`}>
            <MenubarTrigger className={cn(menu.isPrimary && "bg-green-600")}>
              {menu.noItemHref ? (
                <Link href={menu.noItemHref}>
                  {menu.icon && menu.icon}
                  {menu.title && menu.title}
                </Link>
              ) : (
                <>
                  {menu.icon && menu.icon}
                  {menu.title && menu.title}
                </>
              )}
            </MenubarTrigger>
            {menu.items && (
              <MenubarContent>
                {menu.items?.map((item, index) => (
                  <MenubarItem key={`${index}-${item.title}`}>
                    <Link href={item.href} passHref>
                      {item.title}
                    </Link>
                  </MenubarItem>
                ))}
              </MenubarContent>
            )}
          </MenubarMenu>
        ))}
      </Menubar>
    </section>
  );
};

export default NavigationMenu;
