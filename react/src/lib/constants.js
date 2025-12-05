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

export const NicknameErrorType = Object.freeze({
  REQUIRED: "REQUIRED",
  INVALID_FORMAT: "INVALID_FORMAT",
  DUPLICATED: "DUPLICATED",
  TOO_LONG: "TOO_LONG",
});

export const NicknameErrorMessage = Object.freeze({
  [NicknameErrorType.REQUIRED]: "닉네임을 입력해주세요.",
  [NicknameErrorType.INVALID_FORMAT]: "띄어쓰기를 없애주세요.",
  [NicknameErrorType.TOO_LONG]: "닉네임은 최대 10자 까지 작성 가능합니다.",
  [NicknameErrorType.DUPLICATED]: "중복된 닉네임 입니다.",
});
