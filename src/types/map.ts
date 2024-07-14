export type GeocoderResult = {
  address: {
    address_name: string;
  };
  road_address?: {
    address_name: string;
  };
  x: string;
  y: string;
};

export type KakaoMapProps = {
  name: string;
  address: string;
};

export type WindowWithKakao = Window & {
  kakao: any;
};

export type StoreInformationProps = {
  bakeryId: string;
  name: string | null;
  address: string | null;
  image: string | null;
  phone: string | null;
};
