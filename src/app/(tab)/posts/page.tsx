import InfinitePostList from "@/components/post/infinite-post-list";
import { getInitialPosts } from "@/service/postService";

export default async function PostListPage() {
  const { data: initialPosts, error } = await getInitialPosts();

  if (error) {
    throw error;
  }
  return (
    <div className="pb-10">
      <h3 className="font-extrabold text-xl pb-2">최근 다미가 응원한 인증</h3>
      <InfinitePostList initialPosts={initialPosts?.items} initialCursorId={initialPosts?.nextCursorId} />
    </div>
  );
}
