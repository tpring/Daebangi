"use client";

import { useRouter } from "next/navigation";
import { BakeryList } from "@/components/BakeryList/BakeryList";
import BouncingBread from "@/components/main/BouncingBread";
import UpButton from "@/components/commons/UpButton";
import SearchBar from "@/components/commons/SearchBar";

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
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="flex justify-center items-center">
          <BakeryList />
        </div>
      </div>
      <UpButton />
    </>
  );
}
