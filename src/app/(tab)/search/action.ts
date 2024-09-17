"use server";

import { ValidationError } from "@/lib/error/customError";
import { generateErrorResponse } from "@/lib/error/generateErrorResponse";
import { keywordSchema } from "@/lib/schema";
import db from "@/lib/server/db";
import { ServerResponse } from "@/lib/types";
import { formatZodErrorMessage } from "@/lib/utils";
import { ListOfPost } from "@/service/postService";

export async function searchPosts(_: unknown, formData: FormData): Promise<ServerResponse<ListOfPost[]>> {
  try {
    const keyword = formData.get("keyword");
    const result = keywordSchema.safeParse(keyword);

    if (!result.success) {
      throw new ValidationError(formatZodErrorMessage(result.error));
    }
    const posts = await getKeywordOfPost(result.data);
    if (!posts) {
      return { data: [], isSuccess: true, message: "검색 결과가 존재하지 않습니다.", error: null };
    }
    return { data: posts, isSuccess: true, message: "", error: null };
  } catch (error) {
    return generateErrorResponse(error);
  }
}

async function getKeywordOfPost(keyword: string) {
  const posts = await db.post.findMany({
    where: {
      description: {
        contains: keyword,
        mode: "insensitive",
      },
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
  });
  return posts;
}
