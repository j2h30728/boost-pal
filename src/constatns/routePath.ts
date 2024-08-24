export const ROUTE_PATHS = {
  INTRO: "/intro",
  LOG_IN: "/log-in",
  CREATE_ACCOUNT: "/create-account",
  UPLOAD: "/upload",
  HOME: "/",
  POSTS: "/posts",
  CALENDAR: "/calendar",
  PROFILE: (username: string) => `/users/${username}`,
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
  return "";
};
