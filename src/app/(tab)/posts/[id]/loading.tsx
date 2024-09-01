import UserImageSkeletonUI from "@/components/skeleton-ui/user-image-skeleton";

export default function PostDetailLoading() {
  return (
    <div className="w-full">
      <div className="p-5 flex items-center gap-3">
        <UserImageSkeletonUI />
        <div className="skeleton w-10 h-4"></div>
      </div>
      <div id="image" className="relative w-4/5 aspect-square max-h-96 mx-auto skeleton"></div>
      <div id="description" className="p-5 flex flex-col gap-6 ">
        <div className="flex flex-col gap-2 *:skeleton">
          <div className="w-full h-6"></div>
          <div className="w-3/4 h-6"></div>
        </div>
        <div id="icons" className="flex gap-5 items-start justify-between *:skeleton">
          <div className="w-24 h-6"></div>
          <div className="w-14 h-6"></div>
        </div>
        <div id="ai-comment" className="flex justify-between gap-5">
          <div className="*:skeleton w-full flex flex-col gap-2 ">
            <div className="w-full h-5"></div>
            <div className="w-4/5 h-5"></div>
          </div>
          <div className="flex flex-col items-center min-w-10 gap-2 ">
            <div className="skeleton size-12 aspect-square rounded-full"></div>
            <div className="skeleton w-full h-4"> </div>
          </div>
        </div>
        <div id="comments">
          <div id="comment-form" className="*:skeleton flex w-full gap-2 comment-form ">
            <div className=" flex w-full h-11 pl-2"></div>
            <div className="w-full h-11 max-w-16"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
