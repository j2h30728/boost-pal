import { ServerResponse } from "@/lib/types";
import { useCallback, useEffect, useRef, useState } from "react";

type FetchMoreItems<T> = (
  cursorId: number | null,
  option?: any
) => Promise<
  ServerResponse<{
    items: T[];
    nextCursorId: number | null;
    isLastPage: boolean;
  }>
>;

interface UseInfiniteScrollOptions<T> {
  initialItems: T[];
  fetchMoreItems: FetchMoreItems<T>;
  fetchOption?: Record<string, any>;
  initialCursorId?: number | null;
}

function useInfiniteScroll<T>({
  initialItems,
  fetchMoreItems,
  fetchOption,
  initialCursorId = null,
}: UseInfiniteScrollOptions<T>) {
  const [items, setItems] = useState<T[]>(initialItems);
  const [cursorId, setCursorId] = useState<number | null>(initialCursorId);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  const loadMoreItems = useCallback(async () => {
    if (isLoading || isLastPage) return;
    setIsLoading(true);
    try {
      const { data, isSuccess } = await fetchMoreItems(cursorId, fetchOption);
      if (isSuccess) {
        setItems((prev) => [...prev, ...data?.items]);
        setCursorId(data?.nextCursorId);
        setIsLastPage(data?.isLastPage);
      }
    } catch (error) {
      console.error("Error fetching more items:", error);
    } finally {
      setIsLoading(false);
    }
  }, [cursorId, fetchMoreItems, isLastPage, isLoading, fetchOption]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        const element = entries[0];
        if (element.isIntersecting) {
          loadMoreItems();
        }
      },
      {
        threshold: 1.0,
      }
    );

    const currentTrigger = triggerRef.current;
    if (currentTrigger && !isLastPage) {
      observer.observe(currentTrigger);
    }

    return () => {
      if (currentTrigger) {
        observer.unobserve(currentTrigger);
      }
    };
  }, [isLastPage, loadMoreItems]);

  return { items, isLoading, isLastPage, triggerRef };
}

export default useInfiniteScroll;
