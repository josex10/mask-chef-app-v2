import { Button } from "@/components/ui/button";

import { Filter, FilterX } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useHandleExpenseParams } from "@/lib/hooks/expenses/useExpenseHandleQueryParams";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { SchemaExpenseFrmFilter } from "@/utils/schemas/expenses/expenses.schema";

import MCInputField from "@/components/shared/MCInputField";
import MCDateRangeField from "@/components/shared/MCDateRangeField";
import MCSelectField from "@/components/shared/MCSelectField";

const dateTypes = [
  { key: EExpenseFilterDateType.Emision, value: "Emisión" },
  { key: EExpenseFilterDateType.Created, value: "Creación" },
  { key: EExpenseFilterDateType.PaymentExp, value: "Pago" },
];

const statusType = [
  { key: EStatus.payed, value: "Pagados" },
  { key: EStatus.pending, value: "Pendientes" },
];

const getProviderList = (data: string | null | undefined) => {
  const providerList = data ? (JSON.parse(data) as IProvidersForSelect[]) : [];
  return providerList.map((provider) => {
    return { key: provider.id, value: provider.name };
  });
};

const ExpenseFilterWrapper = () => {
  const { data } = useGetAllProvidersForSelect();
  const providerList = getProviderList(data);

  const queryClient = useQueryClient();

  const { getActualParams, fnSetParams } = useHandleExpenseParams();
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
      expenseStatus: expenseStatus ? expenseStatus : "all",
      providerId: providerId ? providerId : "all",
    },
  });

  const useHandleAction = async (data: any) => {
    fnSetParams([
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
        value: data.expenseStatus === "all" ? null : data.expenseStatus,
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

  const resetForm = () => {
    form.setValue("dateType", EExpenseFilterDateType.Emision);
    form.setValue("date", { from: new Date(), to: new Date() });
    form.setValue("expenseKey", "");
    form.setValue("expenseStatus", "all");
    form.setValue("providerId", "all");
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
              <MCSelectField
                control={form.control}
                name="dateType"
                label="Tipo de Fecha"
                placeholder="Seleccione"
                data={dateTypes}
              />
              <MCDateRangeField
                control={form.control}
                name="date"
                label="Rango de Fechas"
                placeholder="Seleccione"
              />
            </div>
            <div>
              <MCInputField
                control={form.control}
                name="expenseKey"
                label="Clave"
                placeholder="Ex: 5068937488..."
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col  mt-2 gap-2  h-full justify-between">
            <div className="flex flex-col md:flex-row gap-3 ">
              <MCSelectField
                control={form.control}
                name="expenseStatus"
                label="Estado del Gasto"
                placeholder="Seleccione"
                data={statusType}
                showAll={true}
              />
              <MCSelectField
                control={form.control}
                name="providerId"
                label="Proveedor"
                placeholder="Seleccione"
                data={providerList}
                showAll={true}
              />
            </div>

            <div className="flex flex-row justify-end gap-2 items-end ">
              <Button size={"sm"} variant={"secondary"} onClick={resetForm}>
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

export default ExpenseFilterWrapper;
