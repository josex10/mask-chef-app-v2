"use server";

import { IDeleteExpenseAction } from "@/utils/interfaces/private/admin/expenseDeleteAction";
import { IServerActionResponse } from "@/utils/interfaces/private/admin/serverActionResponse";
import { ExpenseDeleteSchema } from "@/utils/schemas/private/ExpenseDeleteSchema";
import { getXataClient } from "@/xata";

export const deleteExpenseAction = async (
  data: IDeleteExpenseAction
): Promise<string> => {
  try {
    const xata = getXataClient();
    const transactionsArray = [];

    const validation = ExpenseDeleteSchema.safeParse(data);

    if (validation.error) {
      throw new Error("No se pudo eliminar el gasto");
    }

    const { expenseId, expenseSummaryId } = validation.data;

    const expenseDBId = await xata.db.expenses.read(expenseId);
    if (!expenseDBId) throw new Error("El gasto no existe");
    transactionsArray.push({
      delete: { table: "expenses" as const, id: expenseDBId.id },
    });

    const expenseSummary = await xata.db.expenses_summary.read(
      expenseSummaryId
    );
    if (!expenseSummary) throw new Error("El resumen del gasto no existe");
    transactionsArray.push({
      delete: { table: "expenses_summary" as const, id: expenseSummary.id },
    });

    const expensePaymentDetail = await xata.db.expenses_payment_detail
      .filter({ expense: expenseId })
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
      .filter({ expense: expenseId })
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
      message: `El gasto se ha eliminado el gasto correctamente. `,
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
