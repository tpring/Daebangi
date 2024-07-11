import searchBread from "../../../public/image/breads/searchBread.png";
import Image from "next/image";
import { BakeryList } from "@/components/BakeryList/BakeryList";
import UpButton from "@/components/commons/UpButton";
import BreadRain from "@/components/main/BouncingBread";

export default function Home() {
  return (
    <>
      <BreadRain />
      <div className="relative">
        <div className="w-screen flex justify-center items-center h-60">
          <div className="flex relative w-full max-w-2xl items-center ">
            <input
              className="w-full p-4 pl-10 pr-20 rounded-full border border-point text-2xl h-12 flex items-center font-secondary focus:outline-none"
              type="text"
              placeholder="어떤 대빵이가 궁금하니?"
            />
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <Image src={searchBread} alt="search bread" width={40} height={40} />
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <BakeryList />
        </div>
      </div>
      <UpButton />
    </>
  );
}
