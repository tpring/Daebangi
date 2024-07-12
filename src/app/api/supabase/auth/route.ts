import { createClient } from "@/supabase/client";
import { User } from "@/types/user";

const supabase = createClient();

// 로그인
export const login = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
};

// user 테이블 값 가져오기
export const getUserData = async (email: string) => {
  return await supabase
    .from("user")
    .select("user_id, email, nickname, profile, description")
    .eq("email", email)
    .single();
};

// auth에 회원 정보 저장
export const signUp = async (email: string, password: string, nickname: string) => {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        nickname,
      },
    },
  });
};

// 사용자 프로필 이미지 Url 업데이트
export const updateUserProfile = async (userId: string, profileUrl: string) => {
  const { error: updateError } = await supabase.from("user").update({ profile: profileUrl }).eq("user_id", userId);

  if (updateError) {
    console.error("프로필 이미지 URL 업데이트 실패: " + updateError.message);
  }
};

// ID 값에 따른 유저 정보 가져오기
export const getUserById = async (userId: string): Promise<User | null> => {
  const { data: user, error } = await supabase.from("user").select("*").eq("user_id", userId);

  if (error) {
    console.error("댓글의 유저정보 fetch 실패 :", error);
    return null;
  }
  return user[0];
};
