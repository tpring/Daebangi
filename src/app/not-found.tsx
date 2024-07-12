import React from "react";
import Image from "next/image";
import Link from "next/link";

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[#FBF8EE]">
      <div className="text-center">
        <Image src="/image/404.png" alt="404 이미지" width={400} height={400} className="mx-auto" />
        <Link href="/" className="text-point hover:underline mt-4 block font-secondary">
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
