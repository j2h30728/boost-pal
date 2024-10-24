"use server";

import db from "@/lib/server/db";
import { getSession } from "@/lib/server/session";
import { notFound, redirect } from "next/navigation";

const KAKAO_API_HOST = "https://kapi.kakao.com";
const KAKO_TOKEN_URL = "https://kauth.kakao.com/oauth/token";

export async function kakaoLogOut() {
  const session = await getSession();
  if (session.oauth) {
    await fetch(`${KAKAO_API_HOST}/v1/user/logout`, {
      method: "POST",
      headers: { Authorization: `Bearer ${session.oauth.access_token}` },
      cache: "no-cache",
    });
  }
}

export async function kakaoLogIn(code: string) {
  if (!code) {
    return notFound();
  }

  const tokenParams = new URLSearchParams({
    client_id: process.env.KAKAO_REST_API_KEY!,
    redirect_uri: process.env.KAKAO_REDIRECT_URI!,
    client_secret: process.env.KAKAO_CLIENT_SECRET!,
    code,
    grant_type: "authorization_code",
  }).toString();

  const defaultHeaders = { "content-type": "application/x-www-form-urlencoded" };
  const tokenResponse = await fetch(`${KAKO_TOKEN_URL}?${tokenParams}`, {
    method: "POST",
    headers: defaultHeaders,
  });
  const { error, access_token, refresh_token } = await tokenResponse.json();
  if (error) {
    return new Response(null, {
      status: 400,
    });
  }

  const profileResponse = await fetch(`${KAKAO_API_HOST}/v2/user/me`, {
    method: "GET",
    headers: { ...defaultHeaders, Authorization: `Bearer ${access_token}` },
    cache: "no-cache",
  });
  const { kakao_account, id: profileId } = await profileResponse.json();
  const user = await db.user.findUnique({
    where: {
      email: kakao_account.email,
    },
    select: {
      id: true,
    },
  });
  if (user) {
    const session = await getSession();
    session.id = user.id;
    session.oauth = {
      access_token,
      refresh_token,
    };

    await session.save();
    return redirect("/");
  }
  const newUser = await db.user.create({
    data: {
      email: kakao_account.email,
      username: kakao_account.profile.nickname + profileId,
      avatar: kakao_account.profile.profile_image_url,
    },
    select: {
      id: true,
    },
  });
  const session = await getSession();
  session.id = newUser.id;
  session.oauth = {
    access_token,
    refresh_token,
  };
  await session.save();
  return redirect("/");
}
