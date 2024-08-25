"use server";

import { LIMIT_NUMBER } from "@/constants/posts";
import db from "@/lib/server/db";
import { Prisma } from "@prisma/client";

export async function getPaginatedPosts(cursorId: number | null) {
  const posts = await db.post.findMany({
    include: {
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
      user: true,
      aiComments: {
        include: {
          aiBot: true,
        },
      },
    },
    skip: cursorId ? 1 : 0,
    take: LIMIT_NUMBER + 1,
    cursor: cursorId ? { id: cursorId } : undefined,
    orderBy: {
      created_at: "desc",
    },
  });
  const hasMore = posts.length > LIMIT_NUMBER;
  if (hasMore) {
    posts.pop();
  }
  const isLastPage = !hasMore;
  const nextCursorId = posts.at(-1)?.id ?? null;
  return { items: posts, isLastPage, nextCursorId };
}

export type PaginatedPosts = Prisma.PromiseReturnType<typeof getPaginatedPosts>;
