import BakeryCard from "../../components/commons/BakeryCard";
import searchBread from "../../../public/image/breads/searchBread.png";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="bg-main py-20 text-center text-2xl font-bold">
        애니메이션
      </div>
      <div className="relative">
        <div className="w-screen flex justify-center items-center h-60">
          <div className="flex relative w-full max-w-2xl items-center ">
            <input
              className="w-full p-4 pl-10 pr-20 rounded-full border border-point text-2xl h-12 flex items-center font-secondary focus:outline-none"
              type="text"
              placeholder="어떤 대빵이가 궁금하니?"
            />
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <Image
                src={searchBread}
                alt="search bread"
                width={40}
                height={40}
              />
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <BakeryCard />
            <BakeryCard />
            <BakeryCard />
            <BakeryCard />
            <BakeryCard />
            <BakeryCard />
          </div>
        </div>
      </div>
    </>
  );
}
