'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { loadKakaoMapScript } from '@/app/api/kakao/route';

const KakaoMap = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [location, setLocation] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (!router.isReady) return;

        const { name, x, y } = router.query;
        if (name && x && y) {
            setLocation({
                name: name as string,
                x: parseFloat(x as string),
                y: parseFloat(y as string),
            });
        }
    }, [router.isReady, router.query]);

    useEffect(() => {
        const kakaoMapKey = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;
        if (!kakaoMapKey) return;

        loadKakaoMapScript(kakaoMapKey)
            .then(() => setIsLoaded(true))
            .catch(console.error);
    }, []);

    if (!isLoaded || !location) return <div>로딩 중...</div>;

    return (
        <Map center={{ lat: location.y, lng: location.x }} style={{ width: '100%', height: '400px' }}>
            <MapMarker
                position={{ lat: location.y, lng: location.x }}
                clickable={true}
                onClick={() => alert(`${location.name} 클릭됨`)}
            />
        </Map>
    );
};

export default KakaoMap;
