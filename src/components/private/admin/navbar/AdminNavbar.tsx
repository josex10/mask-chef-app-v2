import { redirect } from "next/navigation";

import AdminNavbarSheetComponent from "./AdminNavbarSheet";
import SharedDropdownTheme from "@/components/shared/SharedDropdownTheme";
import { getCookie } from "@/lib/middleware/cookies";
import AdminNavbarStore from "./AdminNavbarStore";
import AdminNavbarRestName from "./AdminNavbarRestName";
import { SignedIn, UserButton } from "@clerk/nextjs";
const AdminNavbarComponent = async () => {
  const cookie = await getCookie();
  if (!cookie) {
    redirect("/sign-out");
  }
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted px-4 lg:h-[60px] lg:px-6 sticky top-0 z-50">
      <AdminNavbarStore cookie={cookie} />
      <AdminNavbarSheetComponent />
      <div className="flex-1"></div>
      <div className="flex flex-row gap-4">
        <AdminNavbarRestName />
        <SignedIn>
          <UserButton/>
        </SignedIn>

        <SharedDropdownTheme />
      </div>
    </header>
  );
};

export default AdminNavbarComponent;
