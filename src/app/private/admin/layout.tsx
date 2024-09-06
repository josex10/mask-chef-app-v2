import AdminNavbarComponent from "@/components/private/admin/navbar/AdminNavbar";
import AdminSidebarComponent from "@/components/private/admin/sidebar/AdminSidebar";
import { PrivateProvider } from "./provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <AdminSidebarComponent />
      <div className="flex flex-col">
        <AdminNavbarComponent />
        <div className="overflow-auto">
          <PrivateProvider>{children}</PrivateProvider>
        </div>
      </div>
    </div>
  );
}
