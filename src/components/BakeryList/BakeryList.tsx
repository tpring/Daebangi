"use client";

type Bakery = {
  bakery_id: string;
  name: string;
  image: string;
  phone: string;
  address: string;
};


import { useEffect, useState } from "react";
import { createClient } from "@/supabase/client";
import { BakeryCard } from "../commons/BakeryCard";
import Link from "next/link";

export const BakeryList = () => {
  const [breads, setBreads] = useState<Bakery[]>([]);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const supabase = createClient();
    const fetchBreads = async () => {

      try {
        const { data } = await supabase.from("bakery").select("*");
        setBreads((data as Bakery[]) || []);
      } catch (error) {
        setError("목록을 불러오는 중 오류가 발생했습니다.");
        console.error(error);
      }

    };
    fetchBreads();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {breads.map((bakery) => (
        <Link
          href={{
            pathname: `/detail/${bakery.bakery_id}`,
            query: {
              name: bakery.name,
              address: bakery.address,
              image: bakery.image,
              phone: bakery.phone,
              bakeryId: bakery.bakery_id,
            },
          }}
          key={bakery.bakery_id}
          passHref
        >
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
