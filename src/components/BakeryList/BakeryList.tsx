"use client";

type Bakery = {
  bakery_id: UUID;
  name: string;
  image: string;
  phone: number;
  address: string;
};

import { useEffect, useState } from "react";
import { createClient } from "@/supabase/client";
import { UUID } from "crypto";
import { BakeryCard } from "../commons/BakeryCard";

export const BakeryList = () => {
  const [breads, setBreads] = useState<Bakery[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchBreads = async () => {
      const { data } = await supabase.from<Bakery>("bakery").select("*");
      return data;
    };
    setBreads;
  }, []);

  return (
    <div>
      {breads.map((bakery) => (
        <div key={bakery.bakery_id}>
          <BakeryCard
            image={bakery.image}
            name={bakery.name}
            phone={bakery.phone}
            address={bakery.address}
          />
        </div>
      ))}
    </div>
  );
};
