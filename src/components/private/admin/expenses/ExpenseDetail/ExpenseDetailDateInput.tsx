import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useExpenseUpdateExpenseExpirationPaymentDate } from "@/lib/hooks/expenses/useExpenseUpdateExpenseExpirationPaymentDate";
import { cn } from "@/lib/utils";
import { checkIfDatesAreEqualWithoutTime } from "@/utils/helpers/dates";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

type TExpenseDetailDateInputProps = {
  expenseId: string;
  initialDate: Date;
  isDisabled: boolean;
};

const ExpenseDetailDateInput = ({
  expenseId,
  isDisabled,
  initialDate,
}: TExpenseDetailDateInputProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(initialDate);
  const updatePaymentDateMutation =
    useExpenseUpdateExpenseExpirationPaymentDate();

  const handleChange = (data: any) => {
    setIsPopoverOpen(false);

    if (!data || !date) return;
    if (checkIfDatesAreEqualWithoutTime(data, date)) return;
    setDate(data);
    updatePaymentDateMutation.mutate({
      expenseId: expenseId,
      expirationDate: data,
    });
  };
  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        {updatePaymentDateMutation.isPending ? (
          <div className="flex justify-center w-full">
            <LoadingSpinner className={cn("text-gray-500")} />
          </div>
        ) : (
          <Button
            disabled={isDisabled}
            size={"sm"}
            variant={"outline"}
            className={cn(
              "w-[150px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "dd/MM/yyyy") : <span>Seleccione</span>}
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default ExpenseDetailDateInput;
