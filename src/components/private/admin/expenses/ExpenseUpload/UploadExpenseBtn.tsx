"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createExpenseFromXml } from "@/lib/actions/private/admin/expenses/UploadExpenseActions";
import useStoreAuth from "@/store/private/admin/auth";
import { cn } from "@/lib/utils";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { useQueryClient } from "@tanstack/react-query";
import { EQueryClientsKeys } from "@/utils/enums/queryClientKeys";
import { useHandleExpenseParams } from "@/lib/hooks/expenses/useExpenseHandleQueryParams";
import { EExpenseQueryParams } from "@/utils/enums/expenseQueryParams";

const UploadExpenseBtn = () => {
  const queryClient = useQueryClient();
  const { useSetActualParams } = useHandleExpenseParams();
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
              // eslint-disable-next-line react-hooks/rules-of-hooks
              useHandleOnClick(xmlResponse.expenseId);
            }
            toast.success(xmlResponse.message);
            setIsLoading(false);
            setFile(null);
          }
        }
      }
    };
  };

  const useHandleOnClick = (expenseId: string) => {
    useSetActualParams([
      { key: EExpenseQueryParams.expenseId, value: expenseId },
    ]).then(() => {
      queryClient.refetchQueries({
        queryKey: [EQueryClientsKeys.expensesTableLastCreated],
      });

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
