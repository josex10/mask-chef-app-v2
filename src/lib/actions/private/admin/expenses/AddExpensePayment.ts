"use server";

import { IServerActionResponse } from "@/utils/interfaces/private/admin/serverActionResponse";
import { ExpensePaymentDetailSchema } from "@/utils/schemas/private/ExpensePaymentDetailSchema";
import { getXataClient } from "@/xata";

export const addExpensePayment = async (data: any): Promise<string> => {
  try {
    const xata = getXataClient();

    const validation = ExpensePaymentDetailSchema.safeParse(data);

    if (validation.error)
      throw new Error("Error al validar la data para el pago.");

    const expenseHasPayment = await xata.db.expenses_payment_detail
      .filter({ expense: validation.data.expense })
      .getFirst();

    if (expenseHasPayment)
      throw new Error("La factura ya tiene un pago asociado.");

    const newExpensePaymentDetail =
      await xata.db.expenses_payment_detail.create(validation.data);

    await xata.db.expenses.update(validation.data.expense, {
      isPaid: true,
    });

    const response: IServerActionResponse = {
      error: false,
      message: "Se ha agregado el pago a la factura de manera correcta.",
      data: newExpensePaymentDetail,
    };

    return JSON.stringify(response);
  } catch (error: any) {
    const response: IServerActionResponse = {
      error: true,
      message: error.message ? error.message : "Error creating the expense.",
      data: null,
    };
    return JSON.stringify(response);
  }
};
