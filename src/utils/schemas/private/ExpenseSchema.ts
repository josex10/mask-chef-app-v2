import { EMessages } from "@/utils/enums/messages";
import { z } from "zod";

export const ExpenseSchema = z.object({
  clave: z.string({ message: EMessages.inputErrorTypeString }),
  codigoActividad: z.string({ message: EMessages.inputErrorTypeString }),
  numeroConsecutivo: z.string({ message: EMessages.inputErrorTypeString }),
  fechaEmision: z.date({ message: EMessages.inputErrorTypeDate }),
  restaurant: z.string({ message: EMessages.inputErrorTypeString }),
  createdBy: z.string({ message: EMessages.inputErrorTypeString }),
  provider: z.string({ message: EMessages.inputErrorTypeString }),
  expenseSummary: z.string({ message: EMessages.inputErrorTypeString }),
});
