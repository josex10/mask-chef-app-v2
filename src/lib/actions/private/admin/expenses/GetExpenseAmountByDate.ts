"use server";

import {
  actionResponse,
  actionResponseErrorLog,
} from "@/lib/actions/shared/general/ActionResponse";
import { EDashoardChartDataType } from "@/utils/enums/dashboard/EDashboardChartDataType";
import { getStardAndEndDateOfTheMonth } from "@/utils/helpers/dates";
import { getXataClient } from "@/xata";
const actionName = "Monto Total de Gastos por fecha";

export const getExpensesAmountByDate = async (
  restSelected: string,
  date: Date
) => {
  try {
    if (!restSelected || !date) throw new Error("Parametros Inválidos");
    const amount = await query(restSelected, date);
    return actionResponse(false, actionName, amount);
  } catch (error: unknown) {
    actionResponseErrorLog(error, actionName);
    return actionResponse(false, actionName);
  }
};

const query = async (restSelected: string, date: Date) => {
  const xata = getXataClient();
  const { start, end } = getStardAndEndDateOfTheMonth(date);
  const response = await xata.db.expenses
    .select(["id", "fechaEmision", "expenseSummary.TotalComprobante"])
    .filter({
      $all: [
        { restaurant: restSelected },
        {
          fechaEmision: { $ge: start },
        },
        {
          fechaEmision: { $lt: end },
        },
      ],
    })
    .getAll();

  return response.map((item) => {
    return {
      amount: item.expenseSummary?.TotalComprobante || 0,
      date: item.fechaEmision,
      type: EDashoardChartDataType.expenses,
    };
  });
};
