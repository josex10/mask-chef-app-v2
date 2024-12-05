"use client";

import React, { useState } from "react";
import { Control, useController } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { IComboboxOption } from "@/utils/interfaces/shared/IComboboxOption";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";

type TMCComboboxField = {
  control: Control<any>;
  name: string;
  label: string;
  placeholder: string;
  placeholderSearch: string;
  data: IComboboxOption[];
  disabled?: boolean;
  isRequired: boolean;
};

const getLabelButton = (
  field: any,
  data: IComboboxOption[],
  isRequired: boolean,
  placeholder: string
) => {
  if (isRequired) {
    return field.value
      ? data.find((single) => single.id === field.value)?.label
      : placeholder;
  } else {
    return field.value === "0" || !field.value
      ? "Todos"
      : data.find((single) => single.id === field.value)?.label;
  }
};

const filterProcess = (
  value: string,
  search: string,
  arrayOfData: IComboboxOption[]
) => {
  const findObject = arrayOfData.find((single) => single.id.includes(value));

  if (findObject) {
    if (findObject.label.toLowerCase().includes(search.toLowerCase())) return 1;
  }
  return 0;
};

const MCComboboxField: React.FC<any> = ({
  control,
  name,
  label,
  placeholder,
  placeholderSearch,
  data,
  disabled,
  isRequired,
}: TMCComboboxField) => {
  const {
    field: { ref, ...field },
  } = useController({
    name,
    control,
  });

  const [popoverOpen, setPopoverOpen] = useState(false);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col w-full">
          <FormLabel className="text-sm">{label}</FormLabel>
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  disabled={disabled ? disabled : false}
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between text-clip overflow-hidden",
                    !field.value && "text-muted-foreground w-full "
                  )}
                >
                  {getLabelButton(field, data, isRequired, placeholder)}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full">
              <Command
                filter={(value, search) => filterProcess(value, search, data)}
              >
                <CommandInput placeholder={placeholderSearch} className="h-9" />
                <CommandList>
                  <CommandEmpty>Not found.</CommandEmpty>
                  <CommandGroup>
                    {!isRequired && data.length && (
                      <CommandItem
                        value={"0"}
                        key={`${label}-empty`}
                        onSelect={() => {
                          field.onChange("0");
                          setPopoverOpen(false);
                        }}
                      >
                        Todos
                        <Check
                          className={cn(
                            "ml-auto",
                            "0" === field.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    )}
                    {data.map((single) => (
                      <CommandItem
                        value={single.id}
                        key={single.id}
                        onSelect={(value) => {
                          field.onChange(value);
                          setPopoverOpen(false);
                        }}
                      >
                        {single.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            single.id === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default MCComboboxField;
