"use server";

import { IExpensePaymentType } from "@/utils/interfaces/private/admin/expensePaymentType";
import { getXataClient } from "@/xata";


export const getExpensesPaymentType = async (
  restSelected: string | undefined
): Promise<string | null> => {
  try {
    const xata = getXataClient();
    let result: IExpensePaymentType[] = [];

    if (!restSelected) return JSON.stringify(result);

    const records = await xata.db.expenses_payment_type
      .select(["id", "type", "description", "restaurant.id"])
      .filter({
        restaurant: restSelected,
      })
      .getAll();

    if (records && records.length > 0) {
      records.map((record) => {
        result.push({
          id: record.id,
          type: record.type,
          description: record.description ? record.description : "",
          restaurant: record.restaurant?.id ? record.restaurant?.id : "",
        });
      });
    }

    return JSON.stringify(result);
  } catch (error) {
    return null;
  }
};
