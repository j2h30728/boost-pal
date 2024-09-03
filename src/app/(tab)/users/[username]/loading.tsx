import PostListSkeletonUI from "@/components/skeleton-ui/post-list-skeleton";
import StatusCardSkeletonUI from "@/components/skeleton-ui/status-card-skeleton";

export default async function ProfileLoading() {
  return (
    <main className="flex flex-col gap-1">
      <div className="flex flex-col">
        <div className="p-5 flex items-center gap-5">
          <div className="size-[65px] skeleton rounded-full "></div>
          <div className="w-20 h-5 skeleton"></div>
        </div>
        <div className="*:skeleton w-full">
          <div className="px-8 w-full"></div>
          <div className="px-8 w-3/5"></div>
        </div>
      </div>
      <div className="flex justify-around w-full">
        <StatusCardSkeletonUI />
        <StatusCardSkeletonUI />
      </div>
      <div className="p-5 flex flex-col gap-5">
        <PostListSkeletonUI />
      </div>
    </main>
  );
}
