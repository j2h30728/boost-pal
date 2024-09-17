import { GroupPostsByDateType } from "@/lib/utils";
import { getWrittenPostByYearnAndMonth } from "@/service/postService";
import { useEffect, useState } from "react";

export default function useGetCalendarPosts(year: number, month: number) {
  const [calendarPosts, setCalendarPosts] = useState<GroupPostsByDateType>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchingPostsByCalendar = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data: posts, isSuccess, error: responseError } = await getWrittenPostByYearnAndMonth(year, month);
        if (isSuccess) {
          setCalendarPosts(posts);
        }
        if (responseError) {
          throw responseError;
        }
      } catch (catchError) {
        console.error("Error in useGetCalendarPosts:", catchError);
        setError(catchError instanceof Error ? catchError : new Error("An unexpected error occurred"));
      } finally {
        setIsLoading(false);
      }
    };
    fetchingPostsByCalendar();
  }, [year, month]);

  if (error) {
    throw error;
  }

  return { calendarPosts, isLoading };
}
