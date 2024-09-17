import AWS from "aws-sdk";

import { InitialAiComment } from "@/components/post/ai-comment";
import db from "@/lib/server/db";
import { generateErrorResponse } from "@/lib/error/generateErrorResponse";
import { ServerResponse } from "@/lib/types";
import { NOT_EXISTS_AI_COMMENT_MESSAGE, NOT_EXISTS_POST_MESSAGE } from "@/constants/messages";
import { NotFoundError } from "@/lib/error/customError";

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

export const fetchInitialComment = async (postId: number): Promise<ServerResponse<InitialAiComment | null>> => {
  try {
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
    return { data: firstAiComment, isSuccess: true, message: "", error: null };
  } catch (error) {
    return generateErrorResponse(error);
  }
};
