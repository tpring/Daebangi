'use client';

import React, { useState, useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

declare global {
    interface Window {
        kakao: any;
    }
}

type KakaoMapProps = {
    name: string;
    x: number;
    y: number;
};

// 카카오맵 스크립트를 동적으로 로드하는 함수
const loadKakaoMapScript = (kakaoMapKey: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (!kakaoMapKey) {
            reject(new Error('카카오 맵 API 키가 없습니다.'));
            return;
        }

        const scriptUrl = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapKey}&autoload=false`;
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

const KakaoMap: React.FC<KakaoMapProps> = ({ name, x, y }) => {
    const [isLoaded, setIsLoaded] = useState(false);
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
            })
            .catch((err) => {
                console.error(err);
                setError('지도를 로드하는 데 실패했습니다.');
            });
    }, [kakaoMapKey]);

    // 지도 로딩 중 표시
    if (!isLoaded) {
        return (
            <div className="w-full h-96 flex items-center justify-center bg-gray-100">
                <p className="text-lg font-semibold text-gray-600">로딩중...</p>
            </div>
        );
    }

    console.log('x,y 좌표:', x, y);

    // 지도 렌더링
    return (
        <div className="w-full h-96 md:h-500 lg:h-600">
            <Map
                center={{ lat: y, lng: x }} // 지도 중심 좌표 설정
                style={{ width: '100%', height: '100%' }} // 지도 크기 설정
                level={4} // 지도 확대 레벨
                onCreate={(map) => console.log('지도 생성됨:', map)} // 생성 시 로그
                onError={(error: React.SyntheticEvent) => console.error('지도 오류:', error)} // 오류 시 로그
            >
                <MapMarker
                    position={{ lat: y, lng: x }} // 마커 위치
                    title={name} // 마커 제목
                    onClick={() => alert(`${name} 클릭됨`)} // 마커 클릭 이벤트
                />
            </Map>
        </div>
    );
};

export default KakaoMap;
