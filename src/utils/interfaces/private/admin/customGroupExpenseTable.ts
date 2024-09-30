export interface IGroupExpenseTable {
    id: string;
    clave: string;
    fechaEmision: Date;
    createdAt: Date;
    providerName: string;
    paymentExpirationDate: Date;
    isPaid: boolean;
    totalComprobante: number;
  }