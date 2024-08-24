import PostList from "@/components/post/post-list";

export default function PostListPage() {
  return (
    <div className="px-5">
      <h3 className="font-extrabold text-md pb-2">최근 다미가 응원한 인증</h3>
      <PostList />
    </div>
  );
}
