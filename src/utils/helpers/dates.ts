import {
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
  format,
  isDate,
  startOfDay,
  endOfDay,
  getUnixTime,
  parse,
  isValid,
  fromUnixTime,
  isAfter,
  isBefore,
} from "date-fns";
import { EFilters } from "../enums/filters";

export const getStardAndEndDateOfTheWeek = (date: Date) => {
  return {
    start: startOfWeek(date, { weekStartsOn: 1 }),
    end: endOfWeek(date, { weekStartsOn: 0 }),
  };
};

export const getStardAndEndDateOfTheMonth = (date: Date) => {
  return {
    start: startOfMonth(date),
    end: endOfMonth(date),
  };
};

export const getStardAndEndDateOfTheDay = (date: Date) => {
  return {
    start: startOfDay(date),
    end: endOfDay(date),
  };
};

export const convertDateToStandard = (date: string) => {
  return isDate(new Date(date)) ? format(new Date(date), "dd/MM/yyyy") : "NA";
};

export const getFilterDates = (filter: EFilters) => {
  return filter === EFilters.day
    ? getStardAndEndDateOfTheDay(new Date())
    : filter === EFilters.week
    ? getStardAndEndDateOfTheWeek(new Date())
    : getStardAndEndDateOfTheMonth(new Date());
};

export const getTodayOnUnixTime = () => {
  return {
    start: getUnixTime(startOfDay(new Date())),
    end: getUnixTime(endOfDay(new Date())),
  };
};

export const checkIfUnixDateIsValid = (unix: number) => {
  const date = fromUnixTime(unix);
  return isValid(date);
};

export const convertUnixToDate = (unix: number) => {
  return fromUnixTime(unix);
};

export const checkUnixStringDateIsValid = (date: string | null) => {
  if (!date || isNaN(Number(date))) return false;
  return checkIfUnixDateIsValid(Number(date));
};

export const converDateToUnix = (date: Date) => {
  return getUnixTime(date);
};

export const convertAnyTypeToDateUnix = (date: any): number => {
  if (date === null || date === undefined) return getUnixTime(new Date());

  if (isValid(new Date(date))) {
    return getUnixTime(new Date(date));
  }

  if (isValid(new Date(fromUnixTime(date)))) {
    return date;
  }
  return getUnixTime(new Date());
};

export const getStartDateOfDateUnix = (unix: number) => {
  const date = fromUnixTime(unix);
  return getUnixTime(startOfDay(date));
};

export const getEndDateOfDateUnix = (unix: number) => {
  const date = fromUnixTime(unix);
  return getUnixTime(endOfDay(date));
};

export const checkIfDateIsAfterToday = (date: Date) => {
  const { end } = getStardAndEndDateOfTheDay(new Date());
  return isAfter(date, end);
};

export const checkIfDateIsBeforeToday = (date: Date) => {
  const { start } = getStardAndEndDateOfTheDay(new Date());
  return isBefore(date, start);
};

export const checkIfADateIsBetweenTwoDates = (
  date: Date,
  startDate: Date,
  endDate: Date
) => {
  return isAfter(date, startDate) && isBefore(date, endDate);
};
