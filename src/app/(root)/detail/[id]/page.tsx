import { fetchBakeryDetails } from "@/app/api/supabase/(detail)/route";
import CommentList from "@/components/comment/CommentList";
import SkeletonMap from "@/components/commons/Skeleton/SkeletonMap";
import StoreInformation from "@/components/detailMap/StoreInformation";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound, redirect } from "next/navigation";

// 동적 메타데이터 생성 함수
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = params;
  const bakery = await fetchBakeryDetails(id);
  if (!bakery) {
    return {
      title: "대전 빵집 정보를 찾을 수 없습니다",
      description: "해당 빵집 정보를 찾을 수 없습니다.",
      keywords: ["빵집", "Bakery", "베이커리", "디저트", "react", "next.js", "프론트앤드개발자"],
      authors: [
        { name: "신자영" },
        { name: "김민곤" },
        { name: "천다연" },
        { name: "김택수" },
        { name: "윤희수" },
        { name: "이보아" },
      ],
    };
  }

  return {
    title: `대빵이 - ${bakery.name}`,
    description: `${bakery.name} - 대전 빵집의 정보가 담긴 페이지입니다.`,
    keywords: ["빵집", "Bakery", "베이커리", "디저트", "react", "next.js", "프론트앤드개발자"],
    authors: [
      { name: "신자영" },
      { name: "김민곤" },
      { name: "천다연" },
      { name: "김택수" },
      { name: "윤희수" },
      { name: "이보아" },
    ],
  };
}

const KakaoMap = dynamic(() => import("@/components/detailMap/KakaoMap"), {
  ssr: false,
  loading: () => <SkeletonMap />,
});

type DetailPageProps = {
  params: {
    id: string;
  };
};

const DetailPage = async ({ params }: DetailPageProps) => {
  if (!params.id || params.id === "detail") {
    redirect("/");
    return null;
  }

  const bakery = await fetchBakeryDetails(params.id);

  if (!bakery) {
    notFound();
  }

  const { name, address, bakery_id, image, phone } = bakery;

  return (
    <div className="reactive-body mx-auto space-y-8">
      {name && address ? <KakaoMap name={name} address={address} /> : <SkeletonMap />}
      <StoreInformation bakeryId={bakery_id} name={name} address={address} image={image} phone={phone} />
      <CommentList bakery_id={bakery_id} />
    </div>
  );
};

export default DetailPage;
