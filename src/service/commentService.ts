import { withErrorHandling } from "@/lib/error/withErrorHandling";
import db from "@/lib/server/db";
import { Comment, User } from "@prisma/client";

type Comments = Pick<Comment, "id" | "text" | "created_at"> & { user: Pick<User, "id" | "username"> } & {
  isAuthor: boolean;
};
export const getInitialComments = withErrorHandling(async (postId: number, userId: number) => {
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
  const formatComments = comments.map((comment) => ({ ...comment, isAuthor: comment.user.id === userId }));
  return formatComments;
});
export type InitialComments = Comments[];
