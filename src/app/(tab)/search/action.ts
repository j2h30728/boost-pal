"use server";

import { ValidationError } from "@/lib/error/customError";
import { withErrorHandling } from "@/lib/error/withErrorHandling";
import { keywordSchema } from "@/lib/schema";
import db from "@/lib/server/db";
import { formatZodErrorMessage } from "@/lib/utils";

export const searchPosts = (_: unknown, formData: FormData) =>
  withErrorHandling(async () => {
    const keyword = formData.get("keyword");
    const result = keywordSchema.safeParse(keyword);

    if (!result.success) {
      throw new ValidationError(formatZodErrorMessage(result.error));
    }
    const posts = await getKeywordOfPost(result.data);
    if (!posts) {
      return { data: [], isSuccess: true, message: "검색 결과가 존재하지 않습니다.", error: null };
    }
    return posts;
  });

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
