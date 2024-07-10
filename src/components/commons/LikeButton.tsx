'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { checkLikeStatus, toggleLikeStatus } from '@/app/api/(supabase)/(like)/route';
import { useUserStore } from '@/store/userStore';

interface LikeButtonProp {
    bakeryId: string;
}

const LikeButton: React.FC<LikeButtonProp> = ({ bakeryId }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const { userId } = useUserStore((state) => ({
        userId: state.userId,
    }));

    const fetchLikeStatus = async () => {
        try {
            const status = await checkLikeStatus(userId, bakeryId);
            setIsLiked(status);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLikeStatus();
    }, []);

    const handleToggleLike = async () => {
        if (userId === null) {
            alert('로그인 해주세요.');
            return false;
        }

        try {
            const result = await toggleLikeStatus(isLiked, userId, bakeryId);
            if (result) {
                setIsLiked(!isLiked);
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoading) {
        return null;
    }

    return (
        <button onClick={handleToggleLike}>
            {isLiked ? (
                <Image src="/image/icons/heartActive.png" width={20} height={20} alt="liked image" />
            ) : (
                <Image src="/image/icons/heart.png" width={20} height={20} alt="unliked image" />
            )}
        </button>
    );
};

export default LikeButton;
