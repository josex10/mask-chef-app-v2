
'use server';

import { getSelectedRestaurantFromCookie } from "@/lib/middleware/cookies";
import { IGroupExpenseTable } from "@/utils/interfaces/private/admin/customGroupExpenseTable";
import { IServerActionResponse } from "@/utils/interfaces/private/admin/serverActionResponse";
import { getXataClient } from "@/xata";

const xata = getXataClient();

export const getExpenseTableLastCreated = async (): Promise<string | null> => {
  try {
    const resutaurantSelected = await getSelectedRestaurantFromCookie();
    const expenses = await xata.db.expenses
      .select([
        "id",
        "clave",
        "fechaEmision",
        "provider.name",
        "paymentExpirationDate",
        "isPaid",
        "expenseSummary.TotalComprobante",
        "xata.createdAt",
      ])
      .filter({
        $all: [
          { restaurant: resutaurantSelected?.id },
        ],
      })
      .sort("xata.createdAt", "desc")
      .getPaginated({ pagination: { size: 10 } });

    if (!expenses) return null;
    const result: IGroupExpenseTable[] = expenses.records.map((expense) => {
      return {
        id: expense.id,
        clave: expense.clave,
        fechaEmision: expense.fechaEmision,
        createdAt: expense.xata?.createdAt,
        providerName: expense.provider?.name || "",
        paymentExpirationDate: expense.paymentExpirationDate,
        isPaid: expense.isPaid,
        totalComprobante: expense.expenseSummary?.TotalComprobante || 0,
      };
    });
  
    const finalOutput: IServerActionResponse = {
      error: false,
      message: "Expenses fetched successfully",
      data: result,
    };
    return JSON.stringify(finalOutput);
  } catch (error: any) {
    const response: IServerActionResponse = {
      error: true,
      message: error.message ? error.message : "Ha ocurrido un error al procesar la solicitud.",
      data: null,
    };
    return JSON.stringify(response);
  }
};