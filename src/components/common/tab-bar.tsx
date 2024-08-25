import { ROUTE_PATHS } from "@/constants/routePath";
import { HomeIcon, CalendarDaysIcon, UserIcon, Bars3BottomLeftIcon, PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function TabBar() {
  return (
    <div className="*:text-neutral max-w-screen-sm w-full bg-white fixed bottom-0 flex justify-around border-t border-border py-2">
      <Link
        href={ROUTE_PATHS.UPLOAD}
        className="w-14 h-14 bg-border absolute rounded-full bottom-7 flex justify-center items-center">
        <PlusIcon className="w-6 h-6 text-base" />
      </Link>
      <Link href={ROUTE_PATHS.HOME} className="flex flex-col justify-center items-center">
        <HomeIcon className="w-6 h-6" />
        <span className="text-xs">홈</span>
      </Link>
      <Link href={ROUTE_PATHS.POSTS} className="flex flex-col justify-center items-center">
        <Bars3BottomLeftIcon className="w-6 h-6" />
        <span className="text-xs">인증 피드</span>
      </Link>
      <Link href={ROUTE_PATHS.CALENDAR} className="flex flex-col justify-center items-center">
        <CalendarDaysIcon className="w-6 h-6" />
        <span className="text-xs">캘린더</span>
      </Link>
      <Link href={ROUTE_PATHS.PROFILE("1")} className="flex flex-col justify-center items-center">
        <UserIcon className="w-6 h-6" />
        <span className="text-xs">마이페이지</span>
      </Link>
    </div>
  );
}
