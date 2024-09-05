"use server";

import { getSelectedRestaurantFromCookie } from "@/lib/middleware/cookies";
import { EFilters } from "@/utils/enums/filters";
import {
  getFilterDates,
  getStardAndEndDateOfTheDay,
  getStardAndEndDateOfTheMonth,
  getStardAndEndDateOfTheWeek,
} from "@/utils/helpers/dates";
import { getXataClient } from "@/xata";

export const getExpensesSummary = async (restSelected: string| undefined, filter: EFilters = EFilters.week) => {
  try {
    const xata = getXataClient();
    let result = 0;

    if(!restSelected) return result;

    const dates = getFilterDates(filter);

    const records = await xata.db.expenses
      .filter({
        $all: [
          { restaurant: restSelected},
          {
            'fechaEmision': { $ge: dates.start }
            // fechaEmision: { $ge: new Date("2024-01-01T00:00:00Z") },
          },
          {
            'fechaEmision': { $lt: dates.end }
            // fechaEmision: { $lt: new Date("2025-07-22T23:59:59Z") },
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
