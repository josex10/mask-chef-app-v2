import { z } from "zod";
import { EMessages } from "@/utils/enums/messages";
import { CountrySchema } from "./CountrySchema";

export const RestaurantSchema = z.object({
  id: z.string(),
  email: z
    .string({ message: EMessages.inputErrorTypeString })
    .email({ message: EMessages.inputErrorTypeEmail }),
  name: z.string({ message: EMessages.inputErrorTypeString }).trim(),
  address: z.string({ message: EMessages.inputErrorTypeString }),
  phone: z.string({ message: EMessages.inputErrorTypeString }),
  country: CountrySchema,
});

export const RestaurantSchemaForCookie = z.object({
  id: z.string(),
  email: z
    .string({ message: EMessages.inputErrorTypeString })
    .email({ message: EMessages.inputErrorTypeEmail }),
  name: z.string({ message: EMessages.inputErrorTypeString }).trim(),
  address: z.string({ message: EMessages.inputErrorTypeString }),
  phone: z.string({ message: EMessages.inputErrorTypeString }),
  country: z.string({ message: EMessages.inputErrorTypeString }),
});
