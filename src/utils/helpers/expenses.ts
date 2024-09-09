import { useSearchParams } from "next/navigation";
import { EFilters } from "../enums/filters";
import { IExpense } from '../interfaces/private/admin/expenses';
import {
  checkUnixStringDateIsValid,
  convertAnyTypeToDateUnix,
  convertUnixToDate,
  getEndDateOfDateUnix,
  getFilterDates,
  getStartDateOfDateUnix,
} from "./dates";
import { EExpenseQueryParams } from "../enums/expenseQueryParams";
import { IExpenseQueryParams } from "../interfaces/private/admin/expenseQueryParams";

export const cutExpenseClave = (clave: string) => {
  if (!clave) return "N/A";
  if (clave.length > 30) {
    return `...${clave.slice(30)}`;
  }
  return clave;
};

export const getStartAndEndDateBasedOnDateString = (
  startDate: string | null,
  endDate: string | null
) => {
  const dates = getFilterDates(EFilters.day);

  return {
    startDate: !startDate
      ? dates.start
      : checkUnixStringDateIsValid(startDate)
      ? convertUnixToDate(Number(startDate))
      : dates.start,
    endDate: !endDate
      ? dates.end
      : checkUnixStringDateIsValid(endDate)
      ? convertUnixToDate(Number(endDate))
      : dates.end,
  };
};




/**
 * @name getExpensesQueryParams
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
export const getExpensesQueryParams = (): IExpenseQueryParams => {
  const searchParams = useSearchParams();
  const startDate = convertAnyTypeToDateUnix(searchParams.get(EExpenseQueryParams.startDate));
  const endDate = convertAnyTypeToDateUnix(searchParams.get(EExpenseQueryParams.endDate));
  const expenseId = searchParams.get(EExpenseQueryParams.expenseId) || null;
  
  return {
    startDate: getStartDateOfDateUnix(startDate),
    endDate: getEndDateOfDateUnix(endDate),
    expenseId: expenseId,
  };
};

