import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/server/session";
import { ROUTE_PATHS } from "./constants/routePath";

const PUBLIC_URL: string[] = [
  ROUTE_PATHS.INTRO,
  ROUTE_PATHS.CREATE_ACCOUNT,
  ROUTE_PATHS.LOG_IN,
  ROUTE_PATHS.KAKAO_LOG_IN,
  ROUTE_PATHS.KAKAO_LOG_IN + "/redirect",
];

export async function middleware(req: NextRequest) {
  const session = await getSession();

  if (PUBLIC_URL.includes(req.nextUrl.pathname)) {
    if (session.id) {
      return NextResponse.redirect(new URL("/", req.url));
    } else {
      return NextResponse.next();
    }
  }

  if (!session.id && !req.nextUrl.pathname.startsWith(ROUTE_PATHS.INTRO)) {
    return NextResponse.redirect(new URL(ROUTE_PATHS.INTRO, req.url));
  }
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
