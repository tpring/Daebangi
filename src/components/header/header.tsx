"use client";

import { useUserStore } from "@/store/userStore";
import { createClient } from "@/supabase/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from "../../../node_modules/next/navigation";
import breadImage from "../../../public/image/breads/LogoBread.png";
import UserProfile from "../commons/UserProfile";

export const Header: React.FC = () => {
  const { userId, nickname, setUser, profile } = useUserStore((state) => ({
    userId: state.userId,
    nickname: state.nickname,
    setUser: state.setUser,
    profile: state.profile,
  }));

  const router = useRouter();
  const isLoggedIn = userId !== null;
  const supabase = createClient();

  const handleLogout = async () => {
    setUser(null, null, null, null);
    await supabase.auth.signOut();

    router.push("/"); // 로그아웃 후 메인 페이지로 리다이렉트
  };

  return (
    <header className="bg-gray-100 border-b border-gray-300 ">
      <div className="container mx-auto flex justify-between items-center p-2">
        <div className="flex px-[200px] ">
          <Link href={"/"} className="flex">
            <Image src={breadImage} alt="logo" width={50} height={50} />
            <h1 className="text-2xl font-secondary">대빵이</h1>
          </Link>
        </div>
        <div className="flex px-[215px]">
          {isLoggedIn ? (
            <>
              <Link href={"/mypage"} className="flex">
                <UserProfile src={profile} width={40} height={40} />
                <span className="ml-2 flex justify-between items-center">{nickname}</span>
              </Link>
              <button onClick={handleLogout} className="ml-4 text-gray-600 hover:text-gray-900">
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-600 hover:text-gray-900">
                로그인
              </Link>
              <Link href="/signup" className="ml-4 text-gray-600 hover:text-gray-900">
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
