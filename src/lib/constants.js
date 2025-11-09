export const POST_TITLE_MAX_LENGTH = 26;

export const DUMMY_POSTS = [
  {
    id: 1,
    title: "오늘의 기분 ☕️",
    author: "드럼치는 개발자",
    likes: 3,
    comments: 2,
    views: 41,
    createdAt: "2025-11-06 12:00:00",
  },
  {
    id: 2,
    title: "바닐라 JS로 SPA 만들기 후기",
    author: "코딩러",
    likes: 7,
    comments: 5,
    views: 120,
    createdAt: "2025-11-05 15:30:00",
  },
  {
    id: 3,
    title: "제목제목제목제목제목제목제목제목제목제목제목제목제목1",
    author: "블루노트",
    likes: 1,
    comments: 0,
    views: 12,
    createdAt: "2025-11-04 09:45:00",
  },
];

export const LOGIN_DELAY_MILLISECONDS = 3000;

export const ERROR_TYPE = Object.freeze({
  WRONG_FORMAT_EMAIL: "wrong-format-email",
  DUPLICATE_EMAIL: "duplicate-email",
  EMPTY_EMAIL: "empty-email",

  TOO_SHORT_PASSWORD: "too-short-password",
  WRONG_FORMAT_PASSWORD: "wrong-format-password",
  PASSWORD_MISMATCH: "password-mismatch",
  EMPTY_PASSWORD_CHECK: "empty-password-check",

  EMPTY_NICKNAME: "empty-nickname",
  WRONG_FORMAT_NICKNAME: "wrong-format-nickname",
  DUPLICATE_NICKNAME: "duplicate-nickname",
  TOO_LONG_NICKNAME: "too-long-nickname",

  EMPTY_PROFILE_IMAGE: "empty-profile-image",
});

export const ERROR_MESSAGES = {
  [ERROR_TYPE.EMPTY_EMAIL]: "* 이메일을 입력해주세요.",
  [ERROR_TYPE.WRONG_FORMAT_EMAIL]:
    "* 올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)",
  [ERROR_TYPE.DUPLICATE_EMAIL]: "* 중복된 이메일 입니다.",

  [ERROR_TYPE.TOO_SHORT_PASSWORD]: "* 비밀번호를 입력해주세요.",
  [ERROR_TYPE.WRONG_FORMAT_PASSWORD]:
    "* 비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.",
  [ERROR_TYPE.PASSWORD_MISMATCH]: "* 비밀번호가 다릅니다.",
  [ERROR_TYPE.EMPTY_PASSWORD_CHECK]: "* 비밀번호를 한번더 입력해주세요.",

  [ERROR_TYPE.EMPTY_NICKNAME]: "* 닉네임을 입력해주세요.",
  [ERROR_TYPE.WRONG_FORMAT_NICKNAME]: "* 띄어쓰기를 없애주세요.",
  [ERROR_TYPE.TOO_LONG_NICKNAME]: "* 닉네임은 최대 10자 까지 작성 가능합니다.",
  [ERROR_TYPE.DUPLICATE_NICKNAME]: "* 중복된 닉네임 입니다.",

  [ERROR_TYPE.EMPTY_PROFILE_IMAGE]: "* 프로필 사진을 추가해주세요.",
};

// TODO: fix code using below constants as using api
export const DUPLICATE_EMAILS = ["test@test2.com", "hello@naver.com"];
export const DUPLICATE_NICKNAMES = ["admin", "user1"];
