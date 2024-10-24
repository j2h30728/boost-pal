"use server";

import { kakaoLogOut } from "@/app/(auth)/oauth/kakao/redirect/actions";
import { ROUTE_PATHS } from "@/constants/routePath";
import { getSession } from "@/lib/server/session";
import { redirect } from "next/navigation";

export const logOut = async (_: FormData) => {
  const session = await getSession();
  if (session.oauth) {
    await kakaoLogOut();
  }
  session.destroy();
  redirect(ROUTE_PATHS.INTRO);
};
