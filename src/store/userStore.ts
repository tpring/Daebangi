import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type UserState = {
    userId: string | null;
    email: string | null;
    nickname: string | null;
    profile: string | null;
    setUser: (userId: string, email: string, nickname: string, profile: string) => void;
};

export const useUserStore = create<UserState>()(
    devtools(
        persist(
            (set) => ({
                userId: null,
                email: null,
                nickname: null,
                profile: null,
                setUser: (userId, email, nickname, profile) => set({ userId, email, nickname, profile }),
            }),
            {
                name: 'user-storage', // key 이름
            }
        )
    )
);
