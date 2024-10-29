import { EMessages } from "@/utils/enums/messages";
import { coerce, z } from "zod";

export const IncomeRegisterSchema = z.object({
  incomeDate: z.date({ message: EMessages.inputErrorTypeDate }),
  amount: z.coerce
    .number({ message: EMessages.inputErrorTypeNumber })
    .min(0, { message: EMessages.inputErrorRequired }),
  notes: z
    .string({ message: EMessages.inputErrorTypeString })
    .trim()
    .max(100, { message: `${EMessages.inputErrorMaxString} 100` })
    .optional()
    .or(z.literal("")),
  incomesType: z
    .string({ message: EMessages.inputErrorTypeString })
    .trim()
    .min(1, { message: EMessages.inputErrorRequired }),
  createdBy: z
    .string({ message: EMessages.inputErrorTypeString })
    .trim()
    .min(1, { message: EMessages.inputErrorRequired }),
  restaurant: z
    .string({ message: EMessages.inputErrorTypeString })
    .trim()
    .min(1, { message: EMessages.inputErrorRequired }),
  isActive: z.boolean().optional().default(true),
});
