import Image from 'next/image';
import LikeButton from '@/components/commons/LikeButton';
import defaultImg from '../../../public/image/noimg.png';

type StoreInformationProps = {
    bakeryId: string;
    name: string | null;
    address: string | null;
    image: string | null;
    phone: string | null;
};

const StoreInformation: React.FC<StoreInformationProps> = ({ bakeryId, image, name, phone, address }) => {
    return (
        <section className="flex flex-col md:flex-row justify-between mt-6">
            {/* 가게정보_이미지영역 */}
            <div className="relative w-full md:w-1/3 h-48 md:h-56">
                <Image
                    src={image || defaultImg}
                    alt="베이커리 이미지"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                />
            </div>
            {/* 가게정보_텍스트영역 */}
            <div className="w-full md:w-2/3 pt-4 md:pt-0 md:pl-8">
                <h1 className="mb-3 flex justify-between items-center">
                    <span className="text-title font-title">{name}</span>
                    <LikeButton bakeryId={bakeryId} />
                </h1>
                <address className="not-italic mb-2">
                    <dl className="flex items-center space-x-2 mb-3">
                        <dt>
                            <Image src="/image/icons/phone.png" alt="전화 아이콘" width={20} height={20} />
                        </dt>
                        <dd> {phone ? phone : '매장번호 미제공'}</dd>
                    </dl>
                </address>
                <p>{address}</p>
            </div>
        </section>
    );
};

export default StoreInformation;
