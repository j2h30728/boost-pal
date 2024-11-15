"use server";

import { redirect } from "next/navigation";

import db from "@/lib/server/db";
import { postSchema } from "@/lib/schema";
import { sendAiCommentToSQS } from "@/service/aiCommentService";
import { ServerResponse } from "@/lib/types";
import { formatZodErrorMessage } from "@/lib/utils";
import { generateErrorResponse } from "@/lib/error/generateErrorResponse";
import { getSessionId } from "@/service/userService";
import { createUploadImageUrl } from "@/lib/images";

export const uploadPost = async (formData: FormData): Promise<ServerResponse<unknown>> => {
  let postId: number;
  try {
    const data = {
      photo: formData.get("photo"),
      description: formData.get("description"),
      category: formData.get("category"),
    };
    const result = postSchema.safeParse(data);
    if (!result.success) {
      return { data: null, isSuccess: false, message: formatZodErrorMessage(result.error), error: result.error };
    }

    const sessionId = await getSessionId();
    const post = await db.post.create({
      data: {
        photo: result.data.photo,
        description: result.data.description,
        user: {
          connect: {
            id: sessionId,
          },
        },
        category: result.data.category,
      },
    });
    postId = post.id;

    sendAiCommentToSQS({
      postId: post.id,
      userId: post.userId,
      imageUrl: createUploadImageUrl(post.photo, "middle"),
      description: post.description,
    });
  } catch (error) {
    return generateErrorResponse(error);
  }
  redirect(`/posts/${postId}`);
};
