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
};
const MCDateRangeField: React.FC<any> = ({
  control,
  name,
  label,
  placeholder,
}: TMCDateRangeField) => {
  const {
    field: { ref, ...field },
  } = useController({
    name,
    control,
  });

  return (
    <FormItem className="flex flex-col">
      <span>{label}</span>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={`btn-${name}`}
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !field.value.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {field.value.from ? (
              field.value.to ? (
                <>
                  {format(field.value.from, "MM-dd-yyyy")} /{" "}
                  {format(field.value.to, "MM-dd-yyyy")}
                </>
              ) : (
                format(field.value.from, "MM-dd-yyyy")
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
