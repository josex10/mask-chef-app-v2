"use server";

import { actionResponse } from "@/lib/actions/shared/general/ActionResponse";
import { IncomeRegisterSchema } from "@/utils/schemas/private/incomes/IncomeRegisterSchema";
import { getXataClient } from "@/xata";

const actionName = "Agregar Ingresos";

export const addIncomes = async (data: any): Promise<string> => {
  try {
    const xata = getXataClient();
    const newIncomeStaged = validationSchema(data);
    const newIncomeOnDB = await xata.db.incomes.create(newIncomeStaged);
    return actionResponse(false, actionName, newIncomeOnDB);
  } catch (error: any) {
    console.log(error);
    return actionResponse(true, actionName);
  }
};

const validationSchema = (data: any) => {
  const validation = IncomeRegisterSchema.safeParse(data);

  if (validation.error)
    throw new Error("Ha ocurrido un error al validar los datos del Ingreso.");
  return validation.data;
};
