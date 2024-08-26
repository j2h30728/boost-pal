"use client";

import { supabase } from "@/lib/server/supabaseClient";

import { useEffect, useState } from "react";
import UserDefaultImage from "../common/user-default-image";
import { AiComment } from "@prisma/client";

interface InitialAiComment {
  text: string;
  AiBot: { name: string; avatar: string } | { name: string; avatar: string }[];
}

export default function AIComment({ postId }: { postId: number }) {
  const [aiComment, setAiComment] = useState<InitialAiComment | null>(null);

  useEffect(() => {
    const fetchInitialComment = async () => {
      const { data, error } = await supabase
        .from("AiComment")
        .select("text, AiBot(name, avatar)")
        .eq("postId", postId)
        .single();

      if (error) {
        console.error("Error fetching comment:", error);
      } else {
        setAiComment(data);
      }
    };
    fetchInitialComment();

    const channel = supabase
      .channel("ai-comment")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "AiComment", filter: `postId=eq.${postId}` },
        async (payload: { new: AiComment }) => {
          supabase.removeChannel(channel);
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

    return () => {
      supabase.removeChannel(channel);
    };
  }, [postId]);

  if (aiComment === null) {
    return <div>Loading</div>;
  }
  const aiBotName = Array.isArray(aiComment.AiBot) ? aiComment.AiBot[0].name : aiComment.AiBot.name;
  const aiBotAvatar = Array.isArray(aiComment.AiBot) ? aiComment.AiBot[0].avatar : aiComment.AiBot.avatar;
  return (
    <div className="flex justify-between gap-5">
      <p className="text-secondary-1">{aiComment.text}</p>
      <div className="flex flex-col items-center">
        <UserDefaultImage username={aiBotName} avatar={aiBotAvatar} />
        <span>{aiBotName}</span>
      </div>
    </div>
  );
}
