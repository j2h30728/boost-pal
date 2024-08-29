"use server";

import { redirect } from "next/navigation";

import { getSession } from "@/lib/server/session";
import db from "@/lib/server/db";
import { postSchema } from "@/lib/schema";
import { sendAiCommentToSQS } from "@/service/aiCommentService";

export async function uploadPost(formData: FormData) {
  const data = {
    photo: formData.get("photo"),
    description: formData.get("description"),
    category: formData.get("category"),
  };
  const result = postSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  }

  const session = await getSession();
  if (session.id) {
    const post = await db.post.create({
      data: {
        photo: result.data.photo,
        description: result.data.description,
        user: {
          connect: {
            id: session.id,
          },
        },
        category: result.data.category,
      },
    });
    sendAiCommentToSQS({
      postId: post.id,
      userId: post.userId,
      imageUrl: post.photo ? `${post.photo}/middle` : "",
      description: post.description,
    });
    redirect(`/posts/${post.id}`);
  }
}

export async function getUploadUrl() {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
      },
    }
  );
  const data = await response.json();
  return data;
}
