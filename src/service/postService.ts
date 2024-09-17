"use server";

import { endOfMonth, startOfMonth } from "date-fns";
import { AiBot, AiComment, Category, Post, Prisma, User } from "@prisma/client";

import db from "@/lib/server/db";
import { LIMIT_NUMBER } from "@/constants/posts";
import { getMostPopularCategory } from "./categoryService";
import { ServerResponse } from "@/lib/types";
import { NotFoundError, ValidationError } from "@/lib/error/customError";
import { generateErrorResponse } from "@/lib/error/generateErrorResponse";
import { getSessionId } from "./userService";
import { groupPostsByDate, GroupPostsByDateType } from "@/lib/utils";

type PostOfAiComment = AiComment & { aiBot: AiBot };
export type ListOfPost = Post & { user: User } & { _count: { comments: number; likes: number } } & {
  aiComments: PostOfAiComment[];
};
export interface CursorPagination {
  items: ListOfPost[];
  nextCursorId: number | null;
  isLastPage: boolean;
}
export async function getInitialPosts(category?: Category): Promise<ServerResponse<CursorPagination>> {
  try {
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
    return {
      data: { items: posts, nextCursorId, isLastPage: nextCursorId === null },
      isSuccess: true,
      message: "",
      error: null,
    };
  } catch (error) {
    return generateErrorResponse(error);
  }
}
export type InitialPosts = Prisma.PromiseReturnType<typeof getInitialPosts>;

export const getPaginatedPosts = async (
  cursorId: number | null,
  option?: { category: Category }
): Promise<ServerResponse<CursorPagination>> => {
  try {
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
    return { data: { items: posts, nextCursorId, isLastPage }, isSuccess: true, message: "", error: null };
  } catch (error) {
    return generateErrorResponse(error);
  }
};

export type PaginatedPosts = Prisma.PromiseReturnType<typeof getPaginatedPosts>;

export const getPostsByCategory = async (category: Category): Promise<ServerResponse<ListOfPost[]>> => {
  try {
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
    return { data: posts, isSuccess: true, message: "", error: null };
  } catch (error) {
    return generateErrorResponse(error);
  }
};

export const getMostPopularCategoryPosts = async (): Promise<ServerResponse<ListOfPost[]>> => {
  try {
    const { data: category, isSuccess: categorySuccess, error } = await getMostPopularCategory();
    if (!categorySuccess) {
      throw error;
    }

    if (!category) {
      return {
        data: [],
        isSuccess: true,
        message: "인증 기록이 존재하지 않아 인기 주제가 없습니다.",
        error: null,
      };
    }
    return getPostsByCategory(category);
  } catch (error) {
    return generateErrorResponse(error);
  }
};

export const getPostsByLoggedInUser = async (): Promise<ServerResponse<ListOfPost[]>> => {
  try {
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
    return { data: posts, isSuccess: true, message: "", error: null };
  } catch (error) {
    return generateErrorResponse(error);
  }
};

export const getPostsCountForThisMonth = async (): Promise<ServerResponse<number>> => {
  const date = new Date();
  const startDateOfMonth = startOfMonth(date);
  const endDateOfMonth = endOfMonth(date);

  try {
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
    return { data: postCount, isSuccess: true, message: "", error: null };
  } catch (error) {
    return generateErrorResponse(error);
  }
};

export const getPostCountByLoggedInUser = async (): Promise<ServerResponse<number>> => {
  try {
    const sessionId = await getSessionId();
    const postCount = await db.post.count({
      where: {
        userId: sessionId,
      },
    });
    return { data: postCount, isSuccess: true, message: "", error: null };
  } catch (error) {
    return generateErrorResponse(error);
  }
};

export const getPostById = async (id: number): Promise<ServerResponse<Post>> => {
  try {
    const post = await db.post.findUnique({ where: { id } });
    if (!post) {
      throw new NotFoundError();
    }
    return { data: post, isSuccess: true, message: "", error: null };
  } catch (error) {
    return generateErrorResponse(error);
  }
};

type DetailPost = Post & { _count: { comments: number }; user: Pick<User, "username" | "avatar"> };
export const getPostWithUpdateView = async (id: number): Promise<ServerResponse<DetailPost>> => {
  try {
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
    return { data: post, isSuccess: true, message: "", error: null };
  } catch (error) {
    return generateErrorResponse(error);
  }
};

export const getWrittenPostByYearnAndMonth = async (
  year: number,
  month: number
): Promise<ServerResponse<GroupPostsByDateType>> => {
  try {
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
    return { data: groupedPosts, isSuccess: true, message: "", error: null };
  } catch (error) {
    return generateErrorResponse(error);
  }
};
