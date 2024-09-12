import Link from "next/link";

import Logo from "@/components/common/Logo";

export default function NotFound() {
  return (
    <div className="w-full h-screen flex flex-col justify-around items-center gap-5">
      <Logo />
      <div className="flex flex-col gap-10">
        <h2 className="text-2xl font-bold">페이지를 찾을 수 없습니다</h2>
        <p className="text-lg">요청하신 리소스를 찾을 수 없습니다</p>
      </div>
      <Link className="primary-button w-full" href="/">
        메인 페이지로 이동
      </Link>
    </div>
  );
}
