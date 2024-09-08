import PostListSkeletonUI from "@/components/skeleton-ui/post-list-skeleton";

export default async function PostListLoading() {
  return (
    <main className="flex flex-col gap-4 ">
      <h3 className="skeleton text-xl w-56 h-4 pb-4"></h3>
      <PostListSkeletonUI />
    </main>
  );
}
