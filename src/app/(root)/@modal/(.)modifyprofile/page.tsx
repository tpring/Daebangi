"use client";
import Link from "next/link";
import type { Config } from 'tailwindcss';

//modifyprofile의 페이지를 인터셉트 하는 페이지 입니다.
// 모달창
export default function Page() {

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-3 w-70 max-w">
                <h2 className="text-2xl font-bold mb-4 text-center">프로필 수정</h2>
                <div className="flex justify-center">
                    <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
                        <p className="font-secondary">사진 넣을거임</p>
                    </div>
                </div>
                <div className="mt-4 flex flex-col">
                    <div className="flex justify-between items-center">
                        <p>닉네임</p>
                        <input className="shared-input" type="text" />
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <p>소개</p>
                        <input className="shared-input" type="text" />
                    </div>
                    <div className="flex justify-end mt-4">
                        <Link className="font-secondary" href="/mypage">프로필 수정 완료</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}