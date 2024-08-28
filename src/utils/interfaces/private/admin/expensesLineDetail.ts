export interface IExpensesLineDetail {
    id?: string;
    expense: string;
    NumeroLinea: number;
    Codigo: string;
    UnidadMedida: string;
    Detalle: string;
    PrecioUnitario: number;
    MontoTotal: number;
    SubTotal: number;
    ImpuestoTarifa: number;
    ImpuestoMonto: number;
    ImpuestoNeto: number;
    MontoTotalLinea: number;
}