export const ROUTE_PATHS = {
  INTRO: "/intro",
  LOG_IN: "/log-in",
  KAKAO_LOG_IN: "/oauth/kakao",
  CREATE_ACCOUNT: "/create-account",
  UPLOAD: "/upload",
  HOME: "/",
  POSTS: "/posts",
  CALENDAR: "/calendar",
  PROFILE: (username: string) => `/users/${username}`,
  SEARCH: "/search",
} as const;

export const ROUTE_TITLE = {
  "/intro": "",
  "/log-in": "로그인",
  "/create-account": "회원가입",
};

export const getRouteTile = (pathname: string) => {
  if (pathname === ROUTE_PATHS.LOG_IN) {
    return "로그인";
  }
  if (pathname === ROUTE_PATHS.CREATE_ACCOUNT) {
    return "회원가입";
  }
  if (pathname === ROUTE_PATHS.UPLOAD) {
    return "인증 등록";
  }
  if (pathname.includes(ROUTE_PATHS.POSTS)) {
    return "인증";
  }
  if (pathname.includes(ROUTE_PATHS.PROFILE(""))) {
    return "프로필";
  }
  if (pathname === ROUTE_PATHS.CALENDAR) {
    return "캘린더";
  }
  if (pathname === ROUTE_PATHS.SEARCH) {
    return "검색";
  }
  return "";
};
