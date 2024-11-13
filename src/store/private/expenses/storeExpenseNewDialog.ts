import { create } from "zustand";

interface IStoreExpenseNewDialog {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

const useStoreExpenseNewDialog =
  create<IStoreExpenseNewDialog>((set) => ({
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

export default useStoreExpenseNewDialog;
