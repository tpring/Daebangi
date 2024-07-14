"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 병렬 라우팅을 위한 페이지입니다
const Page = () => {
    const router = useRouter();

    useEffect(() => {
        // 페이지 로드 시 자동으로 '/mypage'로 리다이렉트
        router.replace('/mypage');
    }, [router]);

    return null;
}

export default Page;