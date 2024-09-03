import { Category, Post } from "@prisma/client";

import { CATEGORIES } from "@/constants/cateogries";
import { format } from "date-fns";

export const isCategory = (category: string): category is Category => {
  return Object.keys(CATEGORIES).includes(category);
};

export type GroupPostsByDateType = ReturnType<typeof groupPostsByDate>;

export const groupPostsByDate = (posts: Post[]) => {
  const groutPostsObject = posts.reduce((acc, post) => {
    const dateKey = format(new Date(post.created_at), "yyyy-M-d");
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(post);
    return acc;
  }, {} as Record<string, Post[]>);
  const groupPosts = Object.entries(groutPostsObject).map(([date, posts]) => ({ date, posts }));
  return groupPosts;
};
