"use server";

import { actionResponse } from "@/lib/actions/shared/general/ActionResponse";
import { IIncome } from "@/utils/interfaces/private/admin/incomes/IIncome";
import { getXataClient, IncomesRecord } from "@/xata";
import { Page, SelectedPick } from "@xata.io/client";
const actionName = "Lista de últimos ingresos creados";

export const getIncomesLastCreated = async (
  restSelected: string | undefined
): Promise<string | null> => {
  try {
    if (!restSelected) throw new Error("No se ha seleccionado un restaurante.");
    const records = await queryDb(restSelected);
    return actionResponse(false, actionName, getIncomesList(records));
  } catch (error: any) {
    return actionResponse(true, actionName);
  }
};

const queryDb = async (restSelected: string) => {
  const xata = getXataClient();
  return await xata.db.incomes
    .select([
      "id",
      "amount",
      "notes",
      "isActive",
      "incomeDate",
      "incomesType",
      "restaurant",
      "createdBy",
      "xata.createdAt",
    ])
    .filter({
      restaurant: restSelected,
    })
    .sort("xata.createdAt", "desc")
    .getPaginated({ pagination: { size: 10 } });
};

const getIncomesList = (
  data: Page<
    IncomesRecord,
    SelectedPick<
      IncomesRecord,
      (
        | "restaurant"
        | "createdBy"
        | "notes"
        | "incomesType"
        | "amount"
        | "isActive"
        | "incomeDate"
        | "id"
        | "xata.createdAt"
      )[]
    >
  >
): IIncome[] => {
  const result: IIncome[] = data.records.map((record) => {
    return {
      id: record.id,
      amount: record.amount,
      notes: record?.notes ? record.notes : "",
      isActive: record.isActive,
      incomeDate: record.incomeDate,
      incomesType: record.incomesType?.id ? record.incomesType?.id : "",
      restaurant: record.restaurant?.id ? record.restaurant?.id : "",
      createdBy: record.createdBy?.id ? record.createdBy?.id : "",
      createdAt: record.xata.createdAt,
    };
  });

  return result;
};
