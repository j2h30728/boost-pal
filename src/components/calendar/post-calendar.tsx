"use client";

import Calendar from ".";

export default function PostCalendar() {
  return (
    <Calendar>
      <div className="shadow-xl rounded-xl p-4">
        <Calendar.Header />
        <Calendar.Body />
        <Calendar.Footer />
      </div>
      <Calendar.Contents />
    </Calendar>
  );
}
