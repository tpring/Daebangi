"use client";

import { createClient } from "@/supabase/client";
import Image from "next/image";
import { useEffect, useState } from "react";

const LikeButton: React.FC = () => {
  const supabase = createClient();
  const [isLiked, setIsLiked] = useState(false);

  // 테스트용 userId, bakeryId
  const userId = "386e5d5f-5bfc-427c-b4c0-126d3252b48c";
  const bakeryId = "0389023d-f2d5-4956-8eb4-f24a89aa03d3";

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
