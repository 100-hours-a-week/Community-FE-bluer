import { ERROR_TYPE } from "./constants.js";

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
