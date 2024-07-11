"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const breadImages = [
  "/image/breads/LogoBread.png",
  "/image/breads/bread1.png",
  "/image/breads/bread2.png",
  "/image/breads/bread3.png",
  "/image/breads/bread4.png",
  "/image/breads/bread5.png",
];

// 배열을 랜덤으로 섞는 함수
const shuffleArray = (array) => {
  let shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const BreadRain = () => {
  const [shuffledBreadImages1, setShuffledBreadImages1] = useState([]);
  const [shuffledBreadImages2, setShuffledBreadImages2] = useState([]);
  const [shuffledBreadImages3, setShuffledBreadImages3] = useState([]);

  useEffect(() => {
    setShuffledBreadImages1(shuffleArray(breadImages));
    setShuffledBreadImages2(shuffleArray(breadImages.concat(breadImages).slice(0, 15)));
    setShuffledBreadImages3(shuffleArray(breadImages));
  }, []);

  return (
    <div className="relative w-full h-[300px] bg-[#FFF9E5] overflow-hidden">
      {/* 첫 번째 줄 */}
      {shuffledBreadImages1.map((src, index) => (
        <Image
          key={`first-${index}`}
          src={src}
          alt="빵 애니메이션 이미지"
          width={100}
          height={100}
          className="absolute animate-wobble md:w-20 md:h-20 sm:w-10 sm:h-10"
          style={{
            objectFit: "contain",
            left: `calc(10% + ${index * 22}%)`,
            top: `10%`,
          }}
        />
      ))}
      {/* 두 번째 줄 */}
      {shuffledBreadImages2.map((src, index) => (
        <Image
          key={`second-${index}`}
          src={src}
          alt="빵 애니메이션 이미지"
          width={100}
          height={100}
          className="absolute animate-wobble md:w-20 md:h-20 sm:w-10 sm:h-10"
          style={{
            objectFit: "contain",
            left: `calc(${index * 22}%)`,
            top: `45%`,
          }}
        />
      ))}
      {/* 세 번째 줄 */}
      {shuffledBreadImages3.map((src, index) => (
        <Image
          key={`third-${index}`}
          src={src}
          alt="빵 애니메이션 이미지"
          width={100}
          height={100}
          className="absolute animate-wobble md:w-20 md:h-20 sm:w-10 sm:h-10"
          style={{
            objectFit: "contain",
            left: `calc(10% + ${index * 22}%)`,
            top: `80%`,
          }}
        />
      ))}
    </div>
  );
};

export default BreadRain;
