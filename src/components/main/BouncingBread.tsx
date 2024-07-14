"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const breadImages: string[] = [
  "/image/breads/LogoBread.png",
  "/image/breads/bread1.png",
  "/image/breads/bread2.png",
  "/image/breads/bread3.png",
  "/image/breads/bread4.png",
  "/image/breads/bread5.png",
];

// 배열을 랜덤으로 섞는 함수
const shuffleArray = (array: string[]): string[] => {
  let shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const BouncingBread: React.FC = () => {
  const [shuffledBreadImages1, setShuffledBreadImages1] = useState<string[]>([]);
  const [shuffledBreadImages2, setShuffledBreadImages2] = useState<string[]>([]);
  const [shuffledBreadImages3, setShuffledBreadImages3] = useState<string[]>([]);

  // 초기 렌더링 시 이미지 배열을 랜덤으로 섞음
  useEffect(() => {
    setShuffledBreadImages1(shuffleArray(breadImages));
    setShuffledBreadImages2(shuffleArray(breadImages.concat(breadImages).slice(0, 15)));
    setShuffledBreadImages3(shuffleArray(breadImages));
  }, []);

  // 이미지 렌더링 함수
  const renderImages = (images: string[], top: string, baseLeft: number) =>
    images.map((src, index) => (
      <Image
        key={`${top}-${index}`}
        src={src}
        alt="빵 애니메이션 이미지"
        width={98}
        height={98}
        className="absolute animate-float custom-lg:w-[95px] custom-lg:h-[95px] md-max:w-[80px] md-max:h-[80px] sm-max:w-[65px] sm-max:h-[65px]"
        style={{
          objectFit: "contain",
          left: `calc(${baseLeft}% + ${index * 22}%)`,
          top: top,
        }}
      />
    ));

  return (
    <div className="relative w-full h-[300px] bg-[#fff6d9] overflow-hidden border-b border-[#f7ebc4]">
      {/* 첫 번째 줄 */}
      {renderImages(shuffledBreadImages1, "10%", 10)}
      {/* 두 번째 줄 (연속) */}
      {renderImages(shuffledBreadImages2, "45%", 0)}
      {/* 세 번째 줄 */}
      {renderImages(shuffledBreadImages3, "80%", 10)}
    </div>
  );
};

export default BouncingBread;
