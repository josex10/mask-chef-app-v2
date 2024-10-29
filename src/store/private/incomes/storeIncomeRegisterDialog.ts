import { create } from "zustand";

interface IStoreIncomeRegisterDialog {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

const useStoreIncomeRegisterDialog = create<IStoreIncomeRegisterDialog>(
  (set) => ({
    isOpen: false,
    openDialog: () =>
      set({
        isOpen: true,
      }),
    closeDialog: () =>
      set({
        isOpen: false,
      }),
  })
);

export default useStoreIncomeRegisterDialog;
