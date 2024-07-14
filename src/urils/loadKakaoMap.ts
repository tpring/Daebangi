import { WindowWithKakao } from "@/types/map";

export const loadKakaoMapScript = (kakaoMapKey: string): Promise<void> => {
  const scriptUrl = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapKey}&autoload=false&libraries=services`;

  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = scriptUrl;
    script.async = true; // 비동기 로드
    script.defer = true; // 지연 로드

    script.onload = () => {
      const windowWithKakao = window as WindowWithKakao;
      if (windowWithKakao.kakao && windowWithKakao.kakao.maps) {
        windowWithKakao.kakao.maps.load(() => {
          resolve();
        });
      } else {
        console.error("카카오 맵 객체를 찾을 수 없습니다.");
        reject(new Error("카카오 맵을 로드하는 데 실패했습니다."));
      }
    };

    script.onerror = () => {
      console.error("카카오 맵 스크립트를 로드하는 데 실패했습니다.");
      reject(new Error("카카오 맵 스크립트를 로드하는 데 실패했습니다."));
    };

    document.head.appendChild(script);
  });
};
