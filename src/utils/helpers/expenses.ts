"use client";

import { useSearchParams } from "next/navigation";
import {
  convertAnyTypeToDateUnix,
  getEndDateOfDateUnix,
  getStartDateOfDateUnix,
} from "./dates";
import { EExpenseQueryParams } from "../enums/expenseQueryParams";
import { IExpenseQueryParams } from "../interfaces/private/admin/expenseQueryParams";
import { EQueryClientsKeys } from "../enums/queryClientKeys";

export const cutExpenseClave = (clave: string) => {
  if (!clave) return "N/A";
  if (clave.length > 30) {
    return `...${clave.slice(30)}`;
  }
  return clave;
};

/**
 * @name useGetExpensesQueryParams
 * @category Expenses Helpers
 * @summary Get the query params for the expenses page
 *
 * @description
 * On expenses page it's neccesary to get query params to filter the expenses table and also to get the expenses by id on case that the URL doesn't has the query params by default return the startDate and EndDate of today
 *
 * @returns IExpenseQueryParams
 *
 * @example
 * // Get the query params of the following url: /expenses?startDate=1722492000&endDate=1725947999&expenseId=rec_crfh32hrougubj4utrug
 * const params = getExpensesQueryParams()
 * //=> { startDate: 1722492000, endDate: 1725947999, expenseId: rec_crfh32hrougubj4utrug }
 */
export const useGetExpensesQueryParams = (): IExpenseQueryParams => {
  const searchParams = useSearchParams();
  const startDate = convertAnyTypeToDateUnix(
    searchParams.get(EExpenseQueryParams.startDate)
  );
  const endDate = convertAnyTypeToDateUnix(
    searchParams.get(EExpenseQueryParams.endDate)
  );
  const expenseId = searchParams.get(EExpenseQueryParams.expenseId) || null;
  const offset = parseInt(searchParams.get(EExpenseQueryParams.offset) || "0");

  return {
    startDate: getStartDateOfDateUnix(startDate),
    endDate: getEndDateOfDateUnix(endDate),
    expenseId,
    offset,
  };
};

export const useGetExpenseTableQueryClientKey = (
  data: IExpenseQueryParams
): any[] => {
  return [EQueryClientsKeys.expensesTable, data.startDate, data.endDate];
};

export const useGetSingleExpenseQueryClientKey = (
  data: IExpenseQueryParams
): any[] => {
  return [EQueryClientsKeys.singleExpense, data.expenseId];
};

export const generateExpensePath = (
  startDate: number,
  endDate: number,
  expenseId: string | null,
  offset: number | null
): string => {
  let stringPath = "";

  if (startDate) {
    stringPath +=
      stringPath.length > 0
        ? `&startDate=${startDate}`
        : `?startDate=${startDate}`;
  }
  if (endDate) {
    stringPath +=
      stringPath.length > 0 ? `&endDate=${endDate}` : `?endDate=${endDate}`;
  }

  if (expenseId) {
    stringPath +=
      stringPath.length > 0
        ? `&expenseId=${expenseId}`
        : `?expenseId=${expenseId}`;
  }

  if (offset) {
    stringPath +=
      stringPath.length > 0 ? `&offset=${offset}` : `?offset=${offset}`;
  }

  return stringPath;
};
