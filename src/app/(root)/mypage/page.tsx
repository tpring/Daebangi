"use client"

// import BakeryCard from "../../../components/commons/BakeryCard";
import Link from "next/link";

const MyPage = () => {
    return (
        <div className="reactive-body mx-auto w-main-desktop md-max:w-main-tablet sm-max:w-main-mobile">
            <div className="flex items-center flex-col md:flex-row justify-between">
                <div className="flex items-center">
                    <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
                        <p>사진 넣을거임</p>
                    </div>
                    <div className="ml-6">
                        <h1 className="text-3xl font-bold">임금님 반갑습니다.</h1>
                        <Link href="/modifyprofile">내 정보 수정</Link>
                    </div>
                </div>
            </div>
            <h2>좋아요 목록</h2>
            <div className="reactive-body mx-auto grid grid-cols-3">
                {/* <BakeryCard /> */}
            </div>
        </div>
    );
};

export default MyPage;
