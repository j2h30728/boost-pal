import { isCategory } from "@/lib/utils";
import { ROUTE_PATHS } from "./routePath";

export const CATEGORIES = {
  ALL: "전체",
  EXERCISE: "운동",
  STUDY: "공부",
  DIET: "식단",
  WAKE_UP: "기상",
  READING: "독서",
  OTHER: "기타",
} as const;

export const makeCategoryPath = (category: string) => {
  if (!isCategory(category)) {
    return ROUTE_PATHS.POSTS;
  }
  return [ROUTE_PATHS.POSTS, "category", category.toLowerCase()].join("/");
};
