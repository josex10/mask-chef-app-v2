import React from "react";
import { Control, useController } from "react-hook-form";
import { FormItem, FormMessage } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";

type TMCDateRangeField = {
  control: Control<any>;
  name: string;
  label: string;
  placeholder: string;
  isDisabled: boolean;
};
const MCDateRangeField: React.FC<any> = ({
  control,
  name,
  label,
  placeholder,
  isDisabled
}: TMCDateRangeField) => {
  const {
    field: { ref, ...field },
  } = useController({
    name,
    control,
  });

  return (
    <FormItem className="w-full">
      <span className="text-sm">{label}</span>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={`btn-${name}`}
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !field.value.from && "text-muted-foreground"
            )}
            disabled={isDisabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {field.value.from ? (
              field.value.to ? (
                <>
                  {format(field.value.from, "dd-MM-yyyy")} /{" "}
                  {format(field.value.to, "dd-MM-yyyy")}
                </>
              ) : (
                format(field.value.from, "dd-MM-yyyy")
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start" ref={ref}>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={field.value?.from}
            selected={{ from: field.value.from, to: field.value.to }}
            onSelect={field.onChange}
            numberOfMonths={2}
            {...field}
            id={name}
          />
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  );
};

export default MCDateRangeField;
