import { EMessages } from "@/utils/enums/messages";
import { z } from "zod";


//OLD
export const PrivateProviderSchema = z.object({
    name: z
      .string({ message: EMessages.inputErrorTypeString })
      .trim()
      .min(1, { message: EMessages.inputErrorRequired })
      .max(100, { message: `${EMessages.inputErrorMaxString} 100` }),
    email: z
      .string({ message: EMessages.inputErrorTypeString })
      .email({ message: EMessages.inputErrorTypeEmail })
      .trim()
      .min(1, { message: EMessages.inputErrorRequired })
      .max(50, { message: `${EMessages.inputErrorMaxString} 50` }),
    identification: z
      .string({ message: EMessages.inputErrorTypeString })
      .trim()
      .max(80, { message: `${EMessages.inputErrorMaxString} 50` }),
    comertialName: z
      .string({ message: EMessages.inputErrorTypeString })
      .trim()
      .max(80, { message: `${EMessages.inputErrorMaxString} 50` }),
    phone: z
      .string({ message: EMessages.inputErrorTypeString })
      .trim()
      .max(80, { message: `${EMessages.inputErrorMaxString} 50` }),
  });


export const ProviderSchema = z.object({
    name: z
      .string({ message: EMessages.inputErrorTypeString })
      .trim()
      .min(1, { message: EMessages.inputErrorRequired })
      .max(100, { message: `${EMessages.inputErrorMaxString} 100` }),
    email: z
      .string({ message: EMessages.inputErrorTypeString })
      .email({ message: EMessages.inputErrorTypeEmail })
      .trim()
      .min(1, { message: EMessages.inputErrorRequired })
      .max(50, { message: `${EMessages.inputErrorMaxString} 50` }),
    legalNumber: z
      .string({ message: EMessages.inputErrorTypeString })
      .trim()
      .max(80, { message: `${EMessages.inputErrorMaxString} 50` }),
    comercialName: z
      .string({ message: EMessages.inputErrorTypeString })
      .trim()
      .max(80, { message: `${EMessages.inputErrorMaxString} 50` }),
    phone: z
      .string({ message: EMessages.inputErrorTypeString })
      .trim()
      .max(80, { message: `${EMessages.inputErrorMaxString} 50` }),
    restaurant: z
      .string({ message: EMessages.inputErrorTypeString }),
    createdBy: z
      .string({ message: EMessages.inputErrorTypeString }),
  });