"use client";

import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Control, useController } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";

type TMCCheckboxField = {
  control: Control<any>;
  name: string;
  label: string;
  description?: string;
  disabled?: boolean;
};

const MCCheckboxField: React.FC<any> = ({
  control,
  name,
  label,
  description,
  disabled,
}: TMCCheckboxField) => {
  const {
    field: { ref, ...field },
  } = useController({
    name,
    control,
  });

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 ">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>{label}</FormLabel>
            {description && <FormDescription>{description}</FormDescription>}
          </div>
        </FormItem>
      )}
    />
  );
};

export default MCCheckboxField;
