"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { signOut } from "@/app/api/supabase/auth/route";
import UserProfile from "../commons/UserProfile";
import breadImage from "../../../public/image/breads/LogoBread.png";

export const Header: React.FC = () => {
  const { userId, nickname, profile } = useUserStore((state) => ({
    userId: state.userId,
    nickname: state.nickname,
    profile: state.profile as string,
  }));

  const router = useRouter();
  const isLoggedIn = userId !== null;

  const handleLogout = async () => {
    useUserStore.getState().logout();
    await signOut();

    router.push("/");
  };

  return (
    <header className="bg-[#f6f6f6] border-b border-gray-300">
      <div className="container mx-auto flex justify-between items-center pt-3 pb-3 w-main-desktop md-max:w-main-tablet sm-max:w-main-mobile">
        <div className="flex">
          <Link href={"/"} className="flex items-center min-w-4">
            <Image src={breadImage} alt="logo" width={50} height={50} />
            <h1 className="text-2xl font-secondary">대빵이</h1>
          </Link>
        </div>
        <div className="flex">
          {isLoggedIn ? (
            <>
              <Link href={"/mypage"} className="relative flex items-center group">
                <UserProfile src={profile} width={36} height={36} />
                <span className="ml-2 font-secondary text-[20px]">{nickname}</span>
                <div className="absolute top-full mt-2 hidden group-hover:flex flex-col items-center w-28">
                  <div className="relative bg-base rounded py-2 px-4 z-10 text-point font-secondary text-[22px] shadow-lg">
                    마이페이지
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-0 h-0 border-b-[8px] border-b-base border-x-[8px] border-x-transparent"></div>
                  </div>
                </div>
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

export default Header;
