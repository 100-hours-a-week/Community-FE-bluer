import { EmailErrorMessage, EmailErrorType } from "@/lib/constants";

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function getEmailError(email) {
  if (!email)
    return {
      errorType: EmailErrorType.REQUIRED,
      message: EmailErrorMessage.REQUIRED,
    };
  if (!isValidEmail(email))
    return {
      errorType: EmailErrorType.INVALID_FORMAT,
      message: EmailErrorMessage.INVALID_FORMAT,
    };
  return null;
}
