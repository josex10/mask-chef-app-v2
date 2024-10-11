import AdminSidebarLinksComponent from "./AdminSidebarLink";
import AdminSidebarBrandComponent from "./AdminSidebarBrand";

const AdminSidebarComponent = () => {
  return (
    // <div className="hidden border-r bg-muted xl:block">
    <div className="hidden border-r xl:block xl:w-[17vw]">
      <div className="flex h-full min-h-screen flex-col gap-2 ">
        {/* <div className="flex  items-center border-b px-4 h-[8vh] bg-muted sticky top-0"> */}
        <div className="flex  items-center border-b px-4 h-[8vh] bg-muted">
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
