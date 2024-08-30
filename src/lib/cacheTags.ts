export const cacheTags = {
  profile: "user-profile" as const,
  postDetail: (postId: number) => [`post-detail-${postId}`, cacheTags.profile],
  postLike: (postId: number) => `like-status-${postId}` as const,
  postComment: (postId: number) => `post-comments-${postId}` as const,
};
