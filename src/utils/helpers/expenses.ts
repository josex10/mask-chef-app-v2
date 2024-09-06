import { EFilters } from "../enums/filters";
import { checkUnixStringDateIsValid, convertUnixToDate, getFilterDates } from "./dates";

export const cutExpenseClave = (clave: string) => {
    if (!clave) return "N/A";
    if (clave.length > 30) {
      return `...${clave.slice(30)}`;
    }
    return clave;
  };

export const getStartAndEndDateBasedOnDateString = (startDate: string | null, endDate: string | null) => {
    const dates = getFilterDates(EFilters.day);
    
    return { startDate : !startDate
      ? dates.start
      : checkUnixStringDateIsValid(startDate)
      ? convertUnixToDate(Number(startDate))
      : dates.start,
    endDate : !endDate
      ? dates.end
      : checkUnixStringDateIsValid(endDate)
      ? convertUnixToDate(Number(endDate))
      : dates.end
    }
  };