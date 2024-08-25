import Link from "next/link";

import { ROUTE_PATHS } from "@/constants/routePath";
import LogInForm from "@/components/user/log-in-form";

export default function LogInPage() {
  return (
    <main className="flex flex-col gap-5 justify-between">
      <h1 className="text-2xl w-64">
        귀여운 친구의 <span className="text-primary font-semibold">응원</span>과 함께
        <span className="text-primary font-semibold">오늘을 기록</span>하고 싶다면?
      </h1>
      <div className=" self-end w-36 h-36 bg-gray-200"></div>
      <LogInForm />
      <p className="text-underline">
        아직 계정이 없으신가요? <Link href={ROUTE_PATHS.CREATE_ACCOUNT}>회원가입</Link>
      </p>
    </main>
  );
}
