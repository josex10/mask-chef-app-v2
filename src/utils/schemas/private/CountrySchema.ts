import { z } from "zod";
import { EMessages } from "@/utils/enums/messages";

export const CountrySchema = z.object({
    id: z.string(),
    name: z.string({ message: EMessages.inputErrorTypeString }),
    short_name: z.string({ message: EMessages.inputErrorTypeString }),
    language: z.string({ message: EMessages.inputErrorTypeString }),
    currency_name: z.string({ message: EMessages.inputErrorTypeString }),
    currency_short_name: z.string({ message: EMessages.inputErrorTypeString }),
    currency_symbol: z.string({ message: EMessages.inputErrorTypeString }),
  });