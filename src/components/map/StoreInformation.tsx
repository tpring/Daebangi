import LikeButton from "@/components/commons/LikeButton";
import { StoreInformationProps } from "@/types/map";
import Image from "next/image";
import defaultImg from "../../../public/image/noimg.png";

const StoreInformation: React.FC<StoreInformationProps> = ({ bakeryId, image, name, phone, address }) => {
  const imageSrc = image || defaultImg.src;

  return (
    <section className="flex flex-col md:flex-row justify-between mt-6 bg-base p-6 rounded-lg sm-max:pb-10 shadow-lg">
      {/* 가게정보_이미지영역 */}
      <div className="relative w-full md:w-1/3 h-72 md:h-64">
        {<Image src={imageSrc} alt="베이커리 이미지" layout="fill" objectFit="cover" className="rounded-md" />}
      </div>
      {/* 가게정보_텍스트영역 */}
      <div className="w-full md:w-2/3 pt-4 md:pt-0 md:pl-8">
        <h1 className="mb-3 flex justify-between items-center">
          <span className="text-title font-title sm-max:pt-4">{name}</span>
          <LikeButton bakeryId={bakeryId} />
        </h1>
        <address className="not-italic mb-2">
          <dl className="flex items-center space-x-2 mb-3">
            <dt>
              <Image src="/image/icons/phone.png" alt="전화 아이콘" width={20} height={20} />
            </dt>
            <dd> {phone ? phone : "매장번호 미제공"}</dd>
          </dl>
        </address>
        <p>{address}</p>
      </div>
    </section>
  );
};

export default StoreInformation;
