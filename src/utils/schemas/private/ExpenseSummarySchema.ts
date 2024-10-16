import { EMessages } from "@/utils/enums/messages";
import { z } from "zod";

export const ExpenseSummarySchema = z.object({
  CodigoTipoMoneda: z
    .string({ message: EMessages.inputErrorTypeString })
    .trim()
    .min(1, { message: EMessages.inputErrorRequired })
    .max(50, { message: `${EMessages.inputErrorMaxString} 50` }),
  TotalServGravados: z.coerce.number({
    message: EMessages.inputErrorTypeNumber,
  }),
  TotalServExentos: z.coerce.number({
    message: EMessages.inputErrorTypeNumber,
  }),
  TotalServExonerado: z.coerce.number({
    message: EMessages.inputErrorTypeNumber,
  }),
  TotalMercanciasGravadas: z.coerce.number({
    message: EMessages.inputErrorTypeNumber,
  }),
  TotalMercanciasExentas: z.coerce.number({
    message: EMessages.inputErrorTypeNumber,
  }),
  TotalMercExonerada: z.coerce.number({
    message: EMessages.inputErrorTypeNumber,
  }),
  TotalGravado: z.coerce.number({ message: EMessages.inputErrorTypeNumber }),
  TotalExento: z.coerce.number({ message: EMessages.inputErrorTypeNumber }),
  TotalExonerado: z.coerce.number({ message: EMessages.inputErrorTypeNumber }),
  TotalVenta: z.coerce.number({ message: EMessages.inputErrorTypeNumber }),
  TotalDescuentos: z.coerce.number({ message: EMessages.inputErrorTypeNumber }),
  TotalVentaNeta: z.coerce.number({ message: EMessages.inputErrorTypeNumber }),
  TotalImpuesto: z.coerce.number({ message: EMessages.inputErrorTypeNumber }),
  TotalComprobante: z.coerce.number({
    message: EMessages.inputErrorTypeNumber,
  }),
});
