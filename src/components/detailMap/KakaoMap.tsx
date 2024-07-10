'use client';
import React, { useState, useEffect } from 'react';
import { Map, CustomOverlayMap } from 'react-kakao-maps-sdk';
import Image from 'next/image';
declare global {
    interface Window {
        kakao: any;
    }
}
// Define the types explicitly
type GeocoderResult = {
    address: {
        address_name: string;
    };
    road_address?: {
        address_name: string;
    };
    x: string;
    y: string;
};
type KakaoMapProps = {
    name: string;
    address: string;
};
// 카카오맵 스크립트를 동적으로 로드하는 함수
const loadKakaoMapScript = (kakaoMapKey: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (!kakaoMapKey) {
            reject(new Error('카카오 맵 API 키가 없습니다.'));
            return;
        }
        const scriptUrl = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapKey}&autoload=false&libraries=services`;
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.async = true;
        script.defer = true;
        script.onload = () => {
            if (window.kakao && window.kakao.maps) {
                window.kakao.maps.load(() => {
                    resolve();
                });
            } else {
                reject(new Error('카카오 맵 객체를 찾을 수 없습니다.'));
            }
        };
        script.onerror = () => {
            reject(new Error('카카오 맵 스크립트를 로드하는 데 실패했습니다.'));
        };
        document.head.appendChild(script);
    });
};
const KakaoMap: React.FC<KakaoMapProps> = ({ name, address }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const kakaoMapKey = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;
    useEffect(() => {
        if (!kakaoMapKey) {
            setError('카카오 맵 API 키가 없습니다.');
            return;
        }
        // 카카오맵 스크립트 로드
        loadKakaoMapScript(kakaoMapKey)
            .then(() => {
                setIsLoaded(true);
                searchAddressToCoords(address);
            })
            .catch(() => {
                setError('지도를 로드하는 데 실패했습니다.');
            });
    }, [kakaoMapKey, address]);
    // 주소를 좌표로 변환하는 함수
    const searchAddressToCoords = (address: string) => {
        if (!window.kakao || !window.kakao.maps) return;
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(address, (result: GeocoderResult[], status: string) => {
            if (status === window.kakao.maps.services.Status.OK) {
                const { y, x } = result[0];
                setCoords({ lat: parseFloat(y), lng: parseFloat(x) });
            } else {
                setError('주소를 찾을 수 없습니다.');
            }
        });
    };
    // 스켈레톤
    const SkeletonLoader = () => (
        <div className="w-full h-full bg-gray-100 animate-pulse my-5">
            <div className="w-full h-full bg-gray-300"></div>
        </div>
    );
    // 지도 로딩 중 표시
    if (!isLoaded || !coords) {
        return (
            <div className="w-full h-96 md:h-500 lg:h-600 my-5">
                <SkeletonLoader />
            </div>
        );
    }
    return (
        <div className="w-full h-96 md:h-500 lg:h-600 my-5">
            <Map
                center={coords} // 지도 중심 좌표 설정
                style={{ width: '100%', height: '100%' }} // 지도 크기 설정
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
