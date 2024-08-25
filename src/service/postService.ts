import { LIMIT_NUMBER } from "@/constants/posts";
import db from "@/lib/server/db";
import { Prisma } from "@prisma/client";

export async function getInitialPosts() {
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
    take: LIMIT_NUMBER,
    orderBy: {
      created_at: "desc",
    },
  });
  return posts;
}
export type InitialPosts = Prisma.PromiseReturnType<typeof getInitialPosts>;
