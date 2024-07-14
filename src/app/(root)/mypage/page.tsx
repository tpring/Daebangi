"use client";

import { LikeBakeryList } from "@/components/bakeries/LikeBakeryList";
import UserProfile from "@/components/commons/profile/UserProfile";
import { useUserStore } from "@/store/userStore";
import Link from "next/link";

const MyPage = () => {
  const { nickname, profile, description } = useUserStore((state) => ({
    nickname: state.nickname,
    profile: state.profile,
    description: state.description,
  }));

  return (
    <div className="reactive-body mx-auto w-main-desktop md-max:w-main-tablet sm-max:w-main-mobile pb-14">
      <div className="flex items-center flex-col md:flex-row justify-between my-12">
        <div className="flex items-center">
          <UserProfile src={profile} width={140} height={140} />
          <div className="ml-6">
            <h1 className="text-3xl font-bold">{nickname}님, 반갑습니다.</h1>
            <p className="text-lg text-gray-700 mt-3">{description}</p>
            <div className="mt-5">
              <Link className="px-4 py-2 bg-point text-white rounded hover:bg-point-dark" href="/modifyprofile">
                내 정보 수정
              </Link>
            </div>
          </div>
        </div>
      </div>
      <LikeBakeryList />
    </div>
  );
};

export default MyPage;
