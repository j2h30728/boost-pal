"use client";

import { useOptimistic } from "react";
import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHandHeartIcon } from "@heroicons/react/24/outline";

import { dislikePost, likePost } from "@/app/(tab)/posts/[id]/actions";

export default function LikeButton({
  isLiked,
  likeCount,
  postId,
}: {
  isLiked: boolean;
  likeCount: number;
  postId: number;
}) {
  const [state, reducer] = useOptimistic({ likeCount, isLiked }, (previousState, _) => ({
    likeCount: previousState.isLiked ? previousState.likeCount - 1 : previousState.likeCount + 1,
    isLiked: !previousState.isLiked,
  }));

  const handleLikeButton = () => {
    reducer(null);
    if (isLiked) {
      dislikePost(postId);
    } else {
      likePost(postId);
    }
  };

  return (
    <form action={handleLikeButton}>
      <button className={"flex items-center gap-2 text-neutral-400 text-sm transition-colors"}>
        {state.isLiked ? (
          <HeartIcon className="size-6 text-primary hover:text-primary-1" />
        ) : (
          <OutlineHandHeartIcon className="size-6 text-neutral hover:text-stone-300" />
        )}
        <span> {state.likeCount}</span>
      </button>
    </form>
  );
}
