import { generateErrorResponse } from "@/lib/error/generateErrorResponse";
import db from "@/lib/server/db";
import { ServerResponse } from "@/lib/types";
import { Comment, Prisma, User } from "@prisma/client";

type Comments = Pick<Comment, "id" | "text" | "created_at"> & { user: Pick<User, "id" | "username"> } & {
  isAuthor: boolean;
};
export const getInitialComments = async (postId: number, userId: number): Promise<ServerResponse<Comments[]>> => {
  try {
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
    return { data: formatComments, isSuccess: true, message: "", error: null };
  } catch (error) {
    return generateErrorResponse(error);
  }
};
export type InitialComments = Comments[];
