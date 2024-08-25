import { useEffect, useRef, useState } from "react";

interface UseInfiniteScrollOptions<T> {
  initialItems: T[];
  fetchMoreItems: (
    cursorId: number | null
  ) => Promise<{ items: T[]; nextCursorId: number | null; isLastPage: boolean }>;
  initialCursorId?: number | null;
}

function useInfiniteScroll<T>({ initialItems, fetchMoreItems, initialCursorId = null }: UseInfiniteScrollOptions<T>) {
  const [items, setItems] = useState<T[]>(initialItems);
  const [cursorId, setCursorId] = useState<number | null>(initialCursorId);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries, observer) => {
        const element = entries[0];
        if (element.isIntersecting && triggerRef.current && !isLoading && !isLastPage) {
          observer.unobserve(triggerRef.current);
          setIsLoading(true);

          try {
            const { items: newItems, nextCursorId, isLastPage: newIsLastPage } = await fetchMoreItems(cursorId);

            setItems((prev) => [...prev, ...newItems]);
            setCursorId(nextCursorId);
            setIsLastPage(newIsLastPage);

            if (nextCursorId && !newIsLastPage && triggerRef.current) {
              observer.observe(triggerRef.current);
            }
          } catch (error) {
            console.error("Error fetching more items:", error);
          } finally {
            setIsLoading(false);
          }
        }
      },
      {
        threshold: 1.0,
      }
    );

    if (triggerRef.current && !isLastPage && !isLoading) {
      observer.observe(triggerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [cursorId, isLastPage]);

  return { items, isLoading, isLastPage, triggerRef };
}

export default useInfiniteScroll;
