import db from "@/lib/server/db";

export async function getLikeStatus(postId: number, userId: number) {
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
  return {
    isLiked: Boolean(like),
    likeCount,
  };
}
