
import { getXataClient } from "@/xata";
export const getAllExpenses = async (restaurantId: string, offset: number = 0) => {
    try {
      const xata = getXataClient();
      const test = await xata.db.expenses.select([
        "id", "clave", "fechaEmision", "provider.name", "expenseSummary.TotalComprobante", "createdBy.email"
      ])
      .filter({ restaurant:restaurantId})
      .sort("fechaEmision", "desc")
      .getMany({
        pagination: { size: 10, offset: offset },
      });
      return test;
    } catch (error) {
      return [];
    }
  };