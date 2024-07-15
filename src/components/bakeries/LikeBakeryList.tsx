"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useUserStore } from "@/store/userStore";
import { getUserLikedBakeryIds } from "@/lib/api/like/route";
import { Bakery } from "@/types/bakery";
import { getBakeriesByIds } from "@/lib/api/bakery/route";
import { BakeryCard } from "./BakeryCard";

export const LikeBakeryList = () => {
  const [bakeryList, setBakeryList] = useState<Bakery[]>([]);
  const { userId, likesChanged, setLikesChanged } = useUserStore((state) => ({
    userId: state.userId as string,
    likesChanged: state.likesChanged,
    setLikesChanged: state.setLikesChanged,
  }));

  const fetchBakeryData = async () => {
    try {
      // `userId`를 사용하여 좋아요한 bakery의 ID 리스트를 가져오기
      const bakeryIds = await getUserLikedBakeryIds(userId);

      if (bakeryIds.length > 0) {
        // `bakeryIds`를 사용하여 bakery 데이터를 가져오기
        const bakeryData = await getBakeriesByIds(bakeryIds);
        const formattedBakeryData: Bakery[] = (bakeryData || []).map((item: any) => ({
          bakery_id: item.bakery_id,
          name: item.name || "",
          image: item.image || "",
          phone: item.phone || "",
          address: item.address || "",
          comment_count: item.comment_count || 0,
        }));

        setBakeryList(formattedBakeryData);
      } else {
        setBakeryList([]);
      }
    } catch (error) {
      console.error("데이터를 가져오는 중 오류 발생:", error);
    } finally {
      setLikesChanged(false);
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
              passHref
            >
              <BakeryCard
                bakeryId={bakery.bakery_id}
                name={bakery.name}
                image={bakery.image}
                phone={bakery.phone}
                address={bakery.address}
                commentCount={bakery.comment_count || 0}
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
