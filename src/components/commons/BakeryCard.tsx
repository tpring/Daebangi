import Image from "next/image";
import phone from "../../../public/image/icons/phone.png";

export default function BakeryCard() {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="bg-base max-w-xs border border-point rounded-lg p-4 shadow-md text-center">
          <div className="flex justify-center items-center">
            <Image
              className="p-2 "
              src="/image/breads/dummyData.jpg"
              alt="bread img"
              width={500}
              height={500}
            />
          </div>
          <div className="flex left text-lg font-bold text-black mt-2">
            성심당 대전역점
            {/* 좋아요 하트 자리 */}
            {/* <span className="felx left text-red-500 text-xl">❤️</span> */}
          </div>
          <div className="border-t border-point my-4"></div>
          <div className="flex left text-gray-700 text-md mt-2">
            <span className="flex left text-gray-700 text-lg align-middle flex items-center  inline-flex items-center mr-0.5">
              <Image src={phone} alt="phone icon" width={20} height={20} />
            </span>{" "}
            1588-8069
          </div>
          <div className="text-gray-700 text-sm mt-1 p-1 text-left">
            대전 동구 중앙로 215 대전역사 2F 1대전역 4번 출구에서 38m
          </div>
        </div>
      </div>
    </>
  );
}
