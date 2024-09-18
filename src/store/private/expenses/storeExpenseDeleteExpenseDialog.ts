import { create } from "zustand";

interface IStoreExpenseDeleteExpenseDialog {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

const useStoreExpenseDeleteExpenseDialog =
  create<IStoreExpenseDeleteExpenseDialog>((set) => ({
    isOpen: false,
    openDialog: () =>
      set({
        isOpen: true,
      }),
    closeDialog: () =>
      set({
        isOpen: false,
      }),
  }));

export default useStoreExpenseDeleteExpenseDialog;