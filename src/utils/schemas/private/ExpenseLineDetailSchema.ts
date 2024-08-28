import { EMessages } from "@/utils/enums/messages";
import { z } from "zod";

export const ExpenseLineDetailSchema = z.object({
    expense: z.string({ message: EMessages.inputErrorTypeString }),
    Codigo: z.string({ message: EMessages.inputErrorTypeString }),
    UnidadMedida: z.string({ message: EMessages.inputErrorTypeString }),
    Detalle: z.string({ message: EMessages.inputErrorTypeString }),
    NumeroLinea: z.number({ message: EMessages.inputErrorTypeNumber }),
    PrecioUnitario: z.number({ message: EMessages.inputErrorTypeNumber }),
    MontoTotal: z.number({ message: EMessages.inputErrorTypeNumber }),
    SubTotal: z.number({ message: EMessages.inputErrorTypeNumber }),
    ImpuestoTarifa: z.number({ message: EMessages.inputErrorTypeNumber }),
    ImpuestoMonto: z.number({ message: EMessages.inputErrorTypeNumber }),
    ImpuestoNeto: z.number({ message: EMessages.inputErrorTypeNumber }),
    MontoTotalLinea: z.number({ message: EMessages.inputErrorTypeNumber }),
});


export const GroupExpenseLineDetailSchema = z.array(ExpenseLineDetailSchema);