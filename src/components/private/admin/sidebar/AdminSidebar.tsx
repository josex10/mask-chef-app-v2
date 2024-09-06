import AdminSidebarLinksComponent from "./AdminSidebarLink";
import AdminSidebarBrandComponent from "./AdminSidebarBrand";

const AdminSidebarComponent = () => {
  return (
    <div className="hidden border-r bg-muted md:block">
      <div className="flex h-full min-h-screen flex-col gap-2  fixed">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <AdminSidebarBrandComponent />
        </div>
        <div className="flex-1">
          <AdminSidebarLinksComponent />
        </div>
      </div>
    </div>
  );
};

export default AdminSidebarComponent;
