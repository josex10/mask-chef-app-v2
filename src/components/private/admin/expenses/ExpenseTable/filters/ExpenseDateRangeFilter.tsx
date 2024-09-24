"use client";

import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { CalendarX } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  checkIfUnixDateIsValid,
  converDateToUnix,
  convertUnixToDate,
} from "@/utils/helpers/dates";
import { usePathname, useRouter } from "next/navigation";
import {
  generateExpensePath,
  useGetExpensesQueryParams,
} from "@/utils/helpers/expenses";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { EQueryClientsKeys } from "@/utils/enums/queryClientKeys";
import { useRouterPush } from "@/lib/hooks/shared/useRouterPush";

const validateUnitDates = (e: DateRange | undefined) => {
  if (!e || !e?.from || !e?.to) return;
  const startDate = converDateToUnix(e.from);
  if (!checkIfUnixDateIsValid(startDate)) return null;
  const endDate = converDateToUnix(e.to);
  if (!checkIfUnixDateIsValid(endDate)) return null;

  return { startDate, endDate };
};

export function ExpenseDateRangeFilter({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const pathName = usePathname();
  const queryClient = useQueryClient();
  const routerPuskHook = useRouterPush();

  const {
    startDate: startDateUnix,
    endDate: endDateUnix,
    expenseId,
    offset,
  } = useGetExpensesQueryParams();

  const [date, setDate] = useState<DateRange | undefined>({
    from: convertUnixToDate(startDateUnix),
    to: convertUnixToDate(endDateUnix),
  });

  const updateQuery = async (e: DateRange | undefined) => {
    const unixValues = validateUnitDates(e);
    if (!unixValues) return;

    const newUrl = `${pathName}${generateExpensePath(
      unixValues.startDate,
      unixValues.endDate,
      expenseId,
      offset
    )}`;
    routerPuskHook(newUrl).then(() => {
      queryClient.refetchQueries({
        queryKey: [EQueryClientsKeys.expensesTable],
      });
      queryClient.refetchQueries({
        queryKey: [EQueryClientsKeys.expensesFinantialInfo],
      });
    });
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarX className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(e) => {
              setDate(e);
              updateQuery(e);
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
