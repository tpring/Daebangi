"use client";

import searchBread from "../../../../public/image/breads/searchBread.png";
import Image from "next/image";
import {
  useRouter,
  useSearchParams,
} from "../../../../node_modules/next/navigation";
import { useEffect, useState, FormEvent } from "react";
import { BakeryList } from "@/components/BakeryList/BakeryList";
import { searchBakery } from "@/app/api/(supabase)/(bakery)/route";

type Bakery = {
  bakery_id: string;
  name: string;
  image: string;
  phone: string;
  address: string;
};

const SearchPage = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [initialKeyword, setInitialKeyword] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [searchResults, setSearchResults] = useState<Bakery[]>([]);

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

  const searchParams = useSearchParams();
  const searchedKeyword = searchParams.get("keyword");

  useEffect(() => {
    if (searchedKeyword) {
      setKeyword(searchedKeyword);
      setInitialKeyword(searchedKeyword);
    }
  }, [searchedKeyword]);

  useEffect(() => {
    const fetchData = async () => {
      if (searchedKeyword) {
        try {
          const results = await searchBakery(searchedKeyword);
          setSearchResults(results as Bakery[]);
          setNoResults(results.length === 0);
        } catch (error) {
          console.error(error);
          setNoResults(true);
        }
      }
    };
    fetchData();
  }, [searchedKeyword]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <>
      <div className="relative">
        <div className="w-screen flex justify-center items-center h-60">
          <div className="flex relative w-full max-w-2xl items-center ">
            <input
              className="w-full p-4 pl-10 pr-20 rounded-full border border-point text-2xl h-12 flex items-center font-secondary focus:outline-none"
              type="text"
              value={keyword}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="어떤 대빵이가 궁금하니?"
            />
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
              onClick={handleSearch}
            >
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
          {noResults ? (
            <p>검색 결과가 없습니다.</p>
          ) : (
            <div className="flex flex-col items-center">
              <p className="mb-8">총 {searchResults.length}건</p>
              <BakeryList searchedBakeries={searchResults} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
