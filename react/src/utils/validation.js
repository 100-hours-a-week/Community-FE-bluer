import {
  EmailErrorMessage,
  EmailErrorType,
  NicknameErrorMessage,
  NicknameErrorType,
  PasswordErrorMessage,
  PasswordErrorType,
} from "@/lib/constants";

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function getEmailError(email) {
  if (!email || email?.length < 1)
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
    return {
      errorType: NicknameErrorType.REQUIRED,
      message: NicknameErrorMessage.REQUIRED,
    };
  }

  if (!isValidNickname(nickname)) {
    if (nickname.includes(" ")) {
      return {
        errorType: NicknameErrorType.INVALID_FORMAT,
        message: NicknameErrorMessage.INVALID_FORMAT,
      };
    }

    if (nickname.length > 10) {
      return {
        errorType: NicknameErrorType.TOO_LONG,
        message: NicknameErrorMessage.TOO_LONG,
      };
    }
  }

  return null;
};

const isValidPassword = (password) => {
  // 비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
  return passwordRegex.test(password);
};

export const getPasswordError = (password) => {
  if (!password || password?.length < 1) {
    return {
      errorType: PasswordErrorType.TOO_SHORT,
      message: PasswordErrorMessage.TOO_SHORT,
    };
  }

  if (!isValidPassword(password)) {
    return {
      errorType: PasswordErrorType.WRONG_FORMAT,
      message: PasswordErrorMessage.WRONG_FORMAT,
    };
  }

  return null;
};
