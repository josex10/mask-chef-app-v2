"use server";

import { getStardAndEndDateOfTheDay } from "@/utils/helpers/dates";
import { getXataClient } from "@/xata";
import { isValid } from "date-fns";

export const getExpensesSummary = async (
  restSelected: string | undefined,
  startDate: Date,
  endDate: Date
) => {
  try {
    const xata = getXataClient();
    let result = 0;

    if (!restSelected) return result;

    if (!isValid(endDate) || !isValid(startDate)) return result;

    const {start} = getStardAndEndDateOfTheDay(startDate);
    const {end} = getStardAndEndDateOfTheDay(endDate);

    const records = await xata.db.expenses
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
      .summarize({
        summaries: {
          totalExpenses: { sum: "expenseSummary.TotalComprobante" },
        },
      });

    if (
      records.summaries &&
      Array.isArray(records.summaries) &&
      records.summaries.length > 0
    ) {
      records.summaries.forEach((summary) => {
        result += summary.totalExpenses;
      });
    }
    return result;
  } catch (error) {
    return 0;
  }
};
