import React from "react";
import { Control, useController } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

type TMCInputField = {
  control: Control<any>;
  name: string;
  label: string;
  placeholder: string;
};

const MCInputField: React.FC<any> = ({
  control,
  name,
  label,
  placeholder,
}: TMCInputField) => {
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
        <FormItem>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              ref={ref}
              id={name}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default MCInputField;
