import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Post } from "@prisma/client";
import Link from "next/link";

import { WEEKS } from "@/constants/calendar";
import { CATEGORIES } from "@/constants/categories";

export default function CalendarContent({ post }: { post: Post }) {
  const createdDate = new Date(post.created_at);

  return (
    <Link href={`/posts/${post.id}`} className="flex items-center w-full h-[73px] rounded-2xl shadow-custom">
      <div className="flex flex-col justify-center items-center min-w-16 border-r border-underline">
        <span className="text-sm">{WEEKS[createdDate.getDay()]}</span>
        <div className="text-md">{createdDate.getDate()}</div>
      </div>
      <div className="pl-4 flex flex-col gap-2 w-full min-w-52">
        <div className="chip text-[11px] w-10">{CATEGORIES[post.category]}</div>
        <p className="truncate text-sm">{post.description}</p>
      </div>
      <div className="ml-auto min-w-10">
        <ChevronRightIcon className="size-5" />
      </div>
    </Link>
  );
}
