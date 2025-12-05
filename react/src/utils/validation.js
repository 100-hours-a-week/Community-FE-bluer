import {
  EmailErrorMessage,
  EmailErrorType,
  NicknameErrorMessage,
  NicknameErrorType,
} from "@/lib/constants";

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function getEmailError(email) {
  if (!email || email.length === 0)
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

export const isValidNickname = (nickname) => /^[^\s]{1,10}$/.test(nickname);
export const getNicknameError = (nickname) => {
  if (!nickname || nickname?.length < 1) {
    return { errorType: NicknameErrorType.REQUIRED, message: NicknameErrorMessage.REQUIRED };
  }

  if (!isValidNickname(nickname)) {
    if (nickname.includes(" ")) {
      return {
        errorType: NicknameErrorType.INVALID_FORMAT,
        message: NicknameErrorMessage.INVALID_FORMAT,
      };
    }

    if (nickname.length > 10) {
      return { errorType: NicknameErrorType.TOO_LONG };
    }
  }

  return null;
};
