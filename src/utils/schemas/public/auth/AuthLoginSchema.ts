import { EMessages } from "@/utils/enums/messages";
import { z } from "zod";

export const AuthLoginSchema = z.object({
    email: z
      .string({ message: EMessages.inputErrorTypeString })
      .email({ message: EMessages.inputErrorTypeEmail })
      .trim()
      .min(1, { message: EMessages.inputErrorRequired })
      .max(50, { message: `${EMessages.inputErrorMaxString} 50` }),
    password: z
      .string({ message: EMessages.inputErrorTypeString })
      .trim()
      .min(8, { message: `${EMessages.inputErrorMinString} 8` })
      .max(16, { message: EMessages.inputErrorMaxString}),
  });