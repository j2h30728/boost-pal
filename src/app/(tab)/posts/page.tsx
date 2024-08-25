import InfinitePostList from "@/components/post/infinite-post-list";
import { getInitialPosts } from "@/service/postService";

export default async function PostListPage() {
  const { items: posts, cursorId } = await getInitialPosts();
  return (
    <div className="pb-10">
      <h3 className="font-extrabold text-md pb-2">최근 다미가 응원한 인증</h3>
      <InfinitePostList initialPosts={posts} initialCursorId={cursorId} />
    </div>
  );
}
