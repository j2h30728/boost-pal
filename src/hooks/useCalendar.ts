import {
  addMonths,
  addYears,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  startOfMonth,
  startOfWeek,
  subMonths,
  subYears,
} from "date-fns";
import { useState } from "react";

const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentYear, currentMonth, currentDay] = format(currentDate, "yyyy-MM-d").split("-");
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), "yyyy-MM-d"));

  const startCurrentMonth = startOfMonth(currentDate);
  const endCurrentMonth = endOfMonth(currentDate);
  const startOfFirstWeek = startOfWeek(startCurrentMonth, { weekStartsOn: 0 });
  const endOfLastWeek = endOfWeek(endCurrentMonth, { weekStartsOn: 0 });

  const days = eachDayOfInterval({
    start: startOfFirstWeek,
    end: endOfLastWeek,
  });
  const handlePrevYear = () => {
    setCurrentDate((prevDate) => subYears(prevDate, 1));
  };

  const handleNextYear = () => {
    setCurrentDate((prevDate) => addYears(prevDate, 1));
  };
  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => subMonths(prevDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => addMonths(prevDate, 1));
  };

  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
  };
  const daysInMonth = days.map((day) => ({
    date: format(day, "yyyy-MM-d"),
    year: format(day, "yyyy"),
    month: format(day, "MM"),
    day: format(day, "d"),
    dayIndexOfWeek: getDay(day),
  }));

  return {
    currentDate: {
      year: currentYear,
      month: currentMonth,
      day: currentDay,
    },
    daysInMonth,
    dispatch: {
      handlePrevYear,
      handleNextYear,
      handlePrevMonth,
      handleNextMonth,
    },
    selectedDate: {
      date: selectedDate,
      selectDate: handleSelectDate,
    },
  };
};
export default useCalendar;
