export const actionResponse = (
  isError: boolean,
  actionName: string,
  data?: any
): string => {
  return JSON.stringify({
    error: isError,
    message: isError
      ? `Ha ocurrido un problema procesando la solicitud ${actionName}`
      : `La solicitud de ${actionName} se ha procesado correctamente`,
    data: isError ? null : data,
  });
};

export const actionResponseErrorLog = (error: unknown, actionName: string) => {
  console.error(`Error in ${actionName}:`, error);
};
