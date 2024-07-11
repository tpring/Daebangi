"use client"

import Link from "next/link";
import { useUserStore } from "@/store/userStore";
import { createClient } from '../../../supabase/client';
import Image from 'next/image';

const MyPage = () => {
    const supabase = createClient()
    const { userId, email, nickname, profile } = useUserStore((state) => ({
        userId: state.userId as string,
        email: state.email,
        nickname: state.nickname,
        profile: state.profile,
    }));

    return (
        <div className="reactive-body mx-auto w-main-desktop md-max:w-main-tablet sm-max:w-main-mobile">
            <div className="flex items-center flex-col md:flex-row justify-between">
                <div className="flex items-center">
                    <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
                        <Image src={profile || ''} alt="Profile" width={100} height={100} className="w-full h-full rounded-full" />
                    </div>
                    <div className="ml-6">
                        <h1 className="text-3xl font-bold">{nickname}님, 반갑습니다.</h1>
                        <Link href="/modifyprofile">내 정보 수정</Link>
                    </div>
                </div>
            </div>
            <h2>좋아요 목록</h2>
            <div className="reactive-body mx-auto grid grid-cols-3">
            </div>
        </div>
    );
};

export default MyPage;
