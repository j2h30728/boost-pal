"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, CalendarDaysIcon, UserIcon, Bars3BottomLeftIcon, PlusIcon } from "@heroicons/react/24/solid";

import { ROUTE_PATHS } from "@/constants/routePath";
import { isCurrentPath } from "@/lib/client/utils";

export default function TabBar({ username }: { username: string }) {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 max-w-screen-sm w-full">
      <Link
        href={ROUTE_PATHS.UPLOAD}
        className="w-14 h-14  absolute rounded-full bottom-7 flex justify-center items-center  -translate-x-1/2 left-1/2 bg-border">
        <PlusIcon className="w-6 h-6 text-base" />
      </Link>
      <div className="*:text-neutral bg-white flex justify-around border-t border-border py-2 *:flex *:flex-col *:justify-center *:items-center">
        <Link href={ROUTE_PATHS.HOME} className={isCurrentPath(pathname, ROUTE_PATHS.HOME) ? "*:text-primary" : ""}>
          <HomeIcon className="w-6 h-6" />
          <span className="text-xs">홈</span>
        </Link>
        <Link href={ROUTE_PATHS.POSTS} className={isCurrentPath(pathname, ROUTE_PATHS.POSTS) ? "*:text-primary" : ""}>
          <Bars3BottomLeftIcon className="w-6 h-6" />
          <span className="text-xs">인증 피드</span>
        </Link>
        <Link
          href={ROUTE_PATHS.CALENDAR}
          className={isCurrentPath(pathname, ROUTE_PATHS.CALENDAR) ? "*:text-primary" : ""}>
          <CalendarDaysIcon className="w-6 h-6" />
          <span className="text-xs">캘린더</span>
        </Link>
        <Link
          href={ROUTE_PATHS.PROFILE(username)}
          className={isCurrentPath(pathname, ROUTE_PATHS.PROFILE(username)) ? "*:text-primary" : ""}>
          <UserIcon className="w-6 h-6" />
          <span className="text-xs">마이페이지</span>
        </Link>
      </div>
    </div>
  );
}
