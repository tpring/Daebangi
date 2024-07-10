export const loadKakaoMapScript = (kakaoMapKey: string): Promise<void> => {
    if (!kakaoMapKey) {
        console.error('카카오 맵 API 키가 없습니다.');
        return Promise.reject(new Error('카카오 맵 API 키가 없습니다.'));
    }

    const scriptUrl = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapKey}&autoload=false`;

    return new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.async = true; // 비동기로 스크립트 로드
        script.defer = true; // 스크립트가 늦게 로드되도록 설정

        // 스크립트가 로드되었을 때 실행되는 함수
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

        // 스크립트 로드 중 에러가 발생했을 때 실행되는 함수
        script.onerror = (event: unknown) => {
            if (typeof event === 'string') {
                console.error('스크립트 로드 오류:', event); //
                reject(new Error(`카카오 맵 스크립트를 로드하는 데 실패했습니다: ${event}`));
            } else {
                console.error('스크립트 로드 오류:', event);
                reject(new Error('카카오 맵 스크립트를 로드하는 데 실패했습니다.'));
            }
        };

        document.head.appendChild(script); // 스크립트를 문서의 head에 추가
    });
};
