import AdminNavbarComponent from "@/components/private/admin/navbar/AdminNavbar";
import AdminSidebarComponent from "@/components/private/admin/sidebar/AdminSidebar";
import { getCookie } from "@/lib/middleware/cookies";
import { AdminNavigationMenu } from "@/lib/components/shared/AdminNavigationMenu";
import { redirect } from "next/navigation";

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
    <div className="min-h-screen w-full xl:flex xl:flex-row">
      <div className="xl:fixed">
        <AdminSidebarComponent />
      </div>
      <div className="flex flex-col w-full xl:ml-[17vw] xl:overflow-x-hidden xl:overflow-y-hidden">
        <AdminNavbarComponent cookie={cookie} />
        <div className="overflow-auto p-5 w-full">
          <div className="flex flex-col gap-2 w-full">
            {/* <MCLayoutTabComponent/> */}
            <AdminNavigationMenu />
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
