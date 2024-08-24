import Link from "next/link";

import { ROUTE_PATHS } from "@/constatns/routePath";

export default function LogInPage() {
  return (
    <main className="h-screen flex flex-col gap-5 px-5 items-center justify-around">
      <div className="flex flex-col gap-7 items-center justify-between">
        <div className="w-64 h-64 bg-underline"></div>
        <h1 className=" font-black text-[44px] ">이름 이름</h1>
      </div>
      <div className="w-full flex flex-col gap-3  items-center">
        <Link className="w-full primary-button" href={ROUTE_PATHS.CREATE_ACCOUNT}>
          이메일로 로그인
        </Link>
        <Link href={ROUTE_PATHS.CREATE_ACCOUNT} className="text-underline text-xs">
          회원가입
        </Link>
      </div>
    </main>
  );
}
