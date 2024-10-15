export interface IExpenseDataHacienda {
  totalExpenses: number;
  totalInvoices: number;
  totalTaxes: number;
  taxGroup: IExpenseDataHaciendaTaxGroup[] | null;
}

export interface IExpenseDataHaciendaTaxGroup {
  taxPercentage: number;
  totalAmount: number;
  totalItems: number;
  totalTaxes: number;
}
