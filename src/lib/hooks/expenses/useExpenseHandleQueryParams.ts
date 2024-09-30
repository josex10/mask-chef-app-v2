import { EExpenseQueryParams } from "@/utils/enums/expenseQueryParams";
import {
  useSearchParams,
  usePathname,
  ReadonlyURLSearchParams,
} from "next/navigation";
import { useRouterPush } from "../shared/useRouterPush";

export type THandleExpenseFilters = {
  key: EExpenseQueryParams;
  value: string | null;
};

const useGetExpenseActualParameters = (
  searchParams: ReadonlyURLSearchParams
) => {
  return {
    startDate: searchParams.get(EExpenseQueryParams.startDate),
    endDate: searchParams.get(EExpenseQueryParams.endDate),
    expenseId: searchParams.get(EExpenseQueryParams.expenseId),
    dateType: searchParams.get(EExpenseQueryParams.dateType),
    expenseKey: searchParams.get(EExpenseQueryParams.expenseKey),
    expenseStatus: searchParams.get(EExpenseQueryParams.expenseStatus),
    providerId: searchParams.get(EExpenseQueryParams.providerId),
  };
};

const useSetParams = async (
  params: THandleExpenseFilters[],
  remove: boolean,
  pathName: string,
  getActualParams: any,
  routerPush: any
) => {
  let {
    startDate,
    endDate,
    expenseId,
    dateType,
    expenseKey,
    expenseStatus,
    providerId,
  } = getActualParams;

  params.forEach((param) => {
    if (param.key === EExpenseQueryParams.startDate) {
      startDate = remove ? null : param.value;
    }
    if (param.key === EExpenseQueryParams.endDate) {
      endDate = remove ? null : param.value;
    }
    if (param.key === EExpenseQueryParams.expenseId) {
      expenseId = remove ? null : param.value;
    }
    if (param.key === EExpenseQueryParams.dateType) {
      dateType = remove ? null : param.value;
    }
    if (param.key === EExpenseQueryParams.expenseKey) {
      expenseKey = remove ? null : param.value;
    }
    if (param.key === EExpenseQueryParams.expenseStatus) {
      expenseStatus = remove ? null : param.value;
    }
    if (param.key === EExpenseQueryParams.providerId) {
      providerId = remove ? null : param.value;
    }
  });

  await routerPush(
    `${pathName}${getUrl(
      startDate,
      endDate,
      expenseId,
      dateType,
      expenseKey,
      expenseStatus,
      providerId
    )}`
  );
};

const getUrl = (
  startDate: string | null,
  endDate: string | null,
  expenseId: string | null,
  dateType: string | null,
  expenseKey: string | null,
  expenseStatus: string | null,
  providerId: string | null
) => {
  let stringPath = "";
  if (startDate && startDate !== "") {
    stringPath +=
      stringPath.length > 0
        ? `&startDate=${startDate}`
        : `?startDate=${startDate}`;
  }
  if (endDate && endDate !== "") {
    stringPath +=
      stringPath.length > 0 ? `&endDate=${endDate}` : `?endDate=${endDate}`;
  }

  if (expenseId && expenseId !== "") {
    stringPath +=
      stringPath.length > 0
        ? `&expenseId=${expenseId}`
        : `?expenseId=${expenseId}`;
  }

  if (dateType && dateType !== "") {
    stringPath +=
      stringPath.length > 0 ? `&dateType=${dateType}` : `?dateType=${dateType}`;
  }

  if (expenseKey && expenseKey !== "") {
    stringPath +=
      stringPath.length > 0
        ? `&expenseKey=${expenseKey}`
        : `?expenseKey=${expenseKey}`;
  }

  if (expenseStatus && expenseStatus !== "") {
    stringPath +=
      stringPath.length > 0
        ? `&expenseStatus=${expenseStatus}`
        : `?expenseStatus=${expenseStatus}`;
  }

  if (providerId && providerId !== "") {
    stringPath +=
      stringPath.length > 0
        ? `&providerId=${providerId}`
        : `?providerId=${providerId}`;
  }

  return stringPath;
};

export const useHandleExpenseParams = () => {
  const searchParams = useSearchParams();
  const routerPush = useRouterPush();
  const pathName = usePathname();
  const getActualParams = useGetExpenseActualParameters(searchParams);

  const useSetActualParams = (
    filters: THandleExpenseFilters[],
    remove: boolean = false
  ) => useSetParams(filters, remove, pathName, getActualParams, routerPush);

  return { getActualParams, useSetActualParams };
};
