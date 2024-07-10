"use client";

import { createClient } from "@/supabase/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  checkLikeStatus,
  toggleLikeStatus,
} from "@/app/api/(supabase)/(like)/route";

const LikeButton: React.FC = () => {
  const [isLiked, setIsLiked] = useState(false);

  // 테스트용 userId, bakeryId
  const userId = "6e2e560b-bd56-4039-806b-6f152ced0853";
  const bakeryId = "009a052c-3b40-4500-9416-349b625585b5";

  const fetchLikeStatus = async () => {
    try {
      const status = await checkLikeStatus(userId, bakeryId);
      setIsLiked(status);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLikeStatus();
  }, []);

  const handleToggleLike = async () => {
    try {
      const result = await toggleLikeStatus(isLiked, userId, bakeryId);
      if (result) {
        setIsLiked(!isLiked);
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
