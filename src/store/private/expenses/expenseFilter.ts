import { create } from "zustand";
import { IStoreExpenseFilter } from "@/utils/interfaces/private/admin/storeExpenseFilter";


const useStoreExpenseFilter = create<IStoreExpenseFilter>((set) => ({
  filter: undefined,
  setFilter: (filter) => set({ filter }),
}));

export default useStoreExpenseFilter;
