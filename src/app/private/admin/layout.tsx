import { getCookie } from "@/lib/middleware/cookies";
import { redirect } from "next/navigation";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AdminSidebar } from "@/lib/components/shared/AdminSidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AdminNavigationMenu } from "@/lib/components/shared/AdminNavigationMenu";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = await getCookie();
  if (!cookie) {
    redirect("/sign-out");
  }
  return (
    <SidebarProvider className="" defaultOpen={false}>
      <AdminSidebar />
      <SidebarInset>
        <header className="grid grid-flow-row grid-rows-1 w-full h-16 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 fixed top-0 bg-primary-foreground z-40">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-col shrink-0 w-screen mt-16 xl:w-full ">
          <div className="grid grid-flow-col grid-cols-1 sticky justify-between p-4 bg-background">
            <AdminNavigationMenu />
          </div>
          <div className="w-full">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
