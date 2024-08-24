import Link from "next/link";

import Input from "@/components/common/input";
import Button from "@/components/common/button";
import { ROUTE_PATHS } from "@/constatns/routePath";

export default function LogInPage() {
  return (
    <main className="flex flex-col gap-5 justify-between">
      <h1 className="text-2xl w-64">
        귀여운 친구의 <span className="text-primary font-semibold">응원</span>과 함께
        <span className="text-primary font-semibold">오늘을 기록</span>하고 싶다면?
      </h1>
      <div className=" self-end w-36 h-36 bg-gray-200"></div>
      <form className="flex flex-col gap-3 ">
        <Input
          name="email"
          type="email"
          placeholder="이메일을 입력해주세요."
          required={true}
          errorMessage={""}
          label="이메일"
        />
        <Input
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          required={true}
          errorMessage={""}
          label="비밀번호"
        />
        <Button text="로그인" />
      </form>
      <p className="text-underline">
        아직 계정이 없으신가요? <Link href={ROUTE_PATHS.CREATE_ACCOUNT}>회원가입</Link>
      </p>
    </main>
  );
}
