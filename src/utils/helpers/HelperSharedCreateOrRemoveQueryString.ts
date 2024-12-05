import { ISharedQueryParams } from "@/utils/interfaces/shared/ISharedQueryParams";
import { ReadonlyURLSearchParams } from "next/navigation";
type HelperSharedCreateOrRemoveQueryStringProps = {
  data: ISharedQueryParams[];
  searchParams: ReadonlyURLSearchParams;
  resetPagination?: boolean;
};
export const HelperSharedCreateOrRemoveQueryString = ({
  data,
  searchParams,
  resetPagination,
}: HelperSharedCreateOrRemoveQueryStringProps) => {
  const query = new URLSearchParams();
  searchParams.forEach((value, key) => query.set(key, value));
  data &&
    data.map(({ name, value, needToDelete }) => {
      needToDelete ? query.delete(name) : query.set(name, value);
    });
  resetPagination && query.set("page", "1");
  return query.toString();
};
