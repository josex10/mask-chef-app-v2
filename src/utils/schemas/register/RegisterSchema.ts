import { EMessages } from "@/utils/enums/messages";
import { z } from "zod";

export const RegisterSchema = z.object({
    restaurantName: z
      .string({ message: EMessages.inputErrorTypeString })
      .trim()
      .min(1, { message: EMessages.inputErrorRequired })
      .max(100, { message: `${EMessages.inputErrorMaxString} 100` }),
    email: z
      .string({ message: EMessages.inputErrorTypeString })
      .email({ message: EMessages.inputErrorTypeEmail })
      .trim()
      .min(1, { message: EMessages.inputErrorRequired })
      .max(100, { message: `${EMessages.inputErrorMaxString} 100` }),
    country: z
      .string({ message: EMessages.inputErrorTypeString })
      .trim()
      .min(1, { message: EMessages.inputErrorRequired })
      .max(100, { message: `${EMessages.inputErrorMaxString} 100` }),
    legalNumber: z.coerce
      .number({ message: EMessages.inputErrorTypeNumber }),
    address: z
      .string({ message: EMessages.inputErrorTypeString })
      .trim()
      .min(1, { message: EMessages.inputErrorRequired })
      .max(100, { message: `${EMessages.inputErrorMaxString} 100` }),
    phone: z
      .string({ message: EMessages.inputErrorTypeString })
      .trim()
      .min(1, { message: EMessages.inputErrorRequired })
      .max(12, { message: `${EMessages.inputErrorMaxString} 100` }),
    favorite: z
      .boolean({ message: EMessages.inputErrorTypeBoolean }),
  });