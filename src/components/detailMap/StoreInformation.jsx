import Image from 'next/image';
import LikeButton from '@/components/commons/LikeButton';

const StoreInformation = () => {
    return (
        <section className="flex flex-col md:flex-row justify-between mt-6">
            {/* 가게정보_이미지영역 */}
            <div className="relative w-full md:w-1/3 h-48 md:h-56">
                <Image
                    src="/image/breads/dummyData.jpg"
                    alt="베이커리 이미지"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                />
            </div>
            {/* 가게정보_텍스트영역 */}
            <div className="w-full md:w-2/3 pt-4 md:pt-0 md:pl-8">
                <h1 className="mb-3 flex justify-between items-center">
                    <span className="text-title font-title">성심당 대전역점</span>
                    <LikeButton />
                </h1>
                <address className="not-italic mb-2">
                    <dl className="flex items-center space-x-2 mb-3">
                        <dt>
                            <Image src="/image/icons/phone.png" alt="전화 아이콘" width={20} height={20} />
                        </dt>
                        <dd>1588-8069</dd>
                    </dl>
                </address>
                <p>대전 동구 중앙로 215 대전광역시 2F 대전역 4번 출구에서 38m</p>
            </div>
        </section>
    );
};

export default StoreInformation;
