"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const UpButton: React.FC = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    setShowButton(window.scrollY > 250 ? true : false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-11 right-11 p-0 m-0 z-10 border-none bg-transparent transition-opacity duration-300 ${
        showButton ? "opacity-100" : "opacity-0"
      } hover:transform hover:scale-105 hover:transition-transform hover:duration-300`}
      aria-label="스크롤 위로"
    >
      <Image src="/image/breads/upButtonMilk.png" alt="스크롤 업버튼" width={95} height={95} />
    </button>
  );
};

export default UpButton;
