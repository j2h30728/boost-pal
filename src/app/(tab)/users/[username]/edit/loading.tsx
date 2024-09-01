import InputSkeletonUI from "@/components/skeleton-ui/input-skeleton";

export default function UploadLoading() {
  return (
    <div className="flex flex-col pb-40 gap-4">
      <div className="flex flex-col items-center">
        <div className="skeleton size-20 rounded-full"></div>
        <div className="flex -mt-3">
          <div id="button-modify-image" className="skeleton rounded-3xl w-20 h-10"></div>
          <div id="button-delete-image" className="skeleton rounded-3xl w-20 h-10"></div>
        </div>
      </div>
      <InputSkeletonUI />
      <InputSkeletonUI />
      <InputSkeletonUI />
      <InputSkeletonUI />
      <InputSkeletonUI />
      <div className="skeleton rounded-[13px] py-3 w-full h-11"></div>
    </div>
  );
}
