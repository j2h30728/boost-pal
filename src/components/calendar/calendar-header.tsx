"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import useCalendarContext from "./useCalendarContext";

const CalendarHeader = () => {
  const {
    calendar: { dispatch, currentDate },
  } = useCalendarContext();

  return (
    <div className="flex justify-around">
      <div className="flex justify-evenly gap-5 text-xl leading-6">
        <button onClick={dispatch.handlePrevYear}>
          <ChevronLeftIcon className="size-5 text-primary" />
        </button>
        <span>{currentDate.year}</span>
        <button onClick={dispatch.handleNextYear}>
          <ChevronRightIcon className="size-5 text-primary" />
        </button>
      </div>
      <div className="flex justify-evenly gap-5 text-xl leading-6">
        <button onClick={dispatch.handlePrevMonth}>
          <ChevronLeftIcon className="size-5 text-primary" />
        </button>
        <span>{currentDate.month.padStart(2, "0")}</span>
        <button onClick={dispatch.handleNextMonth}>
          <ChevronRightIcon className="size-5 text-primary" />
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
