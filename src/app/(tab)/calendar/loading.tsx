import StatusCardSkeletonUI from "@/components/skeleton-ui/status-card-skeleton";

export default async function CalendarLoading() {
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <div className="flex justify-around w-full">
        <StatusCardSkeletonUI />
        <StatusCardSkeletonUI />
      </div>
      <div className="skeleton rounded-xl w-full h-[400px]"></div>
    </div>
  );
}
