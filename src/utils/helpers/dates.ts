import { endOfMonth, endOfWeek, startOfMonth, startOfWeek, format, isDate } from "date-fns";

export const getStardAndEndDateOfTheWeek = (date: Date) => {
    return {
        startWeek : startOfWeek(date, { weekStartsOn: 1 }), 
        endWeek: endOfWeek(date, { weekStartsOn: 0 })
    };
};
export const getStardAndEndDateOfTheMonth = (date: Date) => {
    return {
        startMonth : startOfMonth(date), 
        endMonth: endOfMonth(date)
    };
};

export const convertDateToStandard = (date: string) => {
    return (isDate(new Date(date))) ? format(new Date(date), 'dd/MM/yyyy') : "N\A";
};