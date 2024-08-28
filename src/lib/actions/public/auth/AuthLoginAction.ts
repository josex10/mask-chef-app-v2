import { EMessages } from "@/utils/enums/messages";
import { AuthLoginSchema } from "@/utils/schemas/public/auth/AuthLoginSchema";

type AuthResponse = {
  error: EMessages | null;
};

export async function authLoginAction(
  auth: unknown
): Promise<AuthResponse> {
  const validation = AuthLoginSchema.safeParse(auth);

  if (validation.error) {
    return {
      error: EMessages.authErrorValidationFormError,
    };
  }

  //TODO: VALIDATE USER AND PASSWORD ON THE DB

  return new Promise((resolve) => {
    resolve({ error: null });
  });
}
