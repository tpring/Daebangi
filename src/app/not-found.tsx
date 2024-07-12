import React from "react";
import Image from "next/image";
import Link from "next/link";

const NotFound: React.FC = () => {
  const headerHeight = 70;

  return (
    <div
      className="flex flex-col items-center justify-center bg-base overflow-hidden"
      style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}
    >
      <div className="text-center">
        <Image src="/image/404.png" alt="404 이미지" width={320} height={320} className="mx-auto" />
        <Link href="/" className="text-point text-subtitle hover:underline mt-4 block font-secondary">
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
