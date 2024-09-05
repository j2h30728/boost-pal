"use client";

import { supabase } from "@/lib/server/supabaseClient";
import { RealtimeChannel } from "@supabase/supabase-js";

import { useEffect, useState } from "react";
import UserDefaultImage from "../common/user-default-image";
import { AiComment } from "@prisma/client";

export interface InitialAiComment {
  text: string;
  AiBot: { name: string; avatar: string } | { name: string; avatar: string }[];
}

export default function AIComment({
  postId,
  initialAiComment,
}: {
  postId: number;
  initialAiComment: InitialAiComment | null;
}) {
  const [aiComment, setAiComment] = useState<InitialAiComment | null>(initialAiComment);

  useEffect(() => {
    let channel: RealtimeChannel | null = null;

    if (!initialAiComment) {
      channel = supabase
        .channel("ai-comment")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "AiComment", filter: `postId=eq.${postId}` },
          async (payload: { new: AiComment }) => {
            const newAiComment = payload.new;

            const { data: aiBotData, error: aiBotError } = await supabase
              .from("AiBot")
              .select("name, avatar")
              .eq("id", newAiComment.aiBotId)
              .single();

            if (aiBotError || !aiBotData) {
              console.error("Error fetching AiBot data:", aiBotError);
              return;
            }
            setAiComment({ text: payload.new.text, AiBot: { name: aiBotData?.name, avatar: aiBotData?.avatar } });
          }
        )
        .subscribe((status) => {
          if (status !== "SUBSCRIBED") {
            console.error("Subscription failed:", status);
          }
        });
    }

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, [postId, initialAiComment]);

  if (aiComment === null) {
    return (
      <div className="animate-bounce mx-auto text-md font-medium text-secondary-1">
        동물 친구에게 응원의 메시지를 받아오고 있어요.
      </div>
    );
  }
  const aiBotName = Array.isArray(aiComment.AiBot) ? aiComment.AiBot[0].name : aiComment.AiBot.name;
  const aiBotAvatar = Array.isArray(aiComment.AiBot) ? aiComment.AiBot[0].avatar : aiComment.AiBot.avatar;
  return (
    <div className="flex justify-between gap-5">
      <p className="text-secondary-1">{aiComment.text}</p>
      <div className="flex flex-col items-center min-w-12 gap-2">
        <UserDefaultImage username={aiBotName} avatar={aiBotAvatar} width={44} height={44} />
        <span>{aiBotName}</span>
      </div>
    </div>
  );
}
