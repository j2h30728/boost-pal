"use client";

import { getRouteTile } from "@/constatns/routePath";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { usePathname, useRouter } from "next/navigation";

export default function Header({ isBackButton = false }: { isBackButton?: Boolean }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      {getRouteTile(pathname).length !== 0 ? (
        <div className="z-50 top-0 max-w-screen-sm fixed flex items-center justify-center h-[50px] w-full bg-white">
          {isBackButton && (
            <ChevronLeftIcon className="absolute left-5 mr-auto w-[20px] h-[20px] text-neutral" onClick={router.back} />
          )}
          <h1 className="font-bold text-xl">{getRouteTile(pathname)}</h1>
        </div>
      ) : null}
    </>
  );
}
