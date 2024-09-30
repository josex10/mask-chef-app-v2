import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Filter, FilterX } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useHandleExpenseParams } from "@/lib/hooks/expenses/useExpenseHandleQueryParams";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { EMessages } from "@/utils/enums/messages";
import { useGetAllProvidersForSelect } from "@/lib/hooks/providers/providersHooks";
import { IProvidersForSelect } from "@/utils/interfaces/private/admin/providersInterfaces";
import { EExpenseQueryParams } from "@/utils/enums/expenseQueryParams";
import { EExpenseFilterDateType, EStatus } from "@/utils/enums/expensesEnums";
import {
  checkUnixStringDateIsValid,
  converDateToUnix,
  convertUnixToDate,
} from "@/utils/helpers/dates";
import { EQueryClientsKeys } from "@/utils/enums/queryClientKeys";
import { useQueryClient } from "@tanstack/react-query";
import { IExpenseFrmFilter } from "@/utils/interfaces/expenses/expenses.interface";
import { SchemaExpenseFrmFilter } from "@/utils/schemas/expenses/expenses.schema";

export const ExpenseFilterlSchema = z.object({
  dateType: z
    .string({ message: EMessages.inputErrorTypeString })
    .trim()
    .min(1, { message: EMessages.inputErrorRequired })
    .max(100, { message: `${EMessages.inputErrorMaxString} 100` }),
  date: z
    .object(
      {
        from: z.date().optional(),
        to: z.date().optional(),
      },
      { required_error: EMessages.inputErrorTypeDate }
    )
    .refine((date) => {
      return !!date.from;
    }, EMessages.inputErrorTypeDate),
  expenseKey: z
    .string({ message: EMessages.inputErrorTypeString })
    .trim()
    .max(100, { message: `${EMessages.inputErrorMaxString} 50` })
    .optional()
    .or(z.literal("")),
  expenseStatus: z
    .string({ message: EMessages.inputErrorTypeString })
    .trim()
    .max(100, { message: `${EMessages.inputErrorMaxString} 50` })
    .optional()
    .or(z.literal("")),
  providerId: z
    .string({ message: EMessages.inputErrorTypeString })
    .trim()
    .max(100, { message: `${EMessages.inputErrorMaxString} 50` })
    .optional()
    .or(z.literal("")),
});

