import Link from "next/link";
import React from "react";
import Image from "next/image";

const AdminSidebarBrandComponent = () => {
  return (
    <Link href="/" className="flex items-center gap-2 font-semibold">
      <Image
        src="/logo/maskChef.png"
        alt="Mask Code Logo"
        width={60}
        height={60}
      />

      <span className="font-['LogoFont']">Mask Chef</span>
    </Link>
  );
};

export default AdminSidebarBrandComponent;
