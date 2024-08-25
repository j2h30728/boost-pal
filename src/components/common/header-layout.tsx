"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

import { ChevronLeftIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { getRouteTile, ROUTE_PATHS } from "@/constants/routePath";

export default function HeaderLayout({
  isBackButton = false,
  isSearchButton = true,
  children,
}: {
  isBackButton?: Boolean;
  isSearchButton?: Boolean;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const displayHeader = getRouteTile(pathname).length !== 0;

  if (!displayHeader) return children;

  return (
    <>
      <div className="z-50 top-0 max-w-screen-sm fixed flex items-center justify-between h-[50px] w-full bg-white px-5">
        <div className="size-6">
          {isBackButton ? (
            <ChevronLeftIcon className="absolute left-5 mr-auto w-[20px] h-[20px] text-neutral" onClick={router.back} />
          ) : null}
        </div>
        <h1 className="font-bold text-xl">{getRouteTile(pathname)}</h1>
        <div className="size-6">
          {isSearchButton ? (
            <Link href={ROUTE_PATHS.SEARCH}>
              <MagnifyingGlassIcon className="size-6 text-neutral" />
            </Link>
          ) : null}
        </div>
      </div>
      <div className="pt-[60px] px-5">{children}</div>
    </>
  );
}
