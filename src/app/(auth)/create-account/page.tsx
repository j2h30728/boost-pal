import Link from "next/link";

import Input from "@/components/common/input";
import Button from "@/components/common/button";
import { ROUTE_PATHS } from "@/constatns/routePath";
import Header from "@/components/common/header";

export default function CreateAccountPage() {
  return (
    <main className="flex flex-col gap-5">
      <form className="flex flex-col gap-3">
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
        <Input
          name="conformPassword"
          type="conformPassword"
          placeholder="한 번 더 입력해주세요."
          required={true}
          errorMessage={""}
          label="비밀번호 확인"
        />
        <Input
          name="username"
          type="username"
          placeholder="최소 2자, 최대 8자 입력해주세요."
          required={true}
          errorMessage={""}
          label="닉네임"
        />
        <Button text="회원가입" />
      </form>

      <p className="text-underline">
        이미 계정이 있나요? <Link href={ROUTE_PATHS.LOG_IN}>로그인</Link>
      </p>
    </main>
  );
}
