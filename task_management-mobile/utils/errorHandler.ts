export function getErrorMessage(
  error: any,
  defaultMessage: string = "Erro inesperado"
): string {

  const responseData = error.response?.data;

  if (responseData && responseData.errors) {
    const firstFieldError = Object.values(responseData.errors)[0];
    if (Array.isArray(firstFieldError) && firstFieldError.length > 0) {
      return firstFieldError[0];
    }
  }

  if (responseData && responseData.message) {
    return responseData.message;
  }

  return defaultMessage;
}
