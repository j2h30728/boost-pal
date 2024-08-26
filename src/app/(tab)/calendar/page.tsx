import PostCalendar from "@/components/calendar/post-calendar";
import StatusCard from "@/components/post/status-card";

export default function CalendarPage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <StatusCard />
      <PostCalendar />
    </div>
  );
}
