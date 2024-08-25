"use client";

import { InitialPosts } from "@/service/postService";
import ListPost from "./list-post";
import { getPaginatedPosts } from "@/app/(tab)/posts/actions";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

export default function InfinitePostList({
  initialPosts,
  initialCursorId,
}: {
  initialPosts: InitialPosts;
  initialCursorId: number | null;
}) {
  const {
    items: posts,
    isLoading,
    triggerRef,
  } = useInfiniteScroll({ initialItems: initialPosts, fetchMoreItems: getPaginatedPosts, initialCursorId });
  return (
    <div className="flex flex-col gap-4">
      {posts.map((post, i) => (
        <ListPost key={post.id} {...post} />
      ))}
      <div ref={triggerRef}>{isLoading ? "로딩 중" : null}</div>
    </div>
  );
}
