import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Post } from "@prisma/client";
import Link from "next/link";

import { WEEKS } from "@/constants/calendar";
import { CATEGORIES } from "@/constants/cateogries";

export default function CalendarContent({ post }: { post: Post }) {
  return (
    <div className="flex items-center w-full h-[73px] rounded-2xl shadow-custom">
      <div className="flex flex-col justify-center items-center min-w-16 border-r border-underline">
        <span className="text-sm">{WEEKS[post.created_at.getDay()]}</span>
        <div className="text-md">{post.created_at.getDate()}</div>
      </div>
      <div className="pl-4 flex flex-col gap-2 w-full min-w-52">
        <div className="chip text-[11px] w-10">{CATEGORIES[post.category]}</div>
        <p className="truncate text-sm">{post.description}</p>
      </div>
      <Link href={`/posts/${post.id}`} className="ml-auto min-w-10">
        <ChevronRightIcon className="size-5" />
      </Link>
    </div>
  );
}