const ExpenseFilterWrapper = () => {
  const { data } = useGetAllProvidersForSelect();

  const queryClient = useQueryClient();

  const { getActualParams, useSetActualParams } = useHandleExpenseParams();
  const {
    startDate,
    endDate,
    dateType,
    expenseKey,
    expenseStatus,
    providerId,
  } = getActualParams;

  const form = useForm<z.infer<typeof SchemaExpenseFrmFilter>>({
    resolver: zodResolver(SchemaExpenseFrmFilter),
    defaultValues: {
      dateType: dateType ? dateType : EExpenseFilterDateType.Emision,
      date: {
        from: startDate
          ? checkUnixStringDateIsValid(startDate)
            ? convertUnixToDate(Number(startDate))
            : new Date()
          : new Date(),
        to: endDate
          ? checkUnixStringDateIsValid(endDate)
            ? convertUnixToDate(Number(endDate))
            : new Date()
          : new Date(),
      },
      expenseKey: expenseKey ? expenseKey : "",
      expenseStatus: expenseStatus ? expenseStatus : EStatus.none,
      providerId: providerId ? providerId : "all",
    },
  });

  const useHandleAction = async (data: any) => {
    useSetActualParams([
      {
        key: EExpenseQueryParams.startDate,
        value: data.date.from ? String(converDateToUnix(data.date.from)) : null,
      },
      {
        key: EExpenseQueryParams.endDate,
        value: data.date.to ? String(converDateToUnix(data.date.to)) : null,
      },
      { key: EExpenseQueryParams.dateType, value: data.dateType },

      { key: EExpenseQueryParams.expenseKey, value: data.expenseKey },
      {
        key: EExpenseQueryParams.expenseStatus,
        value: data.expenseStatus === EStatus.none ? null : data.expenseStatus,
      },
      {
        key: EExpenseQueryParams.providerId,
        value: data.providerId === "all" ? null : data.providerId,
      },
    ]).then(() => {
      queryClient.refetchQueries({
        queryKey: [EQueryClientsKeys.expensesTable],
      });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(useHandleAction)}
        className="flex flex-col md:flex-row gap-2"
      >
        <Card>
          <CardContent className="flex flex-col gap-2 mt-2">
            <div className="flex flex-col md:flex-row gap-3 items-center">
              <FrmFieldDateType form={form} />
              <FrmFieldDateRange form={form} />
            </div>
            <div>
              <FrmFieldExpenseKey form={form} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col  mt-2 gap-2  h-full justify-between">
            <div className="flex flex-col md:flex-row gap-3 ">
              <FrmFieldStatus form={form} />
              <FrmFieldProvider form={form} data={data} />
            </div>

            <div className="flex flex-row justify-end gap-2 items-end ">
              <Button
                size={"sm"}
                variant={"secondary"}
                onClick={() => form.reset()}
              >
                <FilterX />
                Limpiar
              </Button>
              <Button type="submit" size={"sm"}>
                <Filter />
                Filtrar
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};

const FrmFieldDateType = ({ form }: IExpenseFrmFilter) => {
  const dateTypes = [
    { id: EExpenseFilterDateType.Emision, type: "Emisión" },
    { id: EExpenseFilterDateType.Created, type: "Creación" },
    { id: EExpenseFilterDateType.PaymentExp, type: "Pago" },
  ];
  return (
    <FormField
      control={form.control}
      name="dateType"
      render={({ field }) => (
        <FormItem className="w-[185px]">
          <FormLabel>Tipo de Fecha</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            {...field}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {dateTypes?.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const FrmFieldDateRange = ({ form }: IExpenseFrmFilter) => {
  return (
    <FormField
      control={form.control}
      name="date"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Tipo de Fecha</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
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
                  <span>Seleccione una fecha</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={field.value?.from}
                selected={{ from: field.value.from, to: field.value.to }}
                onSelect={field.onChange}
                numberOfMonths={2}
                {...field}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const FrmFieldExpenseKey = ({ form }: IExpenseFrmFilter) => {
  return (
    <FormField
      control={form.control}
      name="expenseKey"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Clave</FormLabel>
          <FormControl>
            <Input
              // disabled={mutationExpenseAddPayment.isPending}
              placeholder="Ex: 5068937488..."
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const FrmFieldStatus = ({ form }: IExpenseFrmFilter) => {
  const statusType = [
    { value: EStatus.none, label: "Ninguno" },
    { value: EStatus.payed, label: "Pagados" },
    { value: EStatus.pending, label: "Pendientes" },
  ];
  form.getValues("dateType");
  return (
    <FormField
      control={form.control}
      name="expenseStatus"
      render={({ field }) => (
        <FormItem className="w-[185px]">
          <FormLabel>Estado del Gasto</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            {...field}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {statusType?.map((type) => (
                <SelectItem key={String(type.value)} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const FrmFieldProvider = ({ form, data }: IExpenseFrmFilter) => {
  const providerList = data ? (JSON.parse(data) as IProvidersForSelect[]) : [];
  return (
    <FormField
      control={form.control}
      name="providerId"
      render={({ field }) => (
        <FormItem className="w-[185px]">
          <FormLabel>Proveedor</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            {...field}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem key="defaultValueSelectforproviders" value={"all"}>
                {"Todos los Proveedores"}
              </SelectItem>
              {providerList?.map((provider) => (
                <SelectItem key={String(provider.id)} value={provider.id}>
                  {provider.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ExpenseFilterWrapper;
