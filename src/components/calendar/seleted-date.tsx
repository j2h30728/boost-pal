"use client";

import useCalendarContext from "./useCalendarContext";

const SelectedDate = () => {
  const {
    calendar: { selectedDate },
  } = useCalendarContext();
  return <div>{selectedDate.date}</div>;
};

export default SelectedDate;
