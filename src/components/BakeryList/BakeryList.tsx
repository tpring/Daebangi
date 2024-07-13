"use client";

import { createClient } from "@/supabase/client";
import { Bakery } from "@/types/bakery";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BakeryCard } from "../commons/BakeryCard";

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
          const { data, error } = await supabase.from("bakery").select("*").order("sort_id", { ascending: true });

          if (error) {
            throw new Error(error.message);
          }
          setBreads((data as Bakery[]) || []);
        } catch (error) {
          console.error("목록을 불러오는 중 오류가 발생했습니다.", error);
        }
      };
      fetchBreads();
    }
  }, [searchedBakeries]);

  return (
    <div className="grid grid-cols-1 sm-max:grid-cols-1 sm:grid-cols-2 custom-lg:grid-cols-3 gap-8 p-4">
      {breads.map((bakery) => (
        <Link href={`/detail/${bakery.bakery_id}`} key={bakery.bakery_id} passHref>
          <div className="col-span-1">
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
