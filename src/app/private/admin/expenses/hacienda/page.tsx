"use client";

import { Button } from "@/components/ui/button";

import { Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import MCSelectField from "@/components/shared/MCSelectField";
import { ExpenseFrmHaciendaSchema } from "@/utils/schemas/expenses/expensesFrmHacienda.schema";
import { useQueryClient } from "@tanstack/react-query";
import { EQueryClientsKeys } from "@/utils/enums/queryClientKeys";
import { fetchDataForHaciendaAction } from "@/lib/actions/private/admin/expenses/ExpenseFetchDataForHacienda.action";

import { useExpenseDataHacienta } from "@/lib/hooks/expenses/useExpenseDataHacienda";
import { IExpenseDataHacienda } from "@/utils/interfaces/private/admin/expenseDataHacienda.interface";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TextFieldForCurrency from "@/components/shared/TextFieldForCurrency";

const listOfMonths = [
  { key: "1", value: "Enero" },
  { key: "2", value: "Febrero" },
  { key: "3", value: "Marzo" },
  { key: "4", value: "Abril" },
  { key: "5", value: "Mayo" },
  { key: "6", value: "Junio" },
  { key: "7", value: "Julio" },
  { key: "8", value: "Agosto" },
  { key: "9", value: "Septiembre" },
  { key: "10", value: "Octubre" },
  { key: "11", value: "Noviembre" },
  { key: "12", value: "Diciembre" },
];

const listOFYears = [
  { key: "2021", value: 2021 },
  { key: "2022", value: 2022 },
  { key: "2023", value: 2023 },
  { key: "2024", value: 2024 },
  { key: "2025", value: 2025 },
];

const FrmHacienda = () => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof ExpenseFrmHaciendaSchema>>({
    resolver: zodResolver(ExpenseFrmHaciendaSchema),
    defaultValues: {
      month: "1",
      year: "2024",
    },
  });

  const handleAction = async (
    data: z.infer<typeof ExpenseFrmHaciendaSchema>
  ) => {
    queryClient.fetchQuery<string | null>({
      queryKey: [EQueryClientsKeys.expensesHaciendaData],
      queryFn: async () =>
        await fetchDataForHaciendaAction(data.month, data.year),
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleAction)}
        className="flex flex-col gap-2 xl:flex-row"
      >
        <Card className="xl:w-[50%]">
          <CardContent className="flex flex-col gap-2 mt-2 xl:h-[100%] xl:justify-between">
            <div className="flex flex-col md:flex-row gap-3 ">
              <MCSelectField
                control={form.control}
                name="month"
                label="Mes"
                placeholder="Seleccione"
                data={listOfMonths}
              />
              <MCSelectField
                control={form.control}
                name="year"
                label="Año"
                placeholder="Seleccione"
                data={listOFYears}
              />
            </div>

            <div className="flex flex-row justify-end gap-2 items-end ">
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

type TTableHaciendaProps = {
  data: IExpenseDataHacienda | null;
};
function TableHacienda({ data }: TTableHaciendaProps) {
  return (
    data?.taxGroup && (
      <Table>
        <TableCaption>
          Total de facturas procesadas {data.totalInvoices}.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">% de Imp.</TableHead>
            <TableHead>Total de Items</TableHead>
            <TableHead>Total de Impuestos</TableHead>
            <TableHead className="text-right">Total de Gastos</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.taxGroup &&
            data?.taxGroup.map((item) => (
              <TableRow key={item.taxPercentage}>
                <TableCell className="font-medium">
                  {item.taxPercentage} %
                </TableCell>
                <TableCell>{item.totalItems}</TableCell>
                <TableCell>
                  <TextFieldForCurrency totalAmount={item.totalTaxes} />
                </TableCell>
                <TableCell className="text-right">
                  <TextFieldForCurrency totalAmount={item.totalAmount} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Totales</TableCell>
            <TableCell className="text-left">
              <TextFieldForCurrency totalAmount={data.totalTaxes} />
            </TableCell>
            <TableCell className="text-right">
              <TextFieldForCurrency totalAmount={data.totalExpenses} />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    )
  );
}

type TResultsDataHaciendaProps = {
  data: string | null | undefined;
};
const ResultsDataHaciendaWrapper = ({ data }: TResultsDataHaciendaProps) => {
  const result = JSON.parse(data as string) as IExpenseDataHacienda;
  return (
    <>
      {result ? (
        <Card className="max-h-[500px] mb-5 overflow-y-auto mt-2 xl:h-[46vh]">
          <CardContent>
            <TableHacienda data={result} />
          </CardContent>
        </Card>
      ) : (
        <Card className="max-h-[500px] mb-5 overflow-y-auto mt-2 xl:h-[46vh]">
          <CardContent className="flex justify-center items-center h-full">
            <span>
              No se encontran resultados para las fechas seleccionadas.
            </span>
          </CardContent>
        </Card>
      )}
    </>
  );
};

const ExpenseHacienda = () => {
  const { data, isLoading, isFetching } = useExpenseDataHacienta();

  return (
    <section>
      <FrmHacienda />
      {isLoading || isFetching ? (
        <div>Loading...</div>
      ) : (
        <ResultsDataHaciendaWrapper data={data} />
      )}
    </section>
  );
};

export default ExpenseHacienda;
