import Link from "next/link";

import { CATEGORIES } from "@/constants/categories";
import { formatToTimeAgo } from "@/lib/client/utils";
import UserDefaultImage from "../common/user-default-image";
import { ListOfPost } from "@/service/postService";

export default function ListPost({ id, description, created_at, category, user, aiComments }: ListOfPost) {
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
          <UserDefaultImage
            style="min-w-[60px] border border-underline"
            avatar={user.avatar}
            username={user.username}
            width={60}
            height={60}
          />
        </div>
        <div className="flex gap-3 justify-between items-center">
          <UserDefaultImage
            style="min-w-[60px] border border-underline"
            avatar={aiComments[0]?.aiBot.avatar ?? null}
            username={user.username}
            width={60}
            height={60}
          />
          <p className=" multiline-ellipsis text-sm text-[#9C8663]">{aiComments[0]?.text}</p>
        </div>
      </div>
    </Link>
  );
}
