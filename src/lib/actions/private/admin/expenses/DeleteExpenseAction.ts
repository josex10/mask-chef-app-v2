"use server";

import { IServerActionResponse } from "@/utils/interfaces/private/admin/serverActionResponse";
import { getXataClient } from "@/xata";

type TDeleteExpenseAction = {
  expenseId: string;
  expenseSummaryId: string;
};
export const deleteExpenseAction = async (
  data: TDeleteExpenseAction
): Promise<string> => {
  try {
    const xata = getXataClient();
    const transactionsArray = [];

    const expenseDBId = await xata.db.expenses.read(data.expenseId);
    if (!expenseDBId) throw new Error("El gasto no existe");
    transactionsArray.push({
      delete: { table: "expenses" as const, id: expenseDBId.id },
    });

    const expenseSummary = await xata.db.expenses_summary.read(
      data.expenseSummaryId
    );
    if (!expenseSummary) throw new Error("El resumen del gasto no existe");
    transactionsArray.push({
      delete: { table: "expenses_summary" as const, id: expenseSummary.id },
    });

    const expensePaymentDetail = await xata.db.expenses_payment_detail
      .filter({ expense: data.expenseId })
      .getFirst();
    if (expensePaymentDetail) {
      transactionsArray.push({
        delete: {
          table: "expenses_payment_detail" as const,
          id: expensePaymentDetail.id,
        },
      });
    }

    const expenseLineDetail = await xata.db.expenses_line_detail
      .filter({ expense: data.expenseId })
      .getAll();
    if (expenseLineDetail) {
      expenseLineDetail.forEach((line) => {
        transactionsArray.push({
          delete: { table: "expenses_line_detail" as const, id: line.id },
        });
      });
    }
    const result = await xata.transactions.run(transactionsArray);

    if (!result) throw new Error("No se pudo eliminar el gasto");

    const response: IServerActionResponse = {
      error: false,
      message: `El gasto se ha eliminado el gasto: ${expenseDBId.clave} `,
      data: null,
    };
    return JSON.stringify(response);
  } catch (error) {
    const response: IServerActionResponse = {
      error: true,
      message: `Ha ocurrido un error eliminando el gasto.`,
      data: null,
    };
    return JSON.stringify(response);
  }
};
