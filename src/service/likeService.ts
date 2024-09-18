import { withErrorHandling } from "@/lib/error/withErrorHandling";
import db from "@/lib/server/db";

export const getLikeStatus = withErrorHandling(async (postId: number, userId: number) => {
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
  return { data: { isLiked: Boolean(like), likeCount } };
});
