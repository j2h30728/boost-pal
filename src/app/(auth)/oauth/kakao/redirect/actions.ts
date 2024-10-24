import { getSession } from "@/lib/server/session";

const API_HOST = "https://kapi.kakao.com";

export async function kakaoLogOut() {
  const session = await getSession();
  if (session.oauth) {
    await fetch(`${API_HOST}/v1/user/logout`, {
      method: "POST",
      headers: { Authorization: `Bearer ${session.oauth.access_token}` },
      cache: "no-cache",
    });
  }
}
