import { ROUTE_PATHS } from "@/constants/routePath";

export const formatToTimeAgo = (date: string): string => {
  const dayInMs = 1000 * 60 * 60 * 24;
  const time = new Date(date).getTime();
  const now = new Date().getTime();
  const diff = Math.round((time - now) / dayInMs);

  const formatter = new Intl.RelativeTimeFormat("ko");

  return formatter.format(diff, "days");
};

export const formatToWon = (price: number): string => {
  return price.toLocaleString("ko-KR");
};

export const isCurrentPath = (pathname: string, comparePath: string) => {
  if (comparePath === ROUTE_PATHS.HOME) {
    return pathname === ROUTE_PATHS.HOME;
  }
  return pathname.includes(comparePath);
};
