import Image from 'next/image';

const StoreInformation = () => {
    return (
        <div className="flex justify-between">
            <div>
                <Image src="/image/icons/phone.png" alt="전화 아이콘" width={20} height={20} />
            </div>
            <div>
                <h1 className="text-title font-bold mb-3">성심당 대전역점</h1>
                <dl className="flex items-center space-x-2 mb-2">
                    <dt>
                        <Image src="/image/icons/phone.png" alt="전화 아이콘" width={20} height={20} />
                    </dt>
                    <dd>1588-8069</dd>
                </dl>
                <p>대전 동구 중앙로 215 대전광역시 2F 대전역 4번 출구에서 38m</p>
            </div>
        </div>
    );
};

export default StoreInformation;
