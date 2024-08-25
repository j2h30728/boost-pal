"use server";

import { keywordSchema } from "@/lib/schema";
import db from "@/lib/server/db";

export async function searchPosts(_: unknown, formData: FormData) {
  const keyword = formData.get("keyword");
  const result = keywordSchema.safeParse(keyword);

  if (!result.success) return { data: null, error: result.error.flatten(), keyword };
  return { data: await getTWeetByKeyword(result.data), error: null, keyword };
}

export async function getTWeetByKeyword(keyword: string) {
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
