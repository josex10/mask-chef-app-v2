export interface IIncome {
    id: string;
    amount: number;
    notes: string;
    isActive: boolean;
    incomeDate: Date;
    incomesType: string;
    restaurant: string;
    createdBy: string;
    createdAt: Date;
  }