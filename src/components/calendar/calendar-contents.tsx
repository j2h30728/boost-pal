import useCalendarContext from "./useCalendarContext";
import CalendarContent from "../post/calendar-content";

export default function CalendarContents() {
  const {
    posts,
    calendar: { selectedDate, currentDate },
  } = useCalendarContext();

  const [year, month, date] = selectedDate.date.split("-");

  if (posts.length === 0) {
    return (
      <div className="w-full text-center text-lg font-semibold text-underline mt-10">{`${currentDate.month}달 인증이 존재하지 않습니다.`}</div>
    );
  }
  return (
    <div className="flex flex-col w-full py-3 gap-5">
      {selectedDate.date ? (
        <>
          <div className="text-center text-lg font-semibold">{`${year}년 ${month}월 ${date}일 인증`}</div>
          {posts
            .find((post) => post.date === selectedDate.date)
            ?.posts.map((post) => (
              <CalendarContent key={post.id} post={post} />
            ))}
        </>
      ) : (
        <>
          <div className="text-center text-lg font-semibold">{`${currentDate.month}월 인증`}</div>
          {posts
            .flatMap((post) => post.posts)
            .map((post) => (
              <CalendarContent key={post.id} post={post} />
            ))}
        </>
      )}
    </div>
  );
}
