import CommentList from "@/components/comment/CommentList";
import SkeletonMap from "@/components/commons/Skeleton/SkeletonMap";
import StoreInformation from "@/components/detailMap/StoreInformation";
import dynamic from "next/dynamic";
import React from "react";
const KakaoMap = dynamic(() => import("@/components/detailMap/KakaoMap"), {
  ssr: false,
  loading: () => <SkeletonMap />,
});
type DetailPageProps = {
  searchParams: {
    name: string;
    address: string;
    bakeryId: string;
    image: string;
    phone: string;
  };
};
const DetailPage: React.FC<DetailPageProps> = ({ searchParams }) => {
  const { name, address, bakeryId, image, phone } = searchParams;
  return (
    <div className="reactive-body mx-auto space-y-8">
      {name && address ? <KakaoMap name={name} address={address} /> : <SkeletonMap />}
      <StoreInformation bakeryId={bakeryId} name={name} address={address} image={image} phone={phone} />
      <CommentList bakery_id={bakeryId} />
    </div>
  );
};
export default DetailPage;
