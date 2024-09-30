import { UseFormReturn } from "react-hook-form";

export interface IExpenseFrmFilter {
    form: UseFormReturn<
      {
        dateType: string;
        date: {
          from?: Date | undefined;
          to?: Date | undefined;
        };
        expenseKey?: string;
        expenseStatus?: string;
        providerId?: string;
      },
      any,
      undefined
    >;
    data?: string | null;
  };