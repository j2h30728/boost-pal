import { notFound } from "next/navigation";
import { unstable_cache } from "next/cache";
import { EyeIcon } from "@heroicons/react/24/solid";

import { CATEGORIES } from "@/constants/cateogries";
import { cacheTags } from "@/lib/cacheTags";

import { deletePost } from "./actions";
import { getSession } from "@/lib/server/session";
import { getUserInfoBySession } from "@/service/userService";
import { getPostById, getPostWithUpdateView } from "@/service/postService";
import { getInitialComments } from "@/service/commentService";
import { getLikeStatus } from "@/service/likeService";

import { formatToTimeAgo } from "@/lib/client/utils";
import DeleteButton from "@/components/common/delete-button";
import AIComment from "@/components/post/ai-comment";
import Comment from "@/components/post/comment";
import LikeButton from "@/components/post/like-button";
import UserDefaultImage from "@/components/common/user-default-image";
import DetailImage from "@/components/post/detail-image";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getPostById(Number(params.id));
  return {
    title: product?.description.slice(0, 10),
  };
}

function getCachedPostDetail(postId: number) {
  const cachedPostDetail = unstable_cache(getPostWithUpdateView, ["post-detail"], {
    tags: cacheTags.postDetail(postId),
  });
  return cachedPostDetail(postId);
}

async function getCachedLikeStatus(postId: number) {
  const session = await getSession();
  const cachedLikeStatus = unstable_cache(getLikeStatus, ["post-like-status"], {
    tags: [cacheTags.postLike(postId)],
  });
  return cachedLikeStatus(postId, session.id!);
}

async function getCachedComments(postId: number) {
  const session = await getSession();
  const cachedComments = unstable_cache(getInitialComments, ["post-comments"], {
    tags: [cacheTags.postComment(postId)],
  });
  return cachedComments(postId, session.id!);
}

async function getIsAuthor(userId: number) {
  const session = await getSession();
  if (session.id) return session.id === userId;

  return false;
}
export default async function DetailPost({ params }: { params: { id: string } }) {
  const id = Number(params.id);

  if (isNaN(id)) return notFound();

  const loggedInUser = await getUserInfoBySession();
  const post = await getCachedPostDetail(id);
  const comments = await getCachedComments(id);

  if (!post) return notFound();

  const isAuthor = await getIsAuthor(post.userId);
  const { isLiked, likeCount } = await getCachedLikeStatus(id);

  return (
    <div className="w-full">
      <div className="p-5 flex items-center gap-3">
        <div className="flex items-center gap-4">
          <UserDefaultImage avatar={post.user.avatar} username={post.user.username} width={44} height={44} />
          <span>{post.user.username}</span>
        </div>
        <span className="chip w-10 h-4 text-xs">{CATEGORIES[post.category]}</span>
        {isAuthor ? <DeleteButton isAuthor={isAuthor} id={post.id} onDelete={deletePost} /> : null}
      </div>
      <DetailImage src={post.photo} alt={post.description} />
      <div className="p-5 flex flex-col gap-6">
        <p>{post.description}</p>
        <div className="flex gap-5 items-start justify-between">
          <div className="flex gap-2">
            <LikeButton isLiked={isLiked} likeCount={likeCount} postId={id} />
            <div className="flex items-center gap-2 text-neutral-400 text-sm">
              <EyeIcon className="size-6 text-underline" />
              <span>{post.views}</span>
            </div>
          </div>
          <span className="text-underline">{formatToTimeAgo(post.created_at.toString())}</span>
        </div>
        <AIComment postId={post.id} />
        <Comment initialComments={comments} postId={post.id} loggedInUsername={loggedInUser.username} />
      </div>
    </div>
  );
}
