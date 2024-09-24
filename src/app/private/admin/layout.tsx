import AdminNavbarComponent from "@/components/private/admin/navbar/AdminNavbar";
import AdminSidebarComponent from "@/components/private/admin/sidebar/AdminSidebar";
import { getCookie } from "@/lib/middleware/cookies";
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
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <AdminSidebarComponent />
      <div className="flex flex-col">
        <AdminNavbarComponent cookie={cookie} />
        <div className="overflow-auto">{children}</div>
      </div>
    </div>
  );
}
