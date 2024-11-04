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
const MCDateField: React.FC<any> = ({
  control,
  name,
  label,
  placeholder,
  isDisabled,
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
              !field.value && "text-muted-foreground"
            )}
            disabled={isDisabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {field.value ? (
              format(field.value, "dd-MM-yyyy")
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start" ref={ref}>
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={field.onChange}
            initialFocus
            {...field}
            id={name}
          />
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  );
};

export default MCDateField;
