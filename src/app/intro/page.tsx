import Link from "next/link";
import Image from "next/image";

import { ROUTE_PATHS } from "@/constants/routePath";
import Logo from "@/components/common/Logo";

import mainImage from "../../../public/images/main-image.webp";
import { KaKaoIcon } from "@/components/common/incons";

export default function IntroPage() {
  return (
    <main className="h-screen flex flex-col gap-5 px-5 items-center justify-around">
      <div className="w-full flex flex-col items-center justify-between relative">
        <div className="w-72 h-96 relative">
          <Image priority className="w-auto h-full" src={mainImage} width={288} height={384} alt="main-image" />
        </div>
        <div className=" absolute -translate-y-1/2 top-1/2">
          <Logo />
        </div>
      </div>
      <div className="w-full flex flex-col gap-3  items-center">
        <Link className="w-full primary-button" href={ROUTE_PATHS.LOG_IN}>
          이메일 로그인
        </Link>
        <Link href={ROUTE_PATHS.CREATE_ACCOUNT} className="text-base text-sm">
          회원가입
        </Link>
        <Link className="w-full flex gap-3 primary-button bg-yellow-300 text-neutral" href={ROUTE_PATHS.KAKAO_LOG_IN}>
          <KaKaoIcon width={25} height={20} /> 카카오 로그인
        </Link>
      </div>
    </main>
  );
}
