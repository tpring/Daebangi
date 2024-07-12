"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/supabase/client";
import { BakeryCard } from "../commons/BakeryCard";
import Link from "next/link";
import { Bakery } from "@/types/bakery";

interface BakeryListProp {
  searchedBakeries?: Bakery[];
}

export const BakeryList = ({ searchedBakeries }: BakeryListProp) => {
  const [breads, setBreads] = useState<Bakery[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (searchedBakeries) {
      setBreads(searchedBakeries);
    } else {
      const supabase = createClient();
      const fetchBreads = async () => {
        try {
         const { data,error } = await supabase.from("bakery").select("*").order("sort_id", { ascending: true });
     
          if (error) {
            throw new Error(error.message);
          }
          setBreads((data as Bakery[]) || []);
        } catch (error) {
          setError("목록을 불러오는 중 오류가 발생했습니다.");
          console.error(error);
        }
      };
      fetchBreads();
    }
  }, [searchedBakeries]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {breads.map((bakery) => (
        <Link href={`/detail/${bakery.bakery_id}`} key={bakery.bakery_id} passHref>
          <div>
            <BakeryCard
              bakeryId={bakery.bakery_id}
              image={bakery.image}
              name={bakery.name}
              phone={bakery.phone}
              address={bakery.address}
            />
          </div>
        </Link>
      ))}
    </div>
  );
};
