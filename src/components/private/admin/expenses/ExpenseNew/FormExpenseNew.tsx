import MCDateRangeField from "@/components/shared/MCDateRangeField";
import MCInputField from "@/components/shared/MCInputField";
import MCSelectField from "@/components/shared/MCSelectField";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useGetAllProvidersForSelect } from "@/lib/hooks/providers/providersHooks";
import { IProvidersForSelect } from "@/utils/interfaces/private/admin/providersInterfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { FilterX, Search } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

//TODO: NEED TO BE REFACTOR IS USED ON 2 COMPONENTS
const getProviderList = (data: string | null | undefined) => {
  const providerList = data ? (JSON.parse(data) as IProvidersForSelect[]) : [];
  return providerList.map((provider) => {
    return { key: provider.id, value: provider.name };
  });
};

const FormExpenseNew = () => {
  const { data } = useGetAllProvidersForSelect();
  const providerList = getProviderList(data);

  const queryClient = useQueryClient();



  //CLAVE
  //numeroConsecutivo
  //fechaEmision

  //TotalComprobante
  
  //Detalle
  //MontoTotalLinea




  const form = useForm<z.infer<typeof SchemaExpenseFrmFilter>>({
    resolver: zodResolver(SchemaExpenseFrmFilter),
    //   defaultValues: {
    //     dateType: dateType ? dateType : "all",
    //     date: {
    //       from: startDate
    //         ? checkUnixStringDateIsValid(startDate)
    //           ? convertUnixToDate(Number(startDate))
    //           : new Date()
    //         : new Date(),
    //       to: endDate
    //         ? checkUnixStringDateIsValid(endDate)
    //           ? convertUnixToDate(Number(endDate))
    //           : new Date()
    //         : new Date(),
    //     },
    //     expenseKey: expenseKey ? expenseKey : "",
    //     expenseStatus: expenseStatus ? expenseStatus : "all",
    //     providerId: providerId ? providerId : "all",
    //   },
  });

  const useHandleAction = async (data: any) => {
    //   fnSetParams([
    //     {
    //       key: EExpenseQueryParams.startDate,
    //       value: data.date.from ? String(converDateToUnix(data.date.from)) : null,
    //     },
    //     {
    //       key: EExpenseQueryParams.endDate,
    //       value: data.date.to ? String(converDateToUnix(data.date.to)) : null,
    //     },
    //     { key: EExpenseQueryParams.dateType, value: data.dateType },
    //     { key: EExpenseQueryParams.expenseKey, value: data.expenseKey },
    //     {
    //       key: EExpenseQueryParams.expenseStatus,
    //       value: data.expenseStatus === "all" ? null : data.expenseStatus,
    //     },
    //     {
    //       key: EExpenseQueryParams.providerId,
    //       value: data.providerId === "all" ? null : data.providerId,
    //     },
    //   ]).then(() => {
    //     queryClient.refetchQueries({
    //       queryKey: [EQueryClientsKeys.expensesTable],
    //     });
    //   });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(useHandleAction)}
        className="flex flex-col gap-2 xl:flex-row"
      >
        <Card className="xl:w-[50%]">
          <CardContent className="flex flex-col gap-2 mt-2">
            <div className="flex flex-col md:flex-row gap-3 items-center">
              <MCSelectField
                control={form.control}
                name="dateType"
                label="Tipo de Fecha"
                placeholder="Seleccione"
                data={[]}
                showAll={true}
              />
              <MCDateRangeField
                control={form.control}
                name="date"
                label="Rango de Fechas"
                placeholder="Seleccione"
                isDisabled={
                  form.watch("dateType") === "" ||
                  form.watch("dateType") === "all"
                }
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

        <Card className="xl:w-[50%]">
          <CardContent className="flex flex-col gap-2 mt-2 xl:h-[100%] xl:justify-between">
            <div className="flex flex-col md:flex-row gap-3 ">
              <MCSelectField
                control={form.control}
                name="expenseStatus"
                label="Estado del Gasto"
                placeholder="Seleccione"
                data={[]}
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
              <Button size={"sm"} variant={"secondary"}>
                <FilterX />
                Cerrar
              </Button>
              <Button type="submit" size={"sm"}>
                <Search />
                Agregar
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};

export default FormExpenseNew;
