import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

import PostList from "@/components/post/post-list";
import getMostPopularCategoryPosts, { getInitialPosts } from "@/service/postService";
import InfinitePostList from "@/components/post/infinite-post-list";
import { getMostPopularCategory } from "@/service/categoryService";
import { CATEGORIES } from "@/constants/cateogries";

export default async function Home() {
  const mostPopularCategoryPosts = await getMostPopularCategoryPosts();
  const category = await getMostPopularCategory();
  const { items: initialInfinitePosts, cursorId: initialInfiniteCursorId } = await getInitialPosts();
  return (
    <main className="flex flex-col gap-4">
      <div className="w-full h-96 bg-underline"></div>
      <div className="flex gap-2 pl-5 overflow-y-scroll">
        {/* #TODO 카테고리당 post list 페이지 생성 후 수정 필요 */}
        {["전체", ...Object.values(CATEGORIES)].map((category) => (
          <div className="bg-primary text-white px-4 py-2 min-w-fit rounded-2xl text-md font-bold" key={category}>
            {category}
          </div>
        ))}
      </div>
      <div className="px-5 flex flex-col gap-5 ">
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-xs pl-2">제일 인증수가 많은 주제에 함께 하세요!</p>
          <div className="flex justify-between px-2">
            <h3 className="font-extrabold text-md pb-2">최근 다미가 응원한 {CATEGORIES[category]} 인증</h3>
            {/* #TODO 카테고리당 post list 페이지 생성 후 수정 필요 */}
            <Link href={`/posts`} className="text-base flex items-center text-xs">
              <span>더보기</span> <ChevronRightIcon className="w-4 h-3" />
            </Link>
          </div>
          <PostList initialPosts={mostPopularCategoryPosts} />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between px-2">
            <h3 className="font-extrabold text-md">최근 다미가 응원한 인증</h3>
            <Link href={"/posts/exercise"} className="text-base flex items-center text-xs">
              <span>더보기</span> <ChevronRightIcon className="w-4 h-3" />
            </Link>
          </div>
          <InfinitePostList initialPosts={initialInfinitePosts} initialCursorId={initialInfiniteCursorId} />
        </div>
      </div>
    </main>
  );
}
