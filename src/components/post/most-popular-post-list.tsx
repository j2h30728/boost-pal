import { CATEGORIES, makeCategoryPath } from "@/constants/categories";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Category } from "@prisma/client";
import { ListOfPost } from "@/lib/types";
import PostList from "./post-list";

export default function MostPoPularPostList({
  listOfPost,
  category,
}: {
  listOfPost: ListOfPost[];
  category: Category;
}) {
  if (!category) {
    return <div>인증수가 많은 주제가 존재하지 않습니다.</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="font-semibold text-xs pl-2 w-fit p-1 rounded-xl bg-white">제일 인증수가 많은 주제에 함께 하세요!</p>
      <div className="flex justify-between pr-2 *:bg-white *:rounded-xl">
        <h3 className="font-extrabold text-md mb-2 px-2">최근 다미가 응원한 {CATEGORIES[category]} 인증</h3>
        <Link href={makeCategoryPath(category)} className="text-base flex items-center text-xs px-2">
          <span>더보기</span> <ChevronRightIcon className="w-4 h-3" />
        </Link>
      </div>
      <PostList initialPosts={listOfPost} />
    </div>
  );
}
