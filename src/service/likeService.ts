import { generateErrorResponse } from "@/lib/error/generateErrorResponse";
import db from "@/lib/server/db";
import { ServerResponse } from "@/lib/types";

export const getLikeStatus = async (
  postId: number,
  userId: number
): Promise<ServerResponse<{ isLiked: boolean; likeCount: number }>> => {
  try {
    const like = await db.like.findUnique({
      where: {
        id: {
          userId,
          postId,
        },
      },
    });
    const likeCount = await db.like.count({
      where: {
        postId,
      },
    });
    return { data: { isLiked: Boolean(like), likeCount }, isSuccess: true, message: "", error: null };
  } catch (error) {
    return generateErrorResponse(error);
  }
};
