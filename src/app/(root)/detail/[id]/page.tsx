import dynamic from 'next/dynamic';
import React from 'react';
import Comment from '@/components/comment/Comment';
import StoreInformation from '@/components/detailMap/StoreInformation';

const KakaoMap = dynamic(() => import('@/components/detailMap/KakaoMap'), {
    ssr: false,
    loading: () => <p>지도 로딩 중...</p>,
});

const DetailPage = () => {
    return (
        <div className="reactive-body mx-auto">
            <div>
                <KakaoMap />
                <StoreInformation />
                <Comment />
            </div>
        </div>
    );
};

export default DetailPage;
