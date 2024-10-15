import { EMessages } from "@/utils/enums/messages";
import { z } from "zod";

export const ExpenseFrmHaciendaSchema = z.object({
  month: z
    .string({ message: EMessages.inputErrorTypeNumber })
    .trim()
    .min(1, { message: EMessages.inputErrorRequired })
    .max(4, { message: `${EMessages.inputErrorMaxString} 4` }),
  year: z
    .string({ message: EMessages.inputErrorTypeNumber })
    .trim()
    .min(1, { message: EMessages.inputErrorRequired })
    .max(4, { message: `${EMessages.inputErrorMaxString} 4` }),
});
