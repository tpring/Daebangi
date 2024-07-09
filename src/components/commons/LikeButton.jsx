"use client";

import { useState } from "react";
import Image from "next/image";

const LikeButton = () => {
  const [isLiked, setIsLiked] = useState(false);

  const handleToggleLike = () => {
    if (isLiked) {
      // + 해당 userId, bakeryId 가진 커럼 DB like 테이블에서 삭제하기
      setIsLiked(false);
    } else {
      // + DB like 테이블에 추가하기(userId, bakeryId)
      setIsLiked(true);
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
