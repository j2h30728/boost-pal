import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Post } from "@prisma/client";
import Link from "next/link";

import { WEEKS } from "@/constants/calendar";
import { CATEGORIES } from "@/constants/cateogries";

export default function CalendarContent({ post }: { post: Post }) {
  return (
    <div className="flex w-full h-[73px] rounded-2xl shadow-xl">
      <div className="flex flex-col justify-center items-center w-1/5 border-r border-underline">
        <span className="text-sm">{WEEKS[post.created_at.getDay()]}</span>
        <div className="text-md">{post.created_at.getDate()}</div>
      </div>
      <div className="flex items-center w-full">
        <div className="pl-4 flex flex-col gap-2">
          <div className="chip text-[11px] w-10">{CATEGORIES[post.category]}</div>
          <p className="truncate w-56 text-sm">{post.description}</p>
        </div>
        <Link href={`/posts/${post.id}`} className="ml-auto">
          <ChevronRightIcon className="size-4" />
        </Link>
      </div>
    </div>
  );
}
