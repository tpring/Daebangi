"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/supabase/client";
import { BakeryCard } from "../commons/BakeryCard";
import { useUserStore } from "@/store/userStore";
import Link from "next/link";

type Bakery = {
  bakery_id: string;
  name: string;
  image: string;
  phone: string;
  address: string;
};

export const LikeBakeryList = () => {
  const [bakeryList, setBakeryList] = useState<Bakery[]>([]);
  const [likesChanged, setLikesChanged] = useState(false);
  const supabase = createClient();
  const { userId } = useUserStore((state) => ({
    userId: state.userId as string,
  }));

  const fetchBakeryData = async () => {
    try {
      const { data: likeData, error: likeError } = await supabase
        .from("like")
        .select("bakery_id")
        .eq("user_id", userId);

      if (likeError) throw likeError;

      const bakeryIds = likeData?.map((row: any) => row.bakery_id).filter((id: any) => id !== null) || [];

      if (bakeryIds.length > 0) {
        const { data: bakeryData, error: bakeryError } = await supabase
          .from("bakery")
          .select("bakery_id, name, image, phone, address")
          .in("bakery_id", bakeryIds)
          .order("sort_id", { ascending: true });

        if (bakeryError) throw bakeryError;

        const formattedBakeryData: Bakery[] = (bakeryData || []).map((item: any) => ({
          bakery_id: item.bakery_id,
          name: item.name || "",
          image: item.image || "",
          phone: item.phone || "",
          address: item.address || "",
        }));

        setBakeryList(formattedBakeryData);
      } else {
        setBakeryList([]);
      }
    } catch (error) {
      console.error("데이터를 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchBakeryData();
  }, [userId, likesChanged]);

  return (
    <div className="grid grid-cols-1 sm-max:grid-cols-1 sm:grid-cols-2 custom-lg:grid-cols-3 gap-8">
      {bakeryList.length > 0 ? (
        bakeryList.map((bakery) => (
          <div key={bakery.bakery_id} className="col-span-1">
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
              <BakeryCard
                bakeryId={bakery.bakery_id}
                name={bakery.name}
                image={bakery.image}
                phone={bakery.phone}
                address={bakery.address}
              />
            </Link>
          </div>
        ))
      ) : (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">좋아하는 가게를 추가해주세요</h2>
        </div>
      )}
    </div>
  );
};
