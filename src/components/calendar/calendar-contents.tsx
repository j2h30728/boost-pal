import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function CalendarContents() {
  return (
    <div className="flex w-full rounded-2xl shadow-xl py-3">
      <div className="flex flex-col justify-center items-center w-1/5 border-r border-underline">
        <span className="text-sm">수</span>
        <div className="text-md">20</div>
      </div>
      <div className="flex items-center ">
        <div className="pl-4 flex flex-col gap-2">
          <div className="chip text-[11px] w-10">운동</div>
          <p className="truncate w-56 text-sm">
            왜 갈수록 체력이 줄어드는거 같은기분ㅋㅋ 5분뛰고 힘들어서 천천히 뛰었더니 8주동안 제일 ..
          </p>
        </div>
        <Link href={`/posts/1`}>
          <ChevronRightIcon className="size-4" />
        </Link>
      </div>
    </div>
  );
}
