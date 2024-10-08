"use client";

import { useState } from "react";
import { redirect, usePathname } from "next/navigation";
import toast from "react-hot-toast";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { createExpenseFromXml } from "@/lib/actions/private/admin/expenses/UploadExpenseActions";

import useStoreAuth from "@/store/private/admin/auth";
import { cn } from "@/lib/utils";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import {
  generateExpensePath,
  useGetExpensesQueryParams,
} from "@/utils/helpers/expenses";
import { useRouterPush } from "@/lib/hooks/shared/useRouterPush";
import { useQueryClient } from "@tanstack/react-query";
import { EQueryClientsKeys } from "@/utils/enums/queryClientKeys";
import { checkIfADateIsBetweenTwoDates } from "@/utils/helpers/dates";
import { convertUnixToDate } from "../../../../../utils/helpers/dates";

const UploadExpenseBtn = () => {
  const pathName = usePathname();
  const routerPuskHook = useRouterPush();
  const queryClient = useQueryClient();

  const { startDate, endDate, offset } = useGetExpensesQueryParams();

  const { handleSubmit } = useForm();

  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const restaurantSelected = useStoreAuth((state) => state.selectedRestaurant);
  const user = useStoreAuth((state) => state.user);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const fileRules = (file: File) => {
    if (file.size > 1000000) {
      toast.error("File size is too large");
      return "File size is too large";
    }

    if (file.type !== "text/xml") {
      toast.error("File type is not supported");
      return "File type is not supported";
    }

    return null;
  };

  const onSubmit = async () => {
    if (!file) return;
    setIsLoading(true);
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = async function (evt) {
      if (evt.target?.result) {
        const rules = fileRules(file);
        if (!rules) {
          if (!restaurantSelected || !user) {
            redirect("/sign-out");
          }
          const xmlResponse = await createExpenseFromXml(
            evt.target.result as string,
            restaurantSelected,
            user
          );
          if (xmlResponse.error) {
            toast.error(xmlResponse.message);
            setIsLoading(false);
          } else {
            if (xmlResponse.expenseId && xmlResponse.expenseDate) {
              handleOnClick(xmlResponse.expenseId, xmlResponse.expenseDate);
            }
            toast.success(xmlResponse.message);
            setIsLoading(false);
            setFile(null);
          }
        }
      }
    };
  };

  const handleOnClick = (expenseId: string, expenseDate: Date) => {
    const newUrl = `${pathName}${generateExpensePath(
      startDate,
      endDate,
      expenseId, 
      offset
    )}`;
    routerPuskHook(newUrl).then(() => {
      const needRefetch = checkIfADateIsBetweenTwoDates(
        expenseDate,
        convertUnixToDate(startDate),
        convertUnixToDate(endDate)
      );

      if (needRefetch) {
        queryClient.refetchQueries({
          queryKey: [EQueryClientsKeys.expensesTable],
        });
        queryClient.refetchQueries({
          queryKey: [EQueryClientsKeys.expensesFinantialInfo],
        });
      }
      queryClient.refetchQueries({
        queryKey: [EQueryClientsKeys.singleExpense],
      });
    });
  };

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="flex justify-center w-full">
          <LoadingSpinner className={cn("text-gray-500")} />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              id="expenseFile"
              type="file"
              accept=".xml"
              name="expenseFile"
              onChange={handleFileChange}
            />
            <Button type="submit">Agregar</Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UploadExpenseBtn;
