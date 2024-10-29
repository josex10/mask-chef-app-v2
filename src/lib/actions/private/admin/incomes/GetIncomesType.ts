"use server";
import { actionResponse } from "@/lib/actions/shared/general/ActionResponse";
import { IIncomeType } from "@/utils/interfaces/private/admin/incomes/IIncomeType";
import { getXataClient, IncomesTypeRecord } from "@/xata";
import { RecordArray, SelectedPick } from "@xata.io/client";
const xata = getXataClient();
const actionName = "Tipos de Ingresos";

export const getIncomesType = async (
  restSelected: string | undefined
): Promise<string | null> => {
  try {
    if (!restSelected) throw new Error("No se ha seleccionado un restaurante.");
    const records = await queryDb(restSelected);
    return actionResponse(false, actionName, getIncomesTypesList(records));
  } catch (error: any) {
    return actionResponse(true, actionName);
  }
};

const queryDb = async (restSelected: string) => {
  return await xata.db.incomes_type
    .select(["id", "name", "description", "restaurant"])
    .filter({
      restaurant: restSelected,
    })
    .getAll();
};

const getIncomesTypesList = (
  records: RecordArray<
    SelectedPick<
      IncomesTypeRecord,
      ("name" | "restaurant" | "description" | "id")[]
    >
  >
) => {
  return records.map((record) => {
    return {
      id: record.id,
      name: record.name,
      description: record.description ? record.description : "",
      restaurant: record.restaurant?.id ? record.restaurant?.id : "",
    };
  });
};
