"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import db from "@/lib/server/db";
import { commentSchema } from "@/lib/schema";
import { getSession } from "@/lib/server/session";
import { ROUTE_PATHS } from "@/constants/routePath";
import { cacheTags } from "@/lib/cacheTags";
import { ServerResponse } from "@/lib/types";
import { generateErrorResponse } from "@/lib/error/generateErrorResponse";

export const likePost = async (postId: number) => {
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        userId: session.id!,
        postId,
      },
    });
    revalidateTag(cacheTags.postLike(postId));
  } catch (error) {}
};

export const dislikePost = async (postId: number) => {
  const session = await getSession();
  try {
    await db.like.delete({
      where: {
        id: { userId: session.id!, postId },
      },
    });
    revalidateTag(cacheTags.postLike(postId));
  } catch (error) {}
};

export const addPostComment = async (formData: FormData) => {
  const text = formData.get("text");
  const postId = formData.get("postId");
  const result = commentSchema.safeParse(text);
  const formatPostId = Number(postId);
  if (!result.success) {
    return result.error.flatten();
  }
  const session = await getSession();
  try {
    if (session.id) {
      await db.comment.create({
        data: {
          userId: session.id,
          postId: formatPostId,
          text: result.data,
        },
      });
    }
  } catch (error) {}
  revalidateTag(cacheTags.postComment(formatPostId));
};
export const deleteComment = async (commentId: number, postId: number) => {
  const session = await getSession();
  try {
    if (session.id) {
      await db.comment.delete({
        where: {
          id: commentId,
          userId: session.id,
        },
      });
    }
  } catch (error) {}
  revalidateTag(cacheTags.postComment(postId));
};

export const deletePost = async (formData: FormData): Promise<ServerResponse<unknown>> => {
  try {
    const postId = Number(formData.get("id"));
    const session = await getSession();

    if (session.id) {
      await db.post.delete({
        where: {
          id: postId,
          userId: session.id,
        },
      });
      revalidatePath(`/posts/${postId}`);
    }
  } catch (error) {
    return generateErrorResponse(error);
  }
  redirect(ROUTE_PATHS.POSTS);
};
