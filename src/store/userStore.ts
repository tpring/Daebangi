import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type UserState = {
  userId: string | null;
  email: string | null;
  nickname: string | null;
  profile: string | null;
  description: string | null;
  likesChanged: boolean;
  setUser: (userId: string, email: string, nickname: string, profile: string, description: string) => void;
  logout: () => void;
  setLikesChanged: (status: boolean) => void;
};

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        userId: null,
        email: null,
        nickname: null,
        profile: null,
        description: null,
        likesChanged: false,
        setUser: (userId, email, nickname, profile, description) =>
          set({ userId, email, nickname, profile, description }),
        logout: () => set({ userId: null, email: null, nickname: null, profile: null, description: null }),
        setLikesChanged: (status: boolean) => set({ likesChanged: status }),
      }),
      {
        name: "user-storage", // key 이름
      },
    ),
  ),
);
