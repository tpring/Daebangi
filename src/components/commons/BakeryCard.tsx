"use client";

import Image from "next/image";
import phoneIcon from "../../../public/image/icons/phone.png";
import defaultImg from "../../../public/image/noimg.png";
import LikeButton from "./LikeButton";

type BakeryCardProps = {
  bakeryId: string;
  name: string;
  image: string;
  phone: string;
  address: string;
};

export const BakeryCard: React.FC<BakeryCardProps> = ({ bakeryId, image, name, phone, address }) => {
  return (
    <div className="flex justify-center items-center ">
      <div className="bg-base min-w-[320px] max-w-xs border border-point rounded-lg p-4 shadow-md text-center overflow-hidden min-h-80 h-[490px]">
        <div className="flex justify-center items-center min-h-80">
          <div className="w-[310px] h-[310px] mb-3 overflow-hidden">
            <Image
              className="w-full h-full object-cover"
              src={image || defaultImg}
              alt="bread img"
              width={500}
              height={500}
            />
          </div>
        </div>
        <div className="flex justify-between items-center text-lg font-bold text-black mt-2">
          {name}
          <span className="flex left text-red-500 text-xl">
            <LikeButton bakeryId={bakeryId} />
          </span>
        </div>
        <div className="border-t border-point my-4"></div>
        <div className="flex left text-gray-700 text-md mt-2">
          <span className="left text-gray-700 text-lg align-middle items-center inline-flex mr-0.5">
            <span className="mr-2">
              <Image src={phoneIcon} alt="phone icon" width={20} height={20} />
            </span>
          </span>
          {phone ? phone : "매장번호 미제공"}
        </div>
        <div className="text-gray-700 text-sm mt-1 p-1 text-left truncate">{address}</div>
      </div>
    </div>
  );
};
