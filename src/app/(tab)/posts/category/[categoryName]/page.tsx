import { notFound } from "next/navigation";

import { getInitialPosts } from "@/service/postService";

import { CATEGORIES } from "@/constants/categories";
import { isCategory } from "@/lib/utils";
import InfinitePostList from "@/components/post/infinite-post-list";

export default async function PostListByCategoryPage({ params }: { params: { categoryName: string } }) {
  const { categoryName } = params;
  const upperCaseCategoryName = categoryName.toUpperCase();

  if (!isCategory(upperCaseCategoryName)) {
    notFound();
  }
  const { data: initialPosts, error } = await getInitialPosts(upperCaseCategoryName);

  if (error) {
    throw error;
  }

  return (
    <div className="pb-10">
      <h3 className="font-extrabold text-xl pb-2">최근 다미가 응원한 {CATEGORIES[upperCaseCategoryName]} 인증</h3>
      <InfinitePostList
        initialPosts={initialPosts?.items}
        initialCursorId={initialPosts?.nextCursorId}
        category={upperCaseCategoryName}
      />
    </div>
  );
}
