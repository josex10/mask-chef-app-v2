"use client";
import { Button } from "@/components/ui/button";
import { EDashboardButtonFilterType } from "@/utils/enums/dashboard/EDashboardButtonFilterType";
import { addMonths, fromUnixTime, getUnixTime, subMonths } from "date-fns";
import { ChevronLeft, ChevronRight, PiIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const isDisableButton = (
  date: string | null,
  type: EDashboardButtonFilterType
) => {
  if (!date && type === EDashboardButtonFilterType.NEXT) {
    return true;
  }

  if (date && type === EDashboardButtonFilterType.NEXT) {
    const actualDate = new Date();
    const dateToCompare = fromUnixTime(Number(date));
    if (
      actualDate.getMonth() === dateToCompare.getMonth() &&
      actualDate.getFullYear() === dateToCompare.getFullYear()
    ) {
      return true;
    }
  }

  return false;
};

const modifyDateUnix = (unixDate: string | null, type: EDashboardButtonFilterType) => {
  let adjustedDate: Date = new Date();
  if (unixDate === null) {
    return getUnixTime(adjustedDate).toString();
  }
  const date = fromUnixTime(Number(unixDate));
  if (type === EDashboardButtonFilterType.NEXT) {
    adjustedDate = addMonths(date, 1);
  } else if (type === EDashboardButtonFilterType.PREV) {
    adjustedDate = subMonths(date, 1);
  }
  return getUnixTime(adjustedDate).toString();
};

const DashboardDateButton = ({
  type,
}: {
  type: EDashboardButtonFilterType;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dateParam = searchParams.get("date");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleClick = async (e: any) => {
    const date = modifyDateUnix(dateParam, type);
    router.push(
      pathname +
        "?" +
        createQueryString("date", date)
    );
  };

  return (
    <form action={handleClick}>
      <input type="hidden" value={""} name="color" />
      <Button disabled={isDisableButton(dateParam, type)} type="submit" variant="ghost">
        
        
        {type === EDashboardButtonFilterType.NEXT ? <ChevronRight height={24} />: <ChevronLeft height={24} />}
      </Button>
    </form>
  );
};

export default DashboardDateButton;
