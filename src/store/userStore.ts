import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type UserState = {
  userId: string | null;
  email: string | null;
  nickname: string | null;
  profile: string | null;
<<<<<<< HEAD
  description: string | null;
  setUser: (
    userId: string,
    email: string,
    nickname: string,
    profile: string,
    description: string
  ) => void;
=======
  setUser: (userId: string, email: string, nickname: string, profile: string) => void;
>>>>>>> 1ece2cac34fb1427c9116ccf42e023057f3fe333
};

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        userId: null,
        email: null,
        nickname: null,
        profile: null,
<<<<<<< HEAD
        description: null,
        setUser: (userId, email, nickname, profile, description) =>
          set({ userId, email, nickname, profile, description }),
=======
        setUser: (userId, email, nickname, profile) => set({ userId, email, nickname, profile }),
>>>>>>> 1ece2cac34fb1427c9116ccf42e023057f3fe333
      }),
      {
        name: "user-storage", // key 이름
      },
    ),
  ),
);
