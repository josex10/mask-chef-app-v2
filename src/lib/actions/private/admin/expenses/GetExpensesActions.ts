"use server";

import { getSelectedRestaurantFromCookie } from "@/lib/middleware/cookies";
import {
  checkIfUnixDateIsValid,
  convertUnixToDate,
} from "@/utils/helpers/dates";
import { ICustomSingleExpense } from "@/utils/interfaces/private/admin/customSingleExpense";
import { IExpenseFilter } from "@/utils/interfaces/private/admin/expenseFilter";
import { getXataClient } from "@/xata";

const xata = getXataClient();

export const getAllExpenses = async (
  filter: IExpenseFilter,
  offset: number = 0
): Promise<string | null> => {
  try {
    const resutaurantSelected = await getSelectedRestaurantFromCookie();

    if (!checkIfUnixDateIsValid(filter.startDate)) {
      throw new Error("Invalid start date");
    }
    if (!checkIfUnixDateIsValid(filter.endDate)) {
      throw new Error("Invalid start date");
    }

    const expenses = await xata.db.expenses
      .select([
        "id",
        "clave",
        "fechaEmision",
        "provider.name",
        "expenseSummary.TotalComprobante",
        "createdBy.email",
      ])
      .filter({
        $all: [
          { restaurant: resutaurantSelected?.id },
          {
            fechaEmision: { $ge: convertUnixToDate(filter.startDate) },
            // fechaEmision: { $ge: new Date("2024-01-01T00:00:00Z") },
          },
          {
            fechaEmision: { $lt: convertUnixToDate(filter.endDate) },
            // fechaEmision: { $lt: new Date("2025-07-22T23:59:59Z") },
          },
        ],
      })
      .sort("fechaEmision", "desc")
      .getMany({
        pagination: { size: 10, offset: offset },
      });
    return expenses ? JSON.stringify(expenses) : null;
  } catch (error) {
    return null;
  }
};

export const getSingleExpense = async (
  expenseId: string | null
): Promise<string | null> => {
  try {
    if (!expenseId) return null;
    const expense = await xata.db.expenses
      .select([
        "id",
        "clave",
        "fechaEmision",
        "numeroConsecutivo",
        "createdBy.email",
        "expenseSummary.TotalVenta",
        "expenseSummary.TotalDescuentos",
        "expenseSummary.TotalImpuesto",
        "expenseSummary.TotalComprobante",
        "provider.name",
        "provider.phone",
        "provider.email",
        "provider.comercialName",
        "xata.createdAt",
      ])
      .filter({
        id: expenseId,
      })
      .getFirst();

    if (!expense) return null;

    const expenseDetails = await xata.db.expenses_line_detail
      .select(["id", "Detalle", "UnidadMedida", "Cantidad", "SubTotal"])
      .filter({
        expense: expenseId,
      })
      .getMany();

    const result: ICustomSingleExpense = {
      id: expense.id,
      clave: expense.clave,
      fechaEmision: expense.fechaEmision,
      numeroConsecutivo: expense.numeroConsecutivo,
      createdByEmail: expense.createdBy?.email || null,
      expenseSummaryTotalVenta: expense.expenseSummary?.TotalVenta || 0,
      expenseSummaryTotalDescuentos:
        expense.expenseSummary?.TotalDescuentos || 0,
      expenseSummaryTotalImpuesto: expense.expenseSummary?.TotalImpuesto || 0,
      expenseSummaryTotalComprobante:
        expense.expenseSummary?.TotalComprobante || 0,
      providerName: expense.provider?.name || null,
      providerPhone: expense.provider?.phone || null,
      providerEmail: expense.provider?.email || null,
      providerComercialName: expense.provider?.comercialName || null,
      xataCreatedAt: expense.xata.createdAt,
      lineDetails: expenseDetails.map((detail) => {
        return {
          id: detail.id,
          Detalle: detail.Detalle,
          UnidadMedida: detail.UnidadMedida,
          Cantidad: detail.Cantidad,
          SubTotal: detail.SubTotal,
        };
      }),
    };

    console.log(result);
    return result ? JSON.stringify(result) : null;
  } catch (error) {
    return null;
  }
};
