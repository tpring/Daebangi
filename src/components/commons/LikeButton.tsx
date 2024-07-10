"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { createClient } from "@/supabase/client";

const LikeButton: React.FC = () => {
  const supabase = createClient();
  const [isLiked, setIsLiked] = useState(false);

  // 테스트용 userId, bakeryId
  const userId = "6e2e560b-bd56-4039-806b-6f152ced0853";
  const bakeryId = "009a052c-3b40-4500-9416-349b625585b5";

  const checkLikeStatus = async () => {
    try {
      const { data, error } = await supabase
        .from("like")
        .select("*")
        .eq("user_id", userId)
        .eq("bakery_id", bakeryId);

      if (error) {
        console.error(error);
      } else {
        setIsLiked(data.length > 0);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkLikeStatus();
  }, [checkLikeStatus]);

  const handleToggleLike = async () => {
    try {
      if (isLiked) {
        const { error } = await supabase
          .from("like")
          .delete()
          .eq("user_id", userId)
          .eq("bakery_id", bakeryId);

        if (error) {
          console.error(error);
        } else {
          setIsLiked(false);
        }
      } else {
        const { error } = await supabase.from("like").insert({
          user_id: userId,
          bakery_id: bakeryId,
        });

        if (error) {
          console.error(error);
        } else {
          setIsLiked(true);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={handleToggleLike}>
      {isLiked ? (
        <Image
          src="/image/icons/heartActive.png"
          width={20}
          height={20}
          alt="liked image"
        />
      ) : (
        <Image
          src="/image/icons/heart.png"
          width={20}
          height={20}
          alt="unliked image"
        />
      )}
    </button>
  );
};

export default LikeButton;
