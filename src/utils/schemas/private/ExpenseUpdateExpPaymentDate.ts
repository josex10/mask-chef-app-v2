import { EMessages } from "@/utils/enums/messages";
import { z } from "zod";

export const updateExpenseExpirationPaymentDateSchema = z.object({
    expenseId: z
      .string({ message: EMessages.inputErrorTypeString })
      .trim()
      .min(1, { message: EMessages.inputErrorRequired })
      .max(100, { message: `${EMessages.inputErrorMaxString} 100` }),
    expirationDate: z.date({ message: EMessages.inputErrorTypeDate }),
  });