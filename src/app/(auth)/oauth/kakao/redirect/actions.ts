"use server";

import db from "@/lib/server/db";
import { getSession } from "@/lib/server/session";
import { createOAuthUser } from "@/service/userService";
import { notFound, redirect } from "next/navigation";

const KAKAO_API_HOST = "https://kapi.kakao.com";
const KAKO_TOKEN_URL = "https://kauth.kakao.com/oauth/token";

export async function kakaoLogIn(code: string) {
  if (!code) {
    return notFound();
  }

  const { error, access_token, refresh_token } = await getKakaoToken(code);
  if (error) {
    return new Response(null, {
      status: 400,
    });
  }

  const { kakao_account, id: profileId } = await getKaKoProfile(access_token);
  let user = await db.user.findUnique({
    where: {
      email: kakao_account.email,
    },
    select: {
      id: true,
    },
  });

  const session = await getSession();
  if (!user) {
    user = await createOAuthUser({
      email: kakao_account.email,
      username: kakao_account.profile.nickname + profileId,
      avatar: kakao_account.profile.profile_image_url,
    });
  }

  session.id = user.id;
  session.oauth = {
    access_token,
    refresh_token,
  };
  await session.save();
  return redirect("/");
}

async function getKakaoToken(code: string) {
  const tokenParams = new URLSearchParams({
    client_id: process.env.KAKAO_REST_API_KEY!,
    redirect_uri: process.env.KAKAO_REDIRECT_URI!,
    client_secret: process.env.KAKAO_CLIENT_SECRET!,
    code,
    grant_type: "authorization_code",
  }).toString();
  const tokenResponse = await fetch(`${KAKO_TOKEN_URL}?${tokenParams}`, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
  });
  return tokenResponse.json();
}

async function getKaKoProfile(access_token: string) {
  const profileResponse = await fetch(`${KAKAO_API_HOST}/v2/user/me`, {
    method: "GET",
    headers: { "content-type": "application/x-www-form-urlencoded", Authorization: `Bearer ${access_token}` },
    cache: "no-cache",
  });
  return profileResponse.json();
}

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
