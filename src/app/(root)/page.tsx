"use client";

import { BakeryList } from "@/components/BakeryList/BakeryList";
import SearchBar from "@/components/commons/SearchBar";
import UpButton from "@/components/commons/UpButton";
import BouncingBread from "@/components/main/BouncingBread";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleSearch = (keyword: string) => {
    router.push(`/search?keyword=${keyword}`);
  };

  return (
    <>
      <BouncingBread />
      <div className="relative">
        <div className="flex justify-center items-center h-60">
          {/* 이부분은 값을 찾아서 다른 페이지로 넘깁니다. */}
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="flex justify-center items-center">
          {/* 이부분은 props가 있지만 없었습니다. */}
          <BakeryList />
        </div>
      </div>
      <UpButton />
    </>
  );
}
