import { z } from "zod";
import { EMessages } from "@/utils/enums/messages";

export const UserSchema = z.object({
    email: z.string({ message: EMessages.inputErrorTypeString }),
    id_clerk: z.string({ message: EMessages.inputErrorTypeString }),
    name: z.string({ message: EMessages.inputErrorTypeString }),
});