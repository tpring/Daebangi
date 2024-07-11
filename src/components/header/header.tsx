"use client";

import React from "react";
import breadImage from "../../../public/image/breads/LogoBread.png";
import Image from "next/image";
import Link from "next/link";
import { useUserStore } from "@/store/userStore";

type HeaderProps = {
  breadImage: StaticImageData;
};

export const Header: React.FC<HeaderProps> = ({ breadImage }) => {
  const { userId, nickname, profile, setUser } = useUserStore();

  const isLoggedIn = userId !== null;

  const handleLogout = () => {
    setUser(null, null, null, null);
  };

  return (
    <header className="bg-gray-100 border-b border-gray-300">
      <div className="container mx-auto flex flex justify-between items-center p-4">
        <Image src={breadImage} alt="logo" width={50} height={50} />
        <h1 className="ml-2 text-lg font-secondary">대빵이</h1>
        <div className="flex items-center">
          {isLoggedIn ? (
            <>
              <Image
                src={profile ||}
                alt="profile"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="ml-2">{nickname}</span>
              <button
                onClick={handleLogout}
                className="ml-4 text-gray-600 hover:text-gray-900"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-600 hover:text-gray-900">
                로그인
              </Link>
              <Link
                href="/signup"
                className="ml-4 text-gray-600 hover:text-gray-900"
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
