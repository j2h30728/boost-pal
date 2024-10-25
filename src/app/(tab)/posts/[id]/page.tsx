import { notFound } from "next/navigation";
import { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { EyeIcon } from "@heroicons/react/24/solid";

import { CATEGORIES } from "@/constants/categories";
import { cacheTags } from "@/lib/cacheTags";

import { deletePost } from "./actions";
import { getSessionId, getUserInfoBySession } from "@/service/userService";
import { getPostById, getPostWithUpdateView } from "@/service/postService";
import { getInitialComments } from "@/service/commentService";
import { getLikeStatus } from "@/service/likeService";
import { fetchInitialComment } from "@/service/aiCommentService";

import { formatToTimeAgo } from "@/lib/client/utils";
import DeleteButton from "@/components/common/delete-button";
import AIComment from "@/components/post/ai-comment";
import Comment from "@/components/post/comment";
import LikeButton from "@/components/post/like-button";
import UserDefaultImage from "@/components/common/user-default-image";
import DetailImage from "@/components/post/detail-image";
import { throwErrors } from "@/lib/error/throwErrors";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { data: product } = await getPostById(Number(params.id));
  if (!product) return {};

  return {
    title: `BOOST PAL - ${product.description.slice(0, 10)}`,
    description: product.description.slice(0, 30),
    openGraph: {
      title: `BOOST PAL - ${product.description.slice(0, 10)}`,
      description: product.description.slice(0, 30),
      url: `https://boostpal.vercel.app/posts/${product.id}`,
      images: [
        {
          url: product.photo ? `${product.photo}/middle` : "/images/og-image.jpg",
          width: 800,
          height: 600,
          alt: product.description.slice(0, 10),
        },
      ],
    },
  };
}

function getCachedPostDetail(postId: number) {
  const cachedPostDetail = unstable_cache(getPostWithUpdateView, ["post-detail"], {
    tags: cacheTags.postDetail(postId),
  });
  return cachedPostDetail(postId);
}

async function getCachedLikeStatus(postId: number) {
  const sessionId = await getSessionId();
  const cachedLikeStatus = unstable_cache(getLikeStatus, ["post-like-status"], {
    tags: [cacheTags.postLike(postId)],
  });
  return cachedLikeStatus(postId, sessionId);
}

async function getCachedComments(postId: number) {
  const sessionId = await getSessionId();
  const cachedComments = unstable_cache(getInitialComments, ["post-comments"], {
    tags: [cacheTags.postComment(postId)],
  });
  return cachedComments(postId, sessionId);
}

async function getIsAuthor(userId: number) {
  const sessionId = await getSessionId();
  if (sessionId) return sessionId === userId;

  return false;
}
export default async function DetailPost({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return notFound();
  }

  const { data: loggedInUser, error: loggedInUserError } = await getUserInfoBySession();
  const { data: post, error: postError } = await getCachedPostDetail(Number(id));
  const { data: comments, error: commentError } = await getCachedComments(id);
  const { data: likeStatus, error: likeError } = await getCachedLikeStatus(id);

  if (loggedInUserError || postError || commentError || likeError) {
    return throwErrors(loggedInUserError, postError, commentError, likeError);
  }

  const isAuthor = await getIsAuthor(post.userId);
  const { data: aiComment } = await fetchInitialComment(post.id);
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
            <LikeButton isLiked={likeStatus.isLiked} likeCount={likeStatus.likeCount} postId={id} />
            <div className="flex items-center gap-2 text-neutral-400 text-sm">
              <EyeIcon className="size-6 text-underline" />
              <span>{post.views}</span>
            </div>
          </div>
          <span className="text-underline">{formatToTimeAgo(post.created_at.toString())}</span>
        </div>
        <AIComment postId={post.id} initialAiComment={aiComment} />
        <Comment initialComments={comments} postId={post.id} loggedInUsername={loggedInUser.username} />
      </div>
    </div>
  );
}
