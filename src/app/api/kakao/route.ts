import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const loadKakaoMapScript = (kakaoMapKey: string): Promise<void> => {
    if (!kakaoMapKey) {
        console.error('카카오 맵 API 키가 없습니다.');
        return Promise.reject(new Error('카카오 맵 API 키가 없습니다.'));
    }

    const scriptUrl = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapKey}&autoload=false`;
    console.log('스크립트 URL:', scriptUrl);

    return new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.async = true;
        script.defer = true;

        script.onload = () => {
            console.log('스크립트가 로드되었습니다.');
            if (window.kakao && window.kakao.maps) {
                window.kakao.maps.load(() => {
                    console.log('카카오 맵이 초기화되었습니다.');
                    resolve();
                });
            } else {
                console.error('카카오 맵 객체를 찾을 수 없습니다.');
                reject(new Error('카카오 맵을 로드하는 데 실패했습니다.'));
            }
        };

        script.onerror = (event) => {
            console.error('스크립트 로드 오류:', event);
            reject(new Error('카카오 맵 스크립트를 로드하는 데 실패했습니다.'));
        };

        document.head.appendChild(script);
    });
};

export const fetchBakeryLocations = async () => {
    const { data, error } = await supabase.from('bakery').select('name, address');
    if (error) {
        console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
        return [];
    }

    const locationsWithCoordinates = await Promise.all(
        data.map(async (bakery) => {
            const response = await fetch(
                `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
                    bakery.address
                )}&appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}`
            );
            const result = await response.json();
            if (result.documents && result.documents.length > 0) {
                const { x, y } = result.documents[0];
                return {
                    name: bakery.name,
                    x: parseFloat(x),
                    y: parseFloat(y),
                };
            }
            return null;
        })
    );

    return locationsWithCoordinates.filter((location) => location !== null);
};
