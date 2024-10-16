"use server";
import { getSelectedRestaurantFromCookie } from "@/lib/middleware/cookies";
import { getStardAndEndDateOfTheMonth } from "@/utils/helpers/dates";
import { IServerActionResponse } from "@/utils/interfaces/private/admin/serverActionResponse";
import { getXataClient } from "@/xata";

export const fetchDataForHaciendaAction = async (
  month?: string,
  year?: string
): Promise<string | null> => {
  try {
    const resutaurantSelected = await getSelectedRestaurantFromCookie();
    if (!resutaurantSelected?.id)
      throw new Error("No se ha seleccionado un restaurante");

    if (!month || !year || isNaN(Number(month)) || isNaN(Number(year))) {
      const response: IServerActionResponse = {
        error: false,
        message: `No se ha seleccionado un mes o año.`,
        data: null,
      };
      return JSON.stringify(response);
    }

    const { start, end } = fnGetStartAndEndDate(Number(month), Number(year));

    const expensesTotalsAndIds = await fnGetExpensesTotalsAndIds(
      resutaurantSelected?.id,
      start,
      end
    );

    const taxGroup = expensesTotalsAndIds?.arrayIds
      ? await fnGroupExpensesByTaxPercentage(expensesTotalsAndIds.arrayIds)
      : null;

    const responseData = {
      totalExpenses: expensesTotalsAndIds?.totalExpenses || 0,
      totalInvoices: expensesTotalsAndIds?.totalInvoices || 0,
      totalTaxes: expensesTotalsAndIds?.totalTaxes || 0,
      taxGroup,
    };

    const response: IServerActionResponse = {
      error: false,
      message: `Se ha generando la data de Hacienda correctamente.`,
      data: responseData,
    };

    return JSON.stringify(response);
  } catch (error) {
    const response: IServerActionResponse = {
      error: true,
      message: `Ha ocurrido un generando la data de Hacienda.`,
      data: null,
    };
    return JSON.stringify(response);
  }
};

const fnGetStartAndEndDate = (month: number, year: number) => {
  const newDate = new Date(year, month - 1, 1);
  return getStardAndEndDateOfTheMonth(newDate);
};

const fnFetchExpensesByEmisionDate = async (
  restId: string,
  start: Date,
  end: Date
) => {
  const xata = getXataClient();
  const records = await xata.db.expenses
    .select([
      "id",
      "clave",
      "fechaEmision",
      "expenseSummary.CodigoTipoMoneda",
      "expenseSummary.TotalComprobante",
      "expenseSummary.TotalImpuesto",
    ])
    .filter({
      $all: [
        { restaurant: restId },
        {
          fechaEmision: { $ge: start },
        },
        {
          fechaEmision: { $lt: end },
        },
      ],
    })
    .getAll();
  return !records
    ? []
    : records.map((item) => {
        return {
          id: item.id,
          clave: item.clave,
          fechaEmision: item.fechaEmision,
          CodigoTipoMoneda: item.expenseSummary?.CodigoTipoMoneda || 0,
          TotalComprobante: item.expenseSummary?.TotalComprobante || 0,
          TotalImpuesto: item.expenseSummary?.TotalImpuesto || 0,
        };
      });
};

const fnGetExpensesTotalsAndIds = async (
  restId: string,
  start: Date,
  end: Date
) => {
  const expenses = await fnFetchExpensesByEmisionDate(restId, start, end);
  if (!expenses) return null;
  let response = {
    totalExpenses: 0,
    totalInvoices: expenses.length,
    totalTaxes: 0,
    arrayIds: expenses.map((expense) => expense.id),
  };
  expenses.forEach((expense) => {
    response.totalExpenses += expense.TotalComprobante;
    response.totalTaxes += expense.TotalImpuesto;
  });
  return response;
};

const fnGroupExpensesByTaxPercentage = async (expensesIds: string[]) => {
  const xata = getXataClient();
  if (expensesIds.length === 0) return null;
  const expensesLineDetail = await xata.db.expenses_line_detail
    .filter({ expense: { id: { $any: expensesIds } } })
    .getAll();
  if (!expensesLineDetail) return null;

  const groupedExpenses: Record<
    number,
    {
      totalAmount: number;
      totalTaxes: number;
      totalItems: number;
      taxPercentage: number;
    }
  > = expensesLineDetail.reduce(
    (
      acc: Record<
        number,
        {
          totalAmount: number;
          totalTaxes: number;
          totalItems: number;
          taxPercentage: number;
        }
      >,
      line
    ) => {
      const taxPercentage = line.ImpuestoTarifa;
      if (!acc[taxPercentage]) {
        acc[taxPercentage] = {
          totalAmount: 0,
          totalTaxes: 0,
          totalItems: 0,
          taxPercentage,
        };
      }
      acc[taxPercentage].totalAmount += line.MontoTotalLinea;
      acc[taxPercentage].totalTaxes += line.ImpuestoMonto;
      acc[taxPercentage].totalItems++;
      return acc;
    },
    []
  );
  return groupedExpenses
    ? Object.values(groupedExpenses).map((item) => {
        return {
          taxPercentage: item.taxPercentage,
          totalAmount: item.totalAmount,
          totalTaxes: item.totalTaxes,
          totalItems: item.totalItems,
        };
      })
    : [];
};
