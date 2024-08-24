"use client";

import Calendar from "@/components/calendar";
import StatusCard from "@/components/post/status-card";

export default function CalendarPage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <StatusCard />
      <Calendar>
        <div className="shadow-xl rounded-xl p-4">
          <Calendar.Header />
          <Calendar.Body />
          <Calendar.Footer />
        </div>
        <Calendar.Contents />
      </Calendar>
    </div>
  );
}
