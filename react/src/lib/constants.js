export const Z_INDEX = Object.freeze({
  HEADER: 1,
  BOTTOM_NAV: 1,
});

export const EmailErrorType = Object.freeze({
  REQUIRED: "REQUIRED",
  INVALID_FORMAT: "INVALID_FORMAT",
  DUPLICATED: "DUPLICATED",
});

export const EmailErrorMessage = Object.freeze({
  [EmailErrorType.REQUIRED]: "이메일을 입력해 주세요.",
  [EmailErrorType.INVALID_FORMAT]: "올바른 이메일 형식을 입력해주세요.",
  [EmailErrorType.DUPLICATED]: "이미 사용 중인 이메일입니다.",
});
