import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
type UserState = {
  userId: string | null;
  email: string | null;
  nickname: string | null;
  profile: string | null;

  description: string | null;
  setUser: (userId: string, email: string, nickname: string, profile: string, description: string) => void;
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
        setUser: (userId, email, nickname, profile, description) =>
          set({ userId, email, nickname, profile, description }),
      }),
      {
        name: "user-storage", // key 이름
      },
    ),
  ),
);
