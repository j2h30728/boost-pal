import AWS from "aws-sdk";

import db from "@/lib/server/db";
import { NOT_EXISTS_AI_COMMENT_MESSAGE, NOT_EXISTS_POST_MESSAGE } from "@/constants/messages";
import { NotFoundError } from "@/lib/error/customError";
import { withErrorHandling } from "@/lib/error/withErrorHandling";

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

export const fetchInitialComment = withErrorHandling(async (postId: number) => {
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
  if (!post) {
    throw new NotFoundError(NOT_EXISTS_POST_MESSAGE);
  }
  const aiComments = post.aiComments.map((comment) => ({
    text: comment.text,
    AiBot: { name: comment.aiBot.name, avatar: comment.aiBot.avatar! },
  }));

  const [firstAiComment] = aiComments;
  if (!firstAiComment) {
    throw new NotFoundError(NOT_EXISTS_AI_COMMENT_MESSAGE);
  }
  return { data: firstAiComment };
});
