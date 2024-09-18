import { create } from "zustand";

interface IStoreExpenseDetailPaymentDialog {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

const useStoreExpenseDetailPaymentDialog =
  create<IStoreExpenseDetailPaymentDialog>((set) => ({
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

export default useStoreExpenseDetailPaymentDialog;
