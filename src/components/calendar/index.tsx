"use client";

import { ReactNode } from "react";

import { CalendarContext } from "./useCalendarContext";
import CalendarHeader from "./calendar-header";
import CalendarBody from "./calendar-body";
import SelectedDate from "./seleted-date";
import useCalendar from "@/hooks/useCalendar";
import CalendarContents from "./calendar-contents";
import useGetCalendarPosts from "@/hooks/useGetCalendarPosts";

const Calendar = ({ children }: { children: ReactNode }) => {
  const calendar = useCalendar();
  const { year, month } = calendar.currentDate;
  const { calendarPosts, isLoading } = useGetCalendarPosts(Number(year), Number(month));

  return (
    <CalendarContext.Provider value={{ calendar, posts: { data: calendarPosts, isLoading } }}>
      <div className="flex flex-col gap-2 w-full">{children}</div>
    </CalendarContext.Provider>
  );
};

Calendar.Header = CalendarHeader;
Calendar.Body = CalendarBody;
Calendar.Footer = SelectedDate;
Calendar.Contents = CalendarContents;

export default Calendar;
