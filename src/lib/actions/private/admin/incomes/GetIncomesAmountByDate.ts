"use server";

import {
  actionResponse,
  actionResponseErrorLog,
} from "@/lib/actions/shared/general/ActionResponse";
import { EDashoardChartDataType } from "@/utils/enums/dashboard/EDashboardChartDataType";
import { getStardAndEndDateOfTheMonth } from "@/utils/helpers/dates";
import { getXataClient } from "@/xata";

const actionName = "Monto Total de Ingresor por fecha";

export const GetIncomesAmountByDate = async (
  restSelected: string,
  date: Date
) => {
  try {
    if (!restSelected || !date) throw new Error("Parametros Inválidos");
    const amount = await queryDb(restSelected, date);
    return actionResponse(false, actionName, amount);
  } catch (error: unknown) {
    actionResponseErrorLog(error, actionName);
    return actionResponse(false, actionName);
  }
};

const queryDb = async (restSelected: string, date: Date) => {
  const xata = getXataClient();
  const { start, end } = getStardAndEndDateOfTheMonth(date);
  const response = await xata.db.incomes
    .select(["amount", "incomeDate", "incomesType"])
    .filter({
      $all: [
        { restaurant: restSelected },
        {
          incomeDate: { $ge: start },
        },
        {
          incomeDate: { $lt: end },
        },
      ],
    })
    .getAll();

  return response.map((item) => {
    return {
      id: item.id,
      amount: item.amount,
      date: item.incomeDate,
      type: EDashoardChartDataType.incomes,
      incomeType: item.incomesType?.name || "Otro",
    };
  });
};
