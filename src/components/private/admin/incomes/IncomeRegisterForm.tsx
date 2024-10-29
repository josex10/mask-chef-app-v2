import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import MCDateField from "@/components/shared/MCDateField";
import MCInputField from "@/components/shared/MCInputField";
import MCSelectField from "@/components/shared/MCSelectField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAddIncomes } from "@/lib/hooks/incomes/useAddIncomes";
import { useGetIncomesTypes } from "@/lib/hooks/incomes/useGetIncomesTypes";
import useStoreAuth from "@/store/private/admin/auth";
import useStoreIncomeRegisterDialog from "@/store/private/incomes/storeIncomeRegisterDialog";
import { EInputType } from "@/utils/enums/shared/EInputFieldTypes";
import { IIncomeType } from "@/utils/interfaces/private/admin/incomes/IIncomeType";
import { IncomeRegisterSchema } from "@/utils/schemas/private/incomes/IncomeRegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const getIncomesTypesList = (data: string | null | undefined) => {
  const incomesTypesList = data ? (JSON.parse(data) as IIncomeType[]) : [];
  return incomesTypesList.map((incomeType) => {
    return { key: incomeType.id, value: incomeType.name };
  });
};

const IncomeRegisterForm = () => {
  const addIncomeMutation = useAddIncomes();
  const { data: dataIncomeTypes, isFetching: isFetchingIncomesTypes } =
    useGetIncomesTypes();
  const incomesTypesList = getIncomesTypesList(dataIncomeTypes);

  const handleDialog = useStoreIncomeRegisterDialog();
  const systemInformation = useStoreAuth((state) => state);

  const form = useForm<z.infer<typeof IncomeRegisterSchema>>({
    resolver: zodResolver(IncomeRegisterSchema),
    defaultValues: {
      incomeDate: new Date(),
      amount: 0,
      notes: "",
      incomesType: "",
      createdBy: systemInformation.user?.id,
      restaurant: systemInformation.selectedRestaurant?.id,
    },
  });

  const handleAction = async (data: any) => {
    addIncomeMutation.mutate(data, {
      onSuccess: () => {
        form.reset();
        handleDialog.closeDialog();
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleAction)}
        className="flex flex-col gap-6 px-4 py-4 mx-2 bg-content2 rounded-lg w-full sm:w-96"
      >
        <div className="grid items-center">
          <MCDateField
            control={form.control}
            name="incomeDate"
            label="Fecha del Ingreso"
            placeholder="Elija una fecha"
          />
        </div>
        <div className="grid items-center">
          <MCSelectField
            control={form.control}
            name="incomesType"
            label="Tipo de Ingreso"
            placeholder="Seleccione"
            data={incomesTypesList}
          />
        </div>
        <div className="grid items-center">
          <MCInputField
            control={form.control}
            name="amount"
            label="Monto"
            placeholder="Ex: 5068937488..."
            type={EInputType.number}
          />
        </div>
        <div className="grid items-center">
          <MCInputField
            control={form.control}
            name="notes"
            label="Notas"
            placeholder="Ex: 5068937488..."
          />
        </div>
        {addIncomeMutation.isPending ? (
          <div className="flex justify-center w-full">
            <LoadingSpinner className="text-gray-500" />
          </div>
        ) : (
          <div className="flex w-full max-w-sm items-center justify-end space-x-2">
            <Button type="submit" variant="default">
              Registar
            </Button>
            <Button
              type="button"
              onClick={() => handleDialog.closeDialog()}
              variant="secondary"
            >
              Cerrar
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};

export default IncomeRegisterForm;
