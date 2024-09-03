"use client";

import { ReactNode, useEffect, useState } from "react";
import { CalendarContext } from "./useCalendarContext";
import CalendarHeader from "./calendar-header";
import CalendarBody from "./calendar-body";
import SelectedDate from "./seleted-date";
import useCalendar from "@/hooks/useCalendar";
import CalendarContents from "./calendar-contents";
import { getWrittenPostByYearnAndMonth } from "@/app/(tab)/calendar/actions";
import { GroupPostsByDateType } from "@/lib/utils";

const Calendar = ({ children }: { children: ReactNode }) => {
  const calendar = useCalendar();
  const { year, month } = calendar.currentDate;
  const [calendarPosts, setCalendarPosts] = useState<GroupPostsByDateType>([]);
  useEffect(() => {
    const fetchingPostsByCalendar = async () => {
      const posts = await getWrittenPostByYearnAndMonth(Number(year), Number(month));
      setCalendarPosts(posts);
    };
    fetchingPostsByCalendar();
  }, [year, month]);

  return (
    <CalendarContext.Provider value={{ calendar, posts: calendarPosts }}>
      <div className="flex flex-col gap-2 w-full">{children}</div>
    </CalendarContext.Provider>
  );
};

Calendar.Header = CalendarHeader;
Calendar.Body = CalendarBody;
Calendar.Footer = SelectedDate;
Calendar.Contents = CalendarContents;

export default Calendar;
