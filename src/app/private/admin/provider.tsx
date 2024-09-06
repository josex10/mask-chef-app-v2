"use client";

import useStoreAuth from "@/store/private/admin/auth";

export function PrivateProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const rest = useStoreAuth((state) => state.selectedRestaurant);
  //TODO: CREATE A LODING PAGE 
  if(!rest) return (<div>loading TODO PENDING...</div>)
  return <>{children}</>;
}
