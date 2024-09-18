import { EMessages } from "@/utils/enums/messages";
import { z } from "zod";

export const ExpenseDeleteSchema = z.object({
  expenseId: z
    .string({ message: EMessages.inputErrorTypeString })
    .trim()
    .min(1, { message: EMessages.inputErrorRequired })
    .max(100, { message: `${EMessages.inputErrorMaxString} 100` }),
  expenseSummaryId: z
    .string({ message: EMessages.inputErrorTypeString })
    .trim()
    .min(1, { message: EMessages.inputErrorRequired })
    .max(100, { message: `${EMessages.inputErrorMaxString} 100` }),
});
