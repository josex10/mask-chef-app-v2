"use client";

import { CardTitle } from "@/components/ui/card";
import useStoreAuth from "@/store/private/admin/auth";
import { Store } from "lucide-react";

const AdminNavbarRestName = () => {
  const {selectedRestaurant} = useStoreAuth((state) => state);
  return (
    <CardTitle className="flex flex-col justify-center items-center text-sm">
      <div className="hidden lg:block">
        <div className="flex flex-row justify-center items-center gap-2">
          <Store />
          {selectedRestaurant?.name && <p>{selectedRestaurant.name}</p>}
        </div>
      </div>
    </CardTitle>
  );
};

export default AdminNavbarRestName;
