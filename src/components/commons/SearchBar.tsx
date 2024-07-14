"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import searchBread from "../../../public/image/breads/searchBread.png";
import { SearchBarProps } from "@/types/search";

const SearchBar: React.FC<SearchBarProps> = ({ initialKeyword = "", onSearch }) => {
  const router = useRouter();
  const [keyword, setKeyword] = useState(initialKeyword);

  const search = () => {
    if (keyword.trim().length < 2) {
      alert("검색어를 2글자 이상 적어주세요.");
      return;
    }
    if (onSearch) {
      onSearch(keyword);
    } else {
      router.push(`/search?keyword=${keyword}`);
    }
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
    <div className="flex relative w-full max-w-2xl items-center ">
      <input
        className="w-full p-4 pl-10 pr-20 rounded-full  border-2 border-point text-2xl h-12 flex items-center font-secondary focus:outline-none"
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
  );
};

export default SearchBar;
