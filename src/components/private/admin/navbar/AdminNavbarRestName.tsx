"use client";

import useStoreAuth from "@/store/private/admin/auth";

const AdminNavbarRestName = () => {
  const restaurantSelected = useStoreAuth((state) => state.selectedRestaurant);
  return (
    <>
      <span>{restaurantSelected?.name}</span>
    </>
  );
};

export default AdminNavbarRestName;
