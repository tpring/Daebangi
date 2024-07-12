"use client";

import Link from "next/link";
import { useUserStore } from "@/store/userStore";
import Image from "next/image";
import { LikeBakeryList } from "@/components/BakeryList/LikeBakeryList";
import LogoBread from "../../../../public/image/breads/LogoBread.png";

const MyPage = () => {
    const { nickname, profile, description } = useUserStore((state) => ({
        nickname: state.nickname,
        profile: state.profile,
        description: state.description
    }));

    return (
        <div className="reactive-body mx-auto w-main-desktop md-max:w-main-tablet sm-max:w-main-mobile">
            <div className="flex items-center flex-col md:flex-row justify-between">
                <div className="flex items-center">
                    <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
                        <Image
                            src={profile || LogoBread.src}
                            alt="Profile"
                            width={100}
                            height={100}
                            className="w-full h-full rounded-full"
                        />
                    </div>
                    <div className="ml-6">
                        <h1 className="text-3xl font-bold">{nickname}님, 반갑습니다.</h1>
                        <p className="text-3xl font-bold">{description}</p>
                        <Link href="/modifyprofile">내 정보 수정</Link>
                    </div>
                </div>
            </div>

            <LikeBakeryList />
        </div>
    );
};

export default MyPage;
