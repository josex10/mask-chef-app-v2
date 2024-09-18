"use server";

import { getSelectedRestaurantFromCookie } from "@/lib/middleware/cookies";
import {
  checkIfUnixDateIsValid,
  convertUnixToDate,
  getStardAndEndDateOfTheDay,
} from "@/utils/helpers/dates";
import { IGroupExpenseTable } from "@/utils/interfaces/private/admin/customGroupExpenseTable";
import { ICustomSingleExpense } from "@/utils/interfaces/private/admin/customSingleExpense";
import { IExpenseQueryParams } from "@/utils/interfaces/private/admin/expenseQueryParams";
import { getXataClient } from "@/xata";

const xata = getXataClient();

export const getAllExpenses = async (
  filter: IExpenseQueryParams,
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

    const { start } = getStardAndEndDateOfTheDay(
      convertUnixToDate(filter.startDate)
    );
    const { end } = getStardAndEndDateOfTheDay(
      convertUnixToDate(filter.endDate)
    );

    const expenses = await xata.db.expenses
      .select([
        "id",
        "clave",
        "fechaEmision",
        "provider.name",
        "paymentExpirationDate",
        "isPaid",
        "expenseSummary.TotalComprobante",
      ])
      .filter({
        $all: [
          { restaurant: resutaurantSelected?.id },
          {
            fechaEmision: { $ge: start },
          },
          {
            fechaEmision: { $lt: end },
          },
        ],
      })
      .sort("fechaEmision", "desc")
      .getAll();

    if (!expenses) return null;
    const result: IGroupExpenseTable[] = expenses.map((expense) => {
      return {
        id: expense.id,
        clave: expense.clave,
        fechaEmision: expense.fechaEmision,
        providerName: expense.provider?.name || "",
        paymentExpirationDate: expense.paymentExpirationDate,
        isPaid: expense.isPaid,
        totalComprobante: expense.expenseSummary?.TotalComprobante || 0,
      };
    });
    return JSON.stringify(result);
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
        "expenseSummary.id",
        "expenseSummary.TotalVenta",
        "expenseSummary.TotalDescuentos",
        "expenseSummary.TotalImpuesto",
        "expenseSummary.TotalComprobante",
        "provider.name",
        "provider.phone",
        "provider.email",
        "provider.comercialName",
        "isPaid",
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
      .getAll();

    const expensePaymentDetails = await xata.db.expenses_payment_detail
      .select([
        "id",
        "payment_type.type",
        "referenceNumber",
        "notes",
        "payedBy.email",
        "xata.createdAt",
      ])
      .filter({
        expense: expenseId,
      })
      .getFirst();

    const result: ICustomSingleExpense = {
      id: expense.id,
      clave: expense.clave,
      fechaEmision: expense.fechaEmision,
      numeroConsecutivo: expense.numeroConsecutivo,
      createdByEmail: expense.createdBy?.email || null,
      expenseSummaryId: expense.expenseSummary?.id || "",
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
      isPaid: expense.isPaid,
      paymentDetail: !expensePaymentDetails
        ? null
        : {
            id: expensePaymentDetails.id || "",
            paymentTypeType: expensePaymentDetails.payment_type?.type || "",
            referenceNumber: expensePaymentDetails.referenceNumber || "",
            notes: expensePaymentDetails.notes || "",
            createdAt: expensePaymentDetails.xata.createdAt,
            payedBy: expensePaymentDetails.payedBy?.email || "",
          },
    };
    return result ? JSON.stringify(result) : null;
  } catch (error) {
    return null;
  }
};
