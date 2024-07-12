"use client";

import { loadKakaoMapScript } from "@/app/api/kakao/route";
import SkeletonMap from "@/components/commons/Skeleton/SkeletonMap";
import { GeocoderResult, KakaoMapProps, WindowWithKakao } from "@/types/map";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CustomOverlayMap, Map } from "react-kakao-maps-sdk";

const KakaoMap: React.FC<KakaoMapProps> = ({ name, address }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const kakaoMapKey = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;

  useEffect(() => {
    if (!kakaoMapKey) {
      setError("카카오 맵 API 키가 유효하지 않습니다.");
      return;
    }
    loadKakaoMapScript(kakaoMapKey)
      .then(() => {
        setIsLoaded(true);
        searchAddressToCoords(address);
      })
      .catch(() => {
        setError("지도를 로드하는 데 실패했습니다.");
      });
  }, [kakaoMapKey, address]);

  const searchAddressToCoords = (address: string) => {
    const windowWithKakao = window as WindowWithKakao;
    if (!windowWithKakao.kakao || !windowWithKakao.kakao.maps) return;
    const geocoder = new windowWithKakao.kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, (result: GeocoderResult[], status: string) => {
      if (status === windowWithKakao.kakao.maps.services.Status.OK) {
        const { y, x } = result[0];
        setCoords({ lat: parseFloat(y), lng: parseFloat(x) });
      } else {
        setError("주소를 찾을 수 없습니다.");
      }
    });
  };

  if (!isLoaded || !coords) {
    return (
      <div className="w-full h-96 md:h-500 lg:h-600 my-5">
        <SkeletonMap />
      </div>
    );
  }

  return (
    <div className="w-full h-96 md:h-500 lg:h-600 my-5">
      <Map
        center={coords} // 지도 중심 좌표 설정
        style={{ width: "100%", height: "100%" }}
        level={4} // 지도 확대 레벨
      >
        <CustomOverlayMap
          position={coords} // 오버레이 위치
          yAnchor={1} // 오버레이의 Y 축 앵커 위치
          xAnchor={0.5} // 오버레이의 X 축 앵커 위치
        >
          <div className="p-0 border-none text-center">
            <Image src="/image/icons/marker.png" alt={name} width={140} height={140} />
            <p className="m-0 text-[18px] font-bold bg-base p-1 font-secondary">{name}</p>
          </div>
        </CustomOverlayMap>
      </Map>
    </div>
  );
};

export default KakaoMap;
