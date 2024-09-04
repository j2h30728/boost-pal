import db from "@/lib/server/db";
import { Prisma } from "@prisma/client";

export async function getInitialComments(postId: number, userId: number) {
  const comments = await db.comment.findMany({
    where: {
      postId,
    },
    select: {
      id: true,
      text: true,
      created_at: true,
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
  return comments.map((comment) => ({ ...comment, isAuthor: comment.user.id === userId }));
}
export type InitialComments = Prisma.PromiseReturnType<typeof getInitialComments>;
