import {
  ERROR_TYPE,
  ERROR_MESSAGES,
  DUPLICATE_EMAILS,
  DUPLICATE_NICKNAMES,
} from "./constants.js";

const isValidEmail = email => {
  // ex. user@localhost => wrong
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = password => {
  // 비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
  return passwordRegex.test(password);
};

export const isValidNickname = nickname => /^[^\s]{1,10}$/.test(nickname);

export const getLoginInputError = (email, password) => {
  if (!isValidEmail(email)) {
    return { errorType: ERROR_TYPE.WRONG_FORMAT_EMAIL };
  }
  if (password.length < 1) {
    return { errorType: ERROR_TYPE.TOO_SHORT_PASSWORD };
  }
  if (!isValidPassword(password)) {
    return { errorType: ERROR_TYPE.WRONG_FORMAT_PASSWORD };
  }
  return { errorType: null };
};

//회원가입용 필드별 validator
export const getEmailError = email => {
  if (!email) {
    return { errorType: ERROR_TYPE.EMPTY_EMAIL };
  }

  if (!isValidEmail(email)) {
    return { errorType: ERROR_TYPE.WRONG_FORMAT_EMAIL };
  }

  if (DUPLICATE_EMAILS.includes(email)) {
    return { errorType: ERROR_TYPE.DUPLICATE_EMAIL };
  }

  return { errorType: null };
};

export const getPasswordError = password => {
  if (!password) {
    return { errorType: ERROR_TYPE.TOO_SHORT_PASSWORD };
  }

  if (!isValidPassword(password)) {
    return { errorType: ERROR_TYPE.WRONG_FORMAT_PASSWORD };
  }

  return { errorType: null };
};

export const getPasswordCheckError = (password, passwordcheck) => {
  if (!passwordcheck) {
    return { errorType: ERROR_TYPE.EMPTY_PASSWORD_CHECK };
  }

  if (passwordcheck !== password) {
    return { errorType: ERROR_TYPE.PASSWORD_MISMATCH };
  }

  return { errorType: null };
};

export const getNicknameError = nickname => {
  if (!nickname || nickname?.length < 1) {
    return { errorType: ERROR_TYPE.EMPTY_NICKNAME };
  }

  if (!isValidNickname(nickname)) {
    if (nickname.includes(" ")) {
      return { errorType: ERROR_TYPE.WRONG_FORMAT_NICKNAME };
    }

    if (nickname.length > 10) {
      return { errorType: ERROR_TYPE.TOO_LONG_NICKNAME };
    }
  }

  if (DUPLICATE_NICKNAMES.includes(nickname)) {
    return { errorType: ERROR_TYPE.DUPLICATE_NICKNAME };
  }

  return { errorType: null };
};

// 회원가입 전체 validator
export const getSignupInputError = ({
  email,
  password,
  passwordcheck,
  nickname,
  profileImgUrl,
}) => {
  const emailError = getEmailError(email);
  if (emailError.errorType) {
    return emailError;
  }

  const passwordError = getPasswordError(password);
  if (passwordError.errorType) {
    return passwordError;
  }

  const passwordCheckError = getPasswordCheckError(password, passwordcheck);
  if (passwordCheckError.errorType) {
    return passwordCheckError;
  }

  const nicknameError = getNicknameError(nickname);
  if (nicknameError.errorType) {
    return nicknameError;
  }

  if (!profileImgUrl) {
    return { errorType: ERROR_TYPE.EMPTY_PROFILE_IMAGE };
  }

  return { errorType: null };
};

export const getErrorMessage = errorType => ERROR_MESSAGES[errorType] || "";
