"use server";

import { endOfMonth, startOfMonth } from "date-fns";
import { Category } from "@prisma/client";

import db from "@/lib/server/db";
import { LIMIT_NUMBER } from "@/constants/posts";
import { getMostPopularCategory } from "./categoryService";
import { NotFoundError, ValidationError } from "@/lib/error/customError";
import { getSessionId } from "./userService";
import { groupPostsByDate } from "@/lib/utils";
import { withErrorHandling } from "@/lib/error/withErrorHandling";
import { createSuccessResponse } from "@/lib/server/createServerResponse";

export const getInitialPosts = withErrorHandling(async (category?: Category) => {
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
  if (!posts) {
    throw new NotFoundError();
  }
  const nextCursorId = posts.at(-1)?.id || null;
  return createSuccessResponse({ data: { items: posts, nextCursorId, isLastPage: nextCursorId === null } });
});

export const getPaginatedPosts = withErrorHandling(async (cursorId: number | null, option?: { category: Category }) => {
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
  return createSuccessResponse({ data: { items: posts, nextCursorId, isLastPage } });
});

export const getPostsByCategory = withErrorHandling(async (category: Category) => {
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
  return createSuccessResponse({ data: posts });
});

export const getMostPopularCategoryPosts = withErrorHandling(async () => {
  const { data: category, isSuccess: categorySuccess, error: categoryError } = await getMostPopularCategory();
  if (!categorySuccess) {
    throw categoryError;
  }

  if (!category) {
    return createSuccessResponse({ data: [], message: "인기있는 인증 주제가 존재하지않습니다." });
  }
  const { data: posts, isSuccess: postsSuccess, error: postsError } = await getPostsByCategory(category);
  if (!postsSuccess) {
    throw postsError;
  }
  if (!posts || posts.length === 0) {
    return createSuccessResponse({ data: [], message: "인기있는 인증 주제의 기록이 존재하지 않습니다." });
  }

  return createSuccessResponse({ data: posts });
});

export const getPostsByLoggedInUser = withErrorHandling(async () => {
  const sessionId = await getSessionId();
  const posts = await db.post.findMany({
    where: {
      userId: sessionId,
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
  return createSuccessResponse({ data: posts });
});

export const getPostsCountForThisMonth = withErrorHandling(async () => {
  const date = new Date();
  const startDateOfMonth = startOfMonth(date);
  const endDateOfMonth = endOfMonth(date);

  const sessionId = await getSessionId();
  const postCount = await db.post.count({
    where: {
      userId: sessionId,
      created_at: {
        gte: startDateOfMonth,
        lt: endDateOfMonth,
      },
    },
  });
  return createSuccessResponse({ data: postCount });
});

export const getPostCountByLoggedInUser = withErrorHandling(async () => {
  const sessionId = await getSessionId();
  const postCount = await db.post.count({
    where: {
      userId: sessionId,
    },
  });
  return createSuccessResponse({ data: postCount });
});

export const getPostById = withErrorHandling(async (id: number) => {
  const post = await db.post.findUnique({ where: { id } });
  if (!post) {
    throw new NotFoundError();
  }
  return createSuccessResponse({ data: post });
});

export const getPostWithUpdateView = withErrorHandling(async (id: number) => {
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
  return createSuccessResponse({ data: post });
});

export const getWrittenPostByYearnAndMonth = withErrorHandling(async (year: number, month: number) => {
  if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
    throw new ValidationError("Invalid year or month");
  }

  const date = new Date(year, month - 1);
  const startDateOfMonth = startOfMonth(date);
  const endDateOfMonth = endOfMonth(date);

  const sessionId = await getSessionId();
  const posts = await db.post.findMany({
    where: {
      userId: sessionId,
      created_at: {
        gte: startDateOfMonth,
        lt: endDateOfMonth,
      },
    },
  });
  const groupedPosts = groupPostsByDate(posts);
  return createSuccessResponse({ data: groupedPosts });
});
