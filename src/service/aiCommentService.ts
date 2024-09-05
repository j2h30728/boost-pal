import AWS from "aws-sdk";

import { InitialAiComment } from "@/components/post/ai-comment";
import db from "@/lib/server/db";

const sqs = new AWS.SQS({ region: "ap-northeast-2" });

interface MessageBody {
  userId: number;
  postId: number;
  description: string;
  imageUrl: string | null;
}

export const sendAiCommentToSQS = async (messageBody: MessageBody): Promise<string> => {
  const params = {
    QueueUrl: process.env.SQS_QUEUE_URL as string,
    MessageBody: JSON.stringify(messageBody),
  };

  try {
    const result = await sqs.sendMessage(params).promise();
    return result.MessageId!;
  } catch (error) {
    console.error("Error sending message to SQS:", error);
    throw new Error("Failed to send message to SQS");
  }
};

export const fetchInitialComment: (postId: number) => Promise<InitialAiComment | null> = async (postId: number) => {
  const post = await db.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      aiComments: {
        include: {
          aiBot: true,
        },
      },
    },
  });
  if (!post?.aiComments) {
    return null;
  }

  const aiComment = post.aiComments.map((comment) => ({
    text: comment.text,
    AiBot: { name: comment.aiBot.name, avatar: comment.aiBot.avatar! },
  }));

  return aiComment[0];
};
