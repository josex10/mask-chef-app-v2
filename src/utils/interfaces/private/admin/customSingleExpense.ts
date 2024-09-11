import { ICustomSingleExpenseLineDetail } from "./customSingleExpenseLineDetail";
import { ICustomSingleExpensePaymentDetail } from "./customSingleExpensePaymentDetail";

export interface ICustomSingleExpense{
    id: string;
    clave: string;
    fechaEmision: Date;
    numeroConsecutivo: string;
    createdByEmail: string | null;
    expenseSummaryTotalVenta: number;
    expenseSummaryTotalDescuentos: number;
    expenseSummaryTotalImpuesto: number;
    expenseSummaryTotalComprobante: number;
    providerName: string | null;
    providerPhone: string | null;
    providerEmail: string | null;
    providerComercialName: string | null;
    xataCreatedAt: Date;
    lineDetails: ICustomSingleExpenseLineDetail[];
    isPaid: boolean;
    paymentDetail: ICustomSingleExpensePaymentDetail | null;
}