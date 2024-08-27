import Link from "next/link";
import Image from "next/image";

import { ROUTE_PATHS } from "@/constants/routePath";
import LogInForm from "@/components/user/log-in-form";

import subImage from "../../../../public/images/sub-image.png";

export default function LogInPage() {
  return (
    <main className="flex flex-col gap-5">
      <div className="flex flex-col justify-center">
        <h1 className="text-2xl w-64 sm:mt-20">
          귀여운 친구의 <span className="text-primary font-semibold">응원</span>과 함께
          <span className="text-primary font-semibold">오늘을 기록</span>하고 싶다면?
        </h1>
        <div className=" self-end w-48 h-52 relative overflow-clip">
          <Image className="w-auto h-full" width={192} height={208} priority src={subImage} alt="sub-image" />
        </div>
      </div>
      <div className="flex flex-col">
        <LogInForm />
        <p className="text-underline">
          아직 계정이 없으신가요?
          <Link className="text-secondary-1 ml-3" href={ROUTE_PATHS.CREATE_ACCOUNT}>
            회원가입
          </Link>
        </p>
      </div>
    </main>
  );
}
