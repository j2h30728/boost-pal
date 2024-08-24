"use client";

import useCalendarContext from "./useCalendarContext";

const CalendarBody = () => {
  const weeks = ["일", "월", "화", "수", "목", "금", "토"];
  const { daysInMonth, selectedDate, currentDate } = useCalendarContext();
  const today = new Date();
  const isToday = (year: number, month: number, date: number) =>
    today.getFullYear() === year && today.getDate() === date && today.getMonth() + 1 === month;

  return (
    <div className="flex flex-col gap-4 bg-white p-1 rounded-2xl min-w-72">
      <div className="grid grid-cols-7 gap-4">
        {weeks.map((week, index) => (
          <div className={`flex justify-center size-10 text-gray-700"`} key={week}>
            {week}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-4">
        {daysInMonth.map((date) => (
          <div
            onClick={() => selectedDate.selectDate(date.date)}
            key={date.date}
            className={`flex flex-col justify-center items-center cursor-pointer size-10
              ${currentDate.month !== date.month ? "invisible" : "visible"}
              ${
                isToday(+date.year, +date.month, +date.day)
                  ? "min-w-8 min-h-8 bg-secondary bg-opacity-30 rounded-full"
                  : ""
              }
              ${selectedDate.date === date.date ? "min-w-8 min-h-8 bg-primary bg-opacity-30 rounded-full" : ""}
              `}>
            {date.day}
            {isToday(+date.year, +date.month, +date.day) && <small className="text-base text-xs">오늘</small>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarBody;
