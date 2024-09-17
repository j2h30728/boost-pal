import { withErrorHandling } from "@/lib/error/withErrorHandling";
import db from "@/lib/server/db";

export const getLikeStatus = (postId: number, userId: number) =>
  withErrorHandling(async () => {
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
    return { isLiked: Boolean(like), likeCount };
  });
