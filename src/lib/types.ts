import { AiBot, AiComment, Post, User } from "@prisma/client";

export type ServerResponse<Data> = SuccessResponse<Data> | FailResponse;

export type SuccessResponse<Data> = {
  data: Data;
  isSuccess: true;
  error: null;
  message: string;
};

export type FailResponse = {
  data: null;
  isSuccess: false;
  error: Error;
  message: string;
};

type PostOfAiComment = AiComment & { aiBot: AiBot };
export type ListOfPost = Post & { user: User } & { _count: { comments: number; likes: number } } & {
  aiComments: PostOfAiComment[];
};
export interface CursorPagination {
  items: ListOfPost[];
  nextCursorId: number | null;
  isLastPage: boolean;
}
