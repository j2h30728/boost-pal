"use client";

import { useOptimistic } from "react";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/solid";

import { addPostComment, deleteComment } from "@/app/(tab)/posts/[id]/actions";
import { InitialComments } from "@/service/commentService";
import { commentSchema } from "@/lib/schema";
import DeleteButton from "../common/delete-button";

type CommentOptimisticValue =
  | {
      action: "add";
      newComment: string;
    }
  | { action: "delete"; commentId: number };

export default function Comments({
  initialComments,
  postId,
  loggedInUsername,
}: {
  initialComments: InitialComments;
  postId: number;
  loggedInUsername: string;
}) {
  const [comments, reducer] = useOptimistic(
    initialComments,
    (previousComments, commentOptimisticValue: CommentOptimisticValue) => {
      if (commentOptimisticValue.action === "add") {
        return [
          ...previousComments,
          {
            id: new Date().getDate(),
            text: commentOptimisticValue.newComment,
            created_at: new Date(),
            postId,
            user: { username: loggedInUsername, id: 0 },
            isAuthor: true,
          },
        ];
      }

      return previousComments.filter((comment) => comment.id !== commentOptimisticValue.commentId);
    }
  );

  const handleUploadComment = (formData: FormData) => {
    const result = commentSchema.safeParse(formData.get("text"));
    if (result.success) {
      reducer({ action: "add", newComment: result.data });
      addPostComment(formData);
    }
  };
  const handleDeleteComment = (formData: FormData) => {
    const commentId = Number(formData.get("id"));
    reducer({ action: "delete", commentId });
    deleteComment(commentId, postId);
  };

  return (
    <div>
      <form action={handleUploadComment} className="flex w-full gap-2 comment-form ">
        <div className="flex relative w-full ">
          <label className="absolute -translate-y-1/2 top-1/2 left-3">
            <ChatBubbleBottomCenterTextIcon className="size-6 text-underline " />
          </label>
          <input
            className="bg-transparent h-11 pl-12 w-full border-b border-underline focus:outline-none focus:ring focus:ring-secondary placeholder:text-underline"
            name="text"
            type="text"
            required
            placeholder="코멘트를 입력해주세요."
          />
        </div>
        <input type="hidden" name="postId" value={postId} />
        <button className="primary-button min-w-16">추가</button>
      </form>
      {comments.map((comment) => (
        <div key={comment.id} className="*:text-md flex items-center my-3">
          <span className="font-semibold w-3/12 min-w-16">{comment.user.username}</span>
          <div className="flex flex-col gap-1 w-full">
            <div className="flex gap-2 items-center">
              <span className="items-center"> {comment.text}</span>
              <div className="ml-auto flex flex-col min-w-10 gap-1">
                <DeleteButton onDelete={handleDeleteComment} id={comment.id} isAuthor={comment.isAuthor} />
                <span className=" text-underline text-xs">10일 전</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
