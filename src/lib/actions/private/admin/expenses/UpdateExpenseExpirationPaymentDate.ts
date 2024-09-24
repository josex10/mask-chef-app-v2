"use server";
import { IServerActionResponse } from "@/utils/interfaces/private/admin/serverActionResponse";
import { getXataClient } from "@/xata";
import { IExpenseUpdatePaymentDate } from "@/utils/interfaces/private/admin/expenseUpdatePaymentDate";
import { updateExpenseExpirationPaymentDateSchema } from "@/utils/schemas/private/ExpenseUpdateExpPaymentDate";

export const updateExpenseExpirationPaymentDate = async (
  data: IExpenseUpdatePaymentDate
): Promise<string> => {
  try {
    const xata = getXataClient();

    const validation = updateExpenseExpirationPaymentDateSchema.safeParse(data);

    if (validation.error)
      throw new Error("Error al validar la fecha recibida.");

    const updatedData = await xata.db.expenses.update(
      validation.data.expenseId,
      {
        paymentExpirationDate: validation.data.expirationDate,
      }
    );

    if (!updatedData) throw new Error("No se ha podido actualizar la fecha.");

    const response: IServerActionResponse = {
      error: false,
      message: "Se ha actualizado la fecha de pago correctamente.",
      data: null,
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
