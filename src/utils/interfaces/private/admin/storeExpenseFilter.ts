import { EFilters } from "@/utils/enums/filters";

export interface IStoreExpenseFilter {
    filter: EFilters | undefined;
    setFilter: (filter: EFilters) => void;
};