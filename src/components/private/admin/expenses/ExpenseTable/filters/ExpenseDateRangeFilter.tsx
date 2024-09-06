"use client";

import * as React from "react";
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
} from "@/utils/helpers/dates";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getStartAndEndDateBasedOnDateString } from "@/utils/helpers/expenses";

export function ExpenseDateRangeFilter({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const expenseId = searchParams.get("expenseId");

  const { startDate, endDate } = getStartAndEndDateBasedOnDateString(searchParams.get("startDate"), searchParams.get("endDate"));

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: startDate,
    to: endDate,
  });

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
              if (!e || !e?.from || !e?.to) return;

              const startDate = converDateToUnix(e.from);
              if (!checkIfUnixDateIsValid(startDate)) return;
              const endDate = converDateToUnix(e.to);
              if (!checkIfUnixDateIsValid(endDate)) return;
              router.push(
                `${pathName}?startDate=${startDate}&endDate=${endDate}${expenseId && `&expenseId=${expenseId}`}`,
                { scroll: false }
              );
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
