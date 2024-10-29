import React from "react";
import { Control, useController } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { EInputType } from "@/utils/enums/shared/EInputFieldTypes";

type TMCInputField = {
  control: Control<any>;
  name: string;
  label: string;
  placeholder: string;
  type?:EInputType;
};

const MCInputField: React.FC<any> = ({
  control,
  name,
  label,
  placeholder,
  type
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
          <span className="text-sm">{label}</span>
          <FormControl>
            <Input
              type={type ? type : EInputType.text}
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
