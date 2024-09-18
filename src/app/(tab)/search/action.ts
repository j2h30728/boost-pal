"use server";

import { ValidationError } from "@/lib/error/customError";
import { withErrorHandling } from "@/lib/error/withErrorHandling";
import { keywordSchema } from "@/lib/schema";
import db from "@/lib/server/db";
import { formatZodErrorMessage } from "@/lib/utils";

export const searchPosts = withErrorHandling(async (_: unknown, formData: FormData) => {
  const keyword = formData.get("keyword");
  const result = keywordSchema.safeParse(keyword);

  if (!result.success) {
    throw new ValidationError(formatZodErrorMessage(result.error));
  }
  const posts = await getKeywordOfPost(result.data);
  if (!posts || posts.length === 0) {
    return { data: [], message: "검색결과가 존재하지 않습니다." };
  }
  return { data: posts ?? [], message: `${keyword}에 대한 검색 결과입니다.` };
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
