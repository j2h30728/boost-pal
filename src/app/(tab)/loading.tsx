import PostListSkeletonUI from "@/components/skeleton-ui/post-list-skeleton";

export default async function HomeLoading() {
  return (
    <main className="flex flex-col gap-4 ">
      <div className="w-full h-80"></div>
      <div className="flex gap-2 pl-5 overflow-y-scroll">
        {Array.from({ length: 5 }).map((_, i) => (
          <div className="skeleton rounded-2xl w-14 h-9" key={i}></div>
        ))}
      </div>
      <div className="px-5 flex flex-col gap-2 ">
        <p className="skeleton w-40 h-4 rounded-xl"></p>
        <div className="flex w-full flex-col gap-2">
          <h3 className="skeleton text-xl w-56 h-5 pb-2"></h3>
          <PostListSkeletonUI />
        </div>
      </div>
    </main>
  );
}
