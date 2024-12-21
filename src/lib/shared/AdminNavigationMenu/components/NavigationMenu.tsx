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
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

const getKeyPath = (path: string) => {
  const replaceMainPath = path.replace("/private/admin/", "");
  const splitPathChildren = replaceMainPath.split("/");
  return splitPathChildren[0];
};

const generateBreadcrumbs = (pathname: string) => {
  const pathSegments = pathname.split("/").filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    return { segment, href };
  });
  return breadcrumbs;
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
  const pathname = usePathname();
  const { open } = useSidebar();
  const keyPath = getKeyPath(pathname);
  const getListItemsOfActualPath = ArrayOfNavigationMenuItems.find(
    (item) => item.keyPath === keyPath
  );
  const breadcrumbs = generateBreadcrumbs(pathname);

  return (
    <header className="grid grid-flow-row grid-rows-1 h-20 w-full items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 fixed top-0 bg-primary-foreground z-40">
      <div className="flex gap-2 justify-between px-4">
        <div className="flex  items-center">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb className="hidden md:block">
            <BreadcrumbList>
              {breadcrumbs.map(
                (breadcrumb, index) =>
                  breadcrumb.segment !== "private" &&
                  breadcrumb.segment !== "admin" && (
                    <>
                      <BreadcrumbItem key={`${breadcrumb.href}-${index}-item`}>
                        <BreadcrumbLink
                          href={breadcrumb.href}
                          key={`${index}-link`}
                        >
                          {breadcrumb.segment}
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      {index < breadcrumbs.length - 1 && (
                        <BreadcrumbSeparator key={`${index}-separator`} />
                      )}
                    </>
                  )
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <Menubar className={cn(open ? "xl:mr-64" : "xl:mr-20")}>
          {getListItemsOfActualPath?.menuBar.map((menu, index) => (
            <MenubarMenu key={`${index}-${menu.title}`}>
              <MenubarTrigger
                className={cn(menu.isPrimary && "bg-green-600")}
                key={`${index}-trigger-${menu.title}`}
              >
                {menu.noItemHref ? (
                  <Link
                    href={menu.noItemHref}
                    key={`${index}-link-${menu.title}`}
                  >
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
      </div>
    </header>
  );
};

export default NavigationMenu;
