"use client";

import UpButton from "@/components/commons/UpButton";
import BouncingBread from "@/components/main/BouncingBread";
import searchBread from "../../../public/image/breads/searchBread.png";
import Image from "next/image";
import { useRouter } from "../../../node_modules/next/navigation";
import { useState, FormEvent } from "react";
import { BakeryList } from "@/components/BakeryList/BakeryList";

export default function Home() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  const search = () => {
    if (keyword.trim().length < 2) {
      alert("검색어를 2글자 이상 적어주세요.");
      return;
    }
    router.push(`/search?keyword=${keyword}`);
  };

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    search();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      search();
    }
  };

  return (
    <>
      <BouncingBread />

      <div className="relative">
        <div className="flex justify-center items-center h-60">
          <div className="flex relative w-full max-w-2xl items-center ">
            <input
              className="w-full p-4 pl-10 pr-20 rounded-full border border-point text-2xl h-12 flex items-center font-secondary focus:outline-none"
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="어떤 대빵이가 궁금하니?"
            />
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2" onClick={handleSearch}>
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
