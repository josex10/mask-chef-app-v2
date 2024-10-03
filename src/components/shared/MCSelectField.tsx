import React from "react";
import { Control, useController } from "react-hook-form";
import { FormControl, FormItem, FormMessage } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type TMCSelectField = {
  control: Control<any>;
  name: string;
  label: string;
  placeholder: string;
  data: any[];
  showAll: boolean;
};
const MCSelectField: React.FC<any> = ({
  control,
  name,
  label,
  placeholder,
  data,
  showAll,
}: TMCSelectField) => {
  const {
    field: { ref, ...field },
  } = useController({
    name,
    control,
  });

  return (
    <FormItem>
      <span>{label}</span>
      <FormControl>
        <Select
          onValueChange={field.onChange}
          defaultValue={field.value}
          name={`key-${name}`}
        >
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent {...field} ref={ref} id={name}>
            {showAll && (
              <SelectItem key={`defaultValue-${name}`} value={"all"}>
                {"Todos"}
              </SelectItem>
            )}

            {data?.map((type: any) => (
              <SelectItem key={type.key} value={type.key}>
                {type.value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>

      <FormMessage />
    </FormItem>
  );
};

export default MCSelectField;
