export enum EMessages {
  // INPUTS MESSAGES
  inputErrorTypeString = "El campo debe ser de tipo texto",
  inputErrorTypeEmail = "El campo debe ser un correo electrónico",
  inputErrorTypeBoolean = "El campo debe ser de tipo booleano",
  inputErrorTypeDate = "El campo debe ser de tipo fecha",
  inputErrorTypeNumber = "El campo debe ser de tipo número",
  inputErrorRequired = "El campo es requerido",
  inputErrorMaxString = "El campo debe tener una cantidad máxima de caracteres: ",
  inputErrorMinString = "El campo debe tener una cantidad mínima de caracteres: ",

  // AUTH MESSAGES
  authErrorUserExist = "user_already_exists",
  authErrorInvalidCredentials = "Invalid login credentials",
  authErrorValidationFormError = "validationFormError",
  authErrorGeneralError = "authProcessError",
  authErrorSignupErrorUserExist = "signupErrorUserExist",
  authSuccessSignup = "signupSuccess",
}
