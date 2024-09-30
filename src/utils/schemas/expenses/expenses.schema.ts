import { EMessages } from "@/utils/enums/messages";
import { z } from "zod";

export const SchemaExpenseFrmFilter = z.object({
  dateType: z
    .string({ message: EMessages.inputErrorTypeString })
    .trim()
    .min(1, { message: EMessages.inputErrorRequired })
    .max(100, { message: `${EMessages.inputErrorMaxString} 100` }),
  date: z
    .object(
      {
        from: z.date().optional(),
        to: z.date().optional(),
      },
      { required_error: EMessages.inputErrorTypeDate }
    )
    .refine((date) => {
      return !!date.from;
    }, EMessages.inputErrorTypeDate),
  expenseKey: z
    .string({ message: EMessages.inputErrorTypeString })
    .trim()
    .max(100, { message: `${EMessages.inputErrorMaxString} 50` })
    .optional()
    .or(z.literal("")),
  expenseStatus: z
    .string({ message: EMessages.inputErrorTypeString })
    .trim()
    .max(100, { message: `${EMessages.inputErrorMaxString} 50` })
    .optional()
    .or(z.literal("")),
  providerId: z
    .string({ message: EMessages.inputErrorTypeString })
    .trim()
    .max(100, { message: `${EMessages.inputErrorMaxString} 50` })
    .optional()
    .or(z.literal("")),
});
