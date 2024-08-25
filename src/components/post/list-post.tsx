import Link from "next/link";

import { PaginatedPosts } from "@/app/(tab)/posts/actions";
import { CATEGORIES } from "@/constants/cateogries";
import { formatToTimeAgo } from "@/lib/client/utils";
import UserDefaultImage from "../user/user-default-image";

type PostProps = PaginatedPosts["items"][number];

export default function ListPost({ id, description, created_at, category, user, aiComments }: PostProps) {
  return (
    <Link
      href={`/posts/${id}`}
      className="text-neutral flex flex-col items-center px-5 py-4 shadow-custom rounded-2xl *:w-full gap-3">
      <div className="flex justify-between">
        <span>{formatToTimeAgo(created_at.toString())}</span>
        <div className="chip w-10 h-4 text-xs">{CATEGORIES[category]}</div>
      </div>
      <div className="flex flex-col gap-3 items-center *:w-full">
        <div className="flex gap-3 justify-between items-center">
          <p className="multiline-ellipsis text-sm">{description}</p>
          <UserDefaultImage avatar={user.avatar} username={user.username} width={44} height={44} />
        </div>
        <div className="flex gap-3 justify-between items-center">
          <UserDefaultImage
            avatar={aiComments[0]?.aiBot.avatar ?? null}
            username={user.username}
            width={44}
            height={44}
          />
          <p className="multiline-ellipsis  text-sm text-[#9C8663]">{aiComments[0]?.text}</p>
        </div>
      </div>
    </Link>
  );
}
