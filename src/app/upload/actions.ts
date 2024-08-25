"use server";

import { redirect } from "next/navigation";

import { getSession } from "@/lib/server/session";
import db from "@/lib/server/db";
import { postSchema } from "@/lib/schema";
import postOpenAI from "@/service/aiService";

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
    setImmediate(async () => {
      const aiMessage = await postOpenAI({
        description: result.data.description,
        imageUrl: result.data.photo ? `${result.data.photo}/public` : null,
      });

      if (aiMessage.content) {
        await db.aiComment.create({
          data: {
            text: aiMessage.content,
            postId: post.id,
            aiBotId: 1,
          },
        });
      }
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
