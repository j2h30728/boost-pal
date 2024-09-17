"use client";

import { getPaginatedPosts } from "@/service/postService";
import { CATEGORIES } from "@/constants/categories";

import ListPost from "./list-post";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { ListOfPost } from "@/lib/types";

export default function InfinitePostList({
  initialPosts,
  initialCursorId,
  category,
}: {
  initialPosts: ListOfPost[];
  initialCursorId: number | null;
  category?: keyof typeof CATEGORIES;
}) {
  const {
    items: posts,
    isLoading,
    triggerRef,
  } = useInfiniteScroll({
    initialItems: initialPosts,
    fetchMoreItems: getPaginatedPosts,
    fetchOption: { category },
    initialCursorId,
  });

  if (posts.length === 0) return <div className="mx-auto py-10 text-xl text-base">인증글이 존재하지 않습니다.</div>;

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post, i) => (
        <ListPost key={post.id} {...post} />
      ))}
      <div ref={triggerRef}>{isLoading ? "로딩 중" : null}</div>
    </div>
  );
}
