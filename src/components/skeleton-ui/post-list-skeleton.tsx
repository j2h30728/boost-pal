import ListPostSkeletonUI from "./list-post-skeleton";

export default function PostListSkeletonUI() {
  return (
    <div className="flex flex-col gap-4 w-full">
      {Array.from({ length: 5 }).map((_, i) => (
        <ListPostSkeletonUI key={i} />
      ))}
    </div>
  );
}
