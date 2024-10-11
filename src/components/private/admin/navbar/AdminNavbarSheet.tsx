import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import AdminSidebarLinksComponent from "../sidebar/AdminSidebarLink";
import AdminSidebarBrandComponent from "../sidebar/AdminSidebarBrand";

const AdminNavbarSheetComponent = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 xl:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <AdminSidebarBrandComponent />
        <AdminSidebarLinksComponent />
      </SheetContent>
    </Sheet>
  );
};

export default AdminNavbarSheetComponent;
