import Link from "next/link";
import Image from "next/image";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

import { getMostPopularCategoryPosts, getInitialPosts } from "@/service/postService";
import InfinitePostList from "@/components/post/infinite-post-list";
import { getMostPopularCategory } from "@/service/categoryService";
import { CATEGORIES, makeCategoryPath } from "@/constants/categories";
import TabBar from "@/components/common/tab-bar";
import { getUserInfoBySession } from "@/service/userService";

import mainImage from "../../public/images/main-image.webp";
import { throwErrors } from "@/lib/error/throwErrors";
import { isSuccessResponse } from "@/lib/error/withErrorHandling";
import MostPoPularPostList from "@/components/post/most-popular-post-list";

export const dynamic = "force-dynamic";

export default async function Home() {
  const mostPopularCategoryPostsResponse = await getMostPopularCategoryPosts();
  const categoryResponse = await getMostPopularCategory();
  const initialPostsResponse = await getInitialPosts();
  const userResponse = await getUserInfoBySession();

  if (!isSuccessResponse(initialPostsResponse) || !isSuccessResponse(userResponse)) {
    throwErrors(mostPopularCategoryPostsResponse.error, initialPostsResponse.error, userResponse.error);
    return;
  }

  return (
    <main className="flex flex-col gap-4 ">
      <div className="relative ">
        <h2 className="absolute left-5 bottom-10 text-xl font-bold">
          <span className="text-primary">응원</span>과 함께 오늘을 <span className="text-primary">기록</span>해보아요!
        </h2>
        <div className="w-full h-80 relative -z-10">
          <Image
            priority
            className="right-0 absolute w-auto"
            width={350}
            height={400}
            src={mainImage}
            alt="main-image"
          />
        </div>
      </div>
      <div className="flex gap-2 pl-5 overflow-y-scroll">
        {Object.entries(CATEGORIES).map(([key, category]) => (
          <Link
            href={makeCategoryPath(key)}
            className="bg-primary text-white px-4 py-2 min-w-fit rounded-2xl text-md font-bold"
            key={category}>
            {category}
          </Link>
        ))}
      </div>
      <div className="px-5 flex flex-col gap-5 ">
        {categoryResponse.isSuccess && mostPopularCategoryPostsResponse.isSuccess && (
          <MostPoPularPostList listOfPost={mostPopularCategoryPostsResponse.data} category={categoryResponse.data} />
        )}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between px-2">
            <h3 className="font-extrabold text-md">최근 다미가 응원한 인증</h3>
            <Link href={"/posts"} className="text-base flex items-center text-xs">
              <span>더보기</span> <ChevronRightIcon className="w-4 h-3" />
            </Link>
          </div>
          <InfinitePostList
            initialPosts={initialPostsResponse.data.items}
            initialCursorId={initialPostsResponse.data.nextCursorId}
          />
        </div>
      </div>
      <TabBar username={userResponse.data.username} />
    </main>
  );
}
