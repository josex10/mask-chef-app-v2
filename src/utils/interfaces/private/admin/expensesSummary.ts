export interface IExpensesSummary {
    id?: string;
    CodigoTipoMoneda: string,
    TotalServGravados: number;
    TotalServExentos: number;
    TotalServExonerado: number;
    TotalMercanciasGravadas: number;
    TotalMercanciasExentas: number;
    TotalMercExonerada: number;
    TotalGravado: number;
    TotalExento: number;
    TotalExonerado: number;
    TotalVenta: number;
    TotalDescuentos: number;
    TotalVentaNeta: number;
    TotalImpuesto: number;
    TotalComprobante: number;
}