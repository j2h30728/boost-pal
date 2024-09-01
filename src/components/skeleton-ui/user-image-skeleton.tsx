export default function UserImageSkeletonUI() {
  return (
    <div className="flex items-center gap-5 ">
      <div className="skeleton size-12 aspect-square rounded-full"></div>
      <div className="skeleton w-20 h-5"></div>
    </div>
  );
}
