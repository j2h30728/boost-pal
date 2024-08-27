import Link from "next/link";

import { ROUTE_PATHS } from "@/constants/routePath";
import Image from "next/image";

import mainImage from "../../../public/images/main-image.png";

export default function IntroPage() {
  return (
    <main className="h-screen flex flex-col gap-5 px-5 items-center justify-around">
      <div className="w-full flex flex-col items-center justify-between relative">
        <div className="w-72 h-96 relative">
          <Image priority className="w-auto h-full" src={mainImage} width={288} height={384} alt="main-image" />
        </div>
        <h1 className=" font-black flex gap-2 text-[44px] absolute -translate-y-1/2 top-1/2">
          <p className="first-letter:text-primary">BOOST</p>
          <p className="first-letter:text-primary">PAL</p>
        </h1>
      </div>
      <div className="w-full flex flex-col gap-3  items-center">
        <Link className="w-full primary-button" href={ROUTE_PATHS.LOG_IN}>
          이메일로 로그인
        </Link>
        <Link href={ROUTE_PATHS.CREATE_ACCOUNT} className="text-base text-sm">
          회원가입
        </Link>
      </div>
    </main>
  );
}
