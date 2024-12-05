"use client";

import { useRouterPush } from "@/lib/hooks/shared/useRouterPush";
import { HelperSharedCreateOrRemoveQueryString } from "@/utils/helpers/HelperSharedCreateOrRemoveQueryString";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

export const useHandlePagination = () => {
  const [paginationLoader, setPaginationLoader] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const routerPush = useRouterPush();

  const paginationButton = async (
    type: "PREV" | "NEXT",
    pageNumber: number
  ) => {
    try {
      setPaginationLoader(true);
      if (type === "NEXT") pageNumber = pageNumber ? pageNumber + 1 : 2;
      if (type === "PREV")
        pageNumber = pageNumber && pageNumber > 1 ? pageNumber - 1 : pageNumber;
      const arrayOfParams = [
        { name: "page", value: `${pageNumber}`, needToDelete: false },
      ];
      await routerPush(
        `${pathname}?${HelperSharedCreateOrRemoveQueryString({
          data: arrayOfParams,
          searchParams,
        })}`
      );
      setPaginationLoader(false);
    } catch (error) {
      setPaginationLoader(false);
    }
  };

  return { paginationLoader, paginationButton };
};
