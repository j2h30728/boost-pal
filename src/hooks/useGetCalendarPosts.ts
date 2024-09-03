import { getWrittenPostByYearnAndMonth } from "@/app/(tab)/calendar/actions";
import { GroupPostsByDateType } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function useGetCalendarPosts(year: number, month: number) {
  const [calendarPosts, setCalendarPosts] = useState<GroupPostsByDateType>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchingPostsByCalendar = async () => {
      try {
        setIsLoading(true);
        const posts = await getWrittenPostByYearnAndMonth(Number(year), Number(month));
        setCalendarPosts(posts);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchingPostsByCalendar();
  }, [year, month]);

  return { calendarPosts, isLoading };
}
