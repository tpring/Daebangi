"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BakeryList } from "@/components/BakeryList/BakeryList";
import { searchBakery } from "@/app/api/(supabase)/(bakery)/route";
import SearchBar from "@/components/commons/SearchBar";
import { Bakery } from "@/types/bakery";

const SearchPage = () => {
  const router = useRouter();
  const [noResults, setNoResults] = useState(false);
  const [searchResults, setSearchResults] = useState<Bakery[]>([]);

  const searchParams = useSearchParams();
  const searchedKeyword = searchParams.get("keyword");

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

  const handleSearch = (keyword: string) => {
    router.push(`/search?keyword=${keyword}`);
  };

  return (
    <>
      <div className="relative">
        <div className="w-screen flex justify-center items-center h-60">
          <SearchBar initialKeyword={searchedKeyword || ""} onSearch={handleSearch} />
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
