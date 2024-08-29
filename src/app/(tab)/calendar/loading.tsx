import StatusCardSkeletonUI from "@/components/skeleton-ui/status-card-skeleton";

export default async function CalendarLoading() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-around w-full">
        <StatusCardSkeletonUI />
        <StatusCardSkeletonUI />
      </div>
      <div className="shadow-xl rounded-xl p-4"></div>
    </div>
  );
}
