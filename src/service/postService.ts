"use server";

import { endOfMonth, startOfMonth } from "date-fns";
import { Category, Prisma } from "@prisma/client";

import db from "@/lib/server/db";
import { getSession } from "@/lib/server/session";
import { LIMIT_NUMBER } from "@/constants/posts";
import { getMostPopularCategory } from "./categoryService";

export async function getInitialPosts(category?: Category) {
  const posts = await db.post.findMany({
    where: {
      category,
    },
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
    take: LIMIT_NUMBER,
    orderBy: {
      created_at: "desc",
    },
  });
  const cursorId = posts.at(-1)?.id || null;
  return { items: posts, cursorId };
}
export type InitialPosts = Prisma.PromiseReturnType<typeof getInitialPosts>;

export async function getPaginatedPosts(cursorId: number | null, option?: { category: Category }) {
  const posts = await db.post.findMany({
    where: {
      category: option?.category,
    },
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

export async function getPostsByCategory(category: Category) {
  const posts = await db.post.findMany({
    where: {
      category,
    },
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
    take: 2,
    orderBy: {
      created_at: "desc",
    },
  });
  return posts;
}

export default async function getMostPopularCategoryPosts() {
  const mostPopularCategory = await getMostPopularCategory();

  if (!mostPopularCategory) {
    throw new Error("어떤 카테고리에도 인증이 존재하지 않습니다.");
  }
  const posts = await getPostsByCategory(mostPopularCategory);

  return posts;
}

export async function getPostsByLoggedInUser() {
  const session = await getSession();
  const posts = await db.post.findMany({
    where: {
      userId: session.id,
    },
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
    orderBy: {
      created_at: "desc",
    },
  });
  return posts;
}

export async function getPostCountForThisMonth() {
  const date = new Date();
  const startDateOfMonth = startOfMonth(date);
  const endDateOfMonth = endOfMonth(date);
  const session = await getSession();

  const postCount = await db.post.count({
    where: {
      userId: session.id!,
      created_at: {
        gte: startDateOfMonth,
        lt: endDateOfMonth,
      },
    },
  });
  return postCount;
}

export async function getPostCountByLoggedInUser() {
  const session = await getSession();

  const postCount = await db.post.count({
    where: {
      userId: session.id,
    },
  });

  return postCount;
}

export async function getPostById(id: number) {
  return db.post.findUnique({ where: { id } });
}

export async function getPostWithUpdateView(id: number) {
  const post = await db.post.update({
    where: {
      id,
    },
    data: {
      views: {
        increment: 1,
      },
    },
    include: {
      _count: {
        select: {
          comments: true,
        },
      },
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
  return post;
}
