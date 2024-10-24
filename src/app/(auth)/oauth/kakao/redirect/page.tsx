"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { kakaoLogIn } from "./actions";

import LoadingDots from "@/components/common/loadingDots";

export default function KakaoLogIn() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    (async () => {
      if (code) {
        await kakaoLogIn(code);
      }
    })();
  }, [code]);

  return (
    <main className="w-full h-screen flex justify-center items-center flex-col gap-16">
      <LoadingDots />
      <h3 className="text-lg font-semibold">로그인 진행 중</h3>
    </main>
  );
}
