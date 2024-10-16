"use client";

import {
  EExpenseFilterDateType,
  EExpenseTabs,
} from "@/utils/enums/expensesEnums";
import { useHandleExpenseParams } from "./useExpenseHandleQueryParams";
import { CDateTypes } from "@/utils/constants/expenses/CDateTypes";

export const useExpenseDateTypeBasedOnParams = () => {
  const { getActualParams } = useHandleExpenseParams();
  if (!getActualParams.dateType || getActualParams.dateType === "all") {
    return findDateType(EExpenseFilterDateType.Emision);
  }
  return getActualParams.expenseTab === EExpenseTabs.NEW
    ? findDateType(EExpenseFilterDateType.Created)
    : getActualParams.dateType === EExpenseFilterDateType.Created
    ? findDateType(EExpenseFilterDateType.Created)
    : getActualParams.dateType === EExpenseFilterDateType.Emision
    ? findDateType(EExpenseFilterDateType.Emision)
    : findDateType(EExpenseFilterDateType.PaymentExp);
};

const findDateType = (dateType: EExpenseFilterDateType) => {
  return CDateTypes.find((data) => data.key === dateType);
};
