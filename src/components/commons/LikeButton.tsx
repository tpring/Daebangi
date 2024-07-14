"use client";

import { checkLikeStatus, toggleLikeStatus } from "@/app/api/supabase/like/route";
import { useUserStore } from "@/store/userStore";
import Image from "next/image";
import { useEffect, useState } from "react";

type LikeButtonProp = {
  bakeryId: string;
};

const LikeButton: React.FC<LikeButtonProp> = ({ bakeryId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { userId, setLikesChanged } = useUserStore((state) => ({
    userId: state.userId,
    setLikesChanged: state.setLikesChanged,
  }));

  const fetchLikeStatus = async () => {
    if (!userId) return;
    try {
      const status = await checkLikeStatus(userId as string, bakeryId);
      setIsLiked(status);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLikeStatus();
  }, [userId]);

  const handleToggleLike = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const result = await toggleLikeStatus(isLiked, userId, bakeryId);
      if (result) {
        setIsLiked(!isLiked);
        setLikesChanged(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <button onClick={handleToggleLike}>
      {isLiked ? (
        <Image src="/image/icons/heartActive.png" width={20} height={20} alt="liked image" />
      ) : (
        <Image src="/image/icons/heart.png" width={20} height={20} alt="unliked image" />
      )}
    </button>
  );
};

export default LikeButton;
