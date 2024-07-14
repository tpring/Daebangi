"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/supabase/client";
import { Bakery } from "@/types/bakery";
import { BakeryCard } from "../commons/BakeryCard";
import { bakeryItem } from "@/app/api/supabase/bakery/route";

type BakeryListProp = {
  searchedBakeries?: Bakery[];
};

export const BakeryList = ({ searchedBakeries }: BakeryListProp) => {
  const [breads, setBreads] = useState<Bakery[]>([]);

  useEffect(() => {
    if (searchedBakeries) {
      setBreads(searchedBakeries);
    } else {
      const fetchBreads = async () => {
        const data = await bakeryItem();
        setBreads((data as Bakery[]) || []);
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
