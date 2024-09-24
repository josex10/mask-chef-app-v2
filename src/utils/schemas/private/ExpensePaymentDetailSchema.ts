import { EMessages } from "@/utils/enums/messages";
import { z } from "zod";

export const ExpensePaymentDetailSchema = z.object({
    expense: z
      .string({ message: EMessages.inputErrorTypeString })
      .trim()
      .min(1, { message: EMessages.inputErrorRequired })
      .max(100, { message: `${EMessages.inputErrorMaxString} 100` }),
    payment_type: z
      .string({ message: EMessages.inputErrorTypeString })
      .trim()
      .min(1, { message: EMessages.inputErrorRequired })
      .max(100, { message: `${EMessages.inputErrorMaxString} 100` }),
    referenceNumber: z
      .string({ message: EMessages.inputErrorTypeString })
      .trim()
      .max(100, { message: `${EMessages.inputErrorMaxString} 50` })
      .optional()
      .or(z.literal("")),
    notes: z
      .string({ message: EMessages.inputErrorTypeString })
      .trim()
      .max(100, { message: `${EMessages.inputErrorMaxString} 50` })
      .optional()
      .or(z.literal("")),
    payedBy: z
      .string({ message: EMessages.inputErrorTypeString })
      .trim()
      .min(1, { message: EMessages.inputErrorRequired })
      .max(100, { message: `${EMessages.inputErrorMaxString} 100` }),
  });