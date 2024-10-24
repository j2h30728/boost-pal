const BASE_URL = "https://kauth.kakao.com/oauth/authorize";

export function GET() {
  const params = {
    client_id: process.env.KAKAO_REST_API_KEY!,
    redirect_uri: process.env.KAKAO_REDIRECT_URI!,
    response_type: "code",
  };
  const formattedParams = new URLSearchParams(params).toString();
  const finalUrl = `${BASE_URL}?${formattedParams}`;
  return Response.redirect(finalUrl);
}
