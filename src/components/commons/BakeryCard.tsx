"use client";

type BakeryCard = {
  name: string;
  image: string;
  phone: number;
  address: string;
};

import Image from "next/image";
import phone from "../../../public/image/icons/phone.png";
import LikeButton from "./LikeButton";
import { useEffect, useState } from "react";
import { createClient } from "@/supabase/client";

export const BakeryCard = ({ image, name, phone, address }: BakeryCard) => {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="bg-base max-w-xs border border-point rounded-lg p-4 shadow-md text-center">
          <div className="flex justify-center items-center">
            <Image
              className="p-2 "
              src={image}
              alt="bread img"
              width={500}
              height={500}
            />
          </div>
          <div className="flex justify-between items-center text-lg font-bold text-black mt-2">
            {name}
            <span className="felx left text-red-500 text-xl">
              <LikeButton />
            </span>
          </div>
          <div className="border-t border-point my-4"></div>
          <div className="flex left text-gray-700 text-md mt-2">
            <span className="flex left text-gray-700 text-lg align-middle flex items-center  inline-flex mr-0.5">
              <span className="mr-2">
                {/* <Image src={phone} alt="phone icon" width={20} height={20} /> */}
              </span>{" "}
            </span>
            1588-8069
          </div>
          <div className="text-gray-700 text-sm mt-1 p-1 text-left">
            {address}
          </div>
        </div>
      </div>
    </>
  );
};
