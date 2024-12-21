import { getCookie } from "@/lib/middleware/cookies";
import { redirect } from "next/navigation";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AdminSidebar } from "@/lib/shared/AdminSidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AdminNavigationMenu } from "@/lib/shared/AdminNavigationMenu";

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
    <SidebarProvider defaultOpen={false}>
      <AdminSidebar />
      <SidebarInset className="flex flex-col h-screen overflow-x-hidden">
        <AdminNavigationMenu />
        <div className="flex-1 mt-24">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
