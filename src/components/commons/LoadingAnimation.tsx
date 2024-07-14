import Image from "next/image";

const LoadingAnimation = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#FAF2D4]">
      <div className="relative w-64 h-64 sm:w-96 sm:h-96 lg:w-128 lg:h-128">
        <Image src="/image/breads/LogoBread.png" alt="식빵" layout="fill" objectFit="contain" />
        <div className="absolute top-50 left-1/3 transform -translate-x-1/2 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 animate-smokeRise">
          <Image src="/image/breads/breadSmoke.png" alt="식빵 굽는 연기" layout="fill" objectFit="contain" />
        </div>
        <p className="font-secondary text-xl sm:text-3xl lg:text-4xl mt-2 text-center absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-full">
          식빵 굽는 중입니다...
        </p>
      </div>
    </div>
  );
};

export default LoadingAnimation;
