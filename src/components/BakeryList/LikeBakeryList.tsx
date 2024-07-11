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
      // `like` 테이블에서 `user_id`에 해당하는 `bakery_id` 가져오기
      const { data: likeData, error: likeError } = await supabase
        .from("like")
        .select("bakery_id")
        .eq("user_id", userId);

      if (likeError) throw likeError;

      // null 값이 없는 bakery_id 배열을 추출
      const bakeryIds = likeData?.map((row: any) => row.bakery_id).filter((id: any) => id !== null) || [];

      if (bakeryIds.length > 0) {
        // `bakery` 테이블에서 `bakery_id`에 해당하는 정보를 가져오기
        const { data: bakeryData, error: bakeryError } = await supabase
          .from("bakery")
          .select("bakery_id, name, image, phone, address")
          .in("bakery_id", bakeryIds);

        if (bakeryError) throw bakeryError;

        // `bakeryData`를 `Bakery` 타입으로 변환
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
    <div className="reactive-body mx-auto grid grid-cols-3 gap-4 mt-6">
      {bakeryList.length > 0 ? (
        bakeryList.map((bakery) => (
          <div key={bakery.bakery_id} className="relative">
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
        <div className="mt-6 text-center">
          <h2 className="text-xl font-semibold">좋아하는 가게를 추가해주세요</h2>
        </div>
      )}
    </div>
  );
};
