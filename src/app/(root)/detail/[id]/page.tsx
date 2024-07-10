import React from 'react';
import dynamic from 'next/dynamic';
import Comment from '@/components/comment/Comment';
import StoreInformation from '@/components/detailMap/StoreInformation';

const KakaoMap = dynamic(() => import('@/components/detailMap/KakaoMap'), {
    ssr: false,
    loading: () => <p>지도 로딩 중...</p>,
});

type SearchParams = {
    name?: string;
    x?: string;
    y?: string;
};

type DetailPageProps = {
    searchParams: SearchParams;
};

const DetailPage: React.FC<DetailPageProps> = ({ searchParams }) => {
    const { name, x, y } = searchParams;

    console.log('SearchParams:', searchParams);

    const isValidData = name && x && y && !isNaN(parseFloat(x)) && !isNaN(parseFloat(y));

    return (
        <div className="reactive-body mx-auto">
            {isValidData ? (
                <KakaoMap name={name!} x={parseFloat(x!)} y={parseFloat(y!)} />
            ) : (
                <p>유효한 데이터가 없습니다.</p>
            )}
            <StoreInformation />
            <Comment />
        </div>
    );
};

export default DetailPage;
