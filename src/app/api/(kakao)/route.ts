export const loadKakaoMapScript = (kakaoMapKey: string): Promise<void> => {
    const scriptUrl = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapKey}&autoload=false`;

    return new Promise<void>((resolve, reject) => {
        // 스크립트 엘리먼트를 생성하고 속성 설정
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.async = true; // 비동기 로드
        script.defer = true; // 지연 로드

        // 스크립트 로드 성공 시 실행
        script.onload = () => {
            // 카카오 맵 객체가 있는지 확인
            if (window.kakao && window.kakao.maps) {
                window.kakao.maps.load(() => {
                    resolve();
                });
            } else {
                reject(new Error('카카오 맵을 로드하는 데 실패했습니다.'));
            }
        };

        // 스크립트 로드 실패 시 실행
        script.onerror = () => {
            reject(new Error('카카오 맵 스크립트를 로드하는 데 실패했습니다.'));
        };

        // 문서의 head에 스크립트 추가
        document.head.appendChild(script);
    });
};
