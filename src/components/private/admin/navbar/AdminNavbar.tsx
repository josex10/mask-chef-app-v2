"use client";

import AdminNavbarSheetComponent from "./AdminNavbarSheet";
import SharedDropdownTheme from "@/components/shared/SharedDropdownTheme";
import AdminNavbarRestName from "./AdminNavbarRestName";
import { SignedIn, UserButton } from "@clerk/nextjs";
import IAuthProfile from "@/utils/interfaces/private/admin/profile";
import useStoreAuth from "@/store/private/admin/auth";
import { useEffect } from "react";
type TAdminNavbarComponent = {
  cookie: IAuthProfile;
};

const AdminNavbarComponent = ({ cookie }: TAdminNavbarComponent) => {
  const { login } = useStoreAuth((state) => state);

  useEffect(() => {
    login(cookie);
  }, [login, cookie]);

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted px-4 lg:h-[60px] lg:px-6 sticky top-0 z-50">
      <AdminNavbarSheetComponent />
      <div className="flex-1"></div>
      <div className="flex flex-row gap-4">
        <AdminNavbarRestName />
        <SignedIn>
          <UserButton />
        </SignedIn>

        <SharedDropdownTheme />
      </div>
    </header>
  );
};

export default AdminNavbarComponent;
