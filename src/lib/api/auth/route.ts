import { createClient } from "@/supabase/client";
import { User } from "@/types/user";

const supabase = createClient();

//로그아웃
export const signOut = async () => {
  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.error("로그아웃 실패:", error);
    throw error;
  }
};

// 로그인
export const login = async (email: string, password: string) => {
  try {
    const response = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    return response;
  } catch (error) {
    console.error("로그인 실패:", error);
    throw error;
  }
};

// user 테이블 값 가져오기
export const getUserData = async (email: string): Promise<User> => {
  try {
    const { data, error } = await supabase
      .from("user")
      .select("user_id, email, nickname, profile, description")
      .eq("email", email)
      .single();

    if (error) {
      throw error;
    }
    return data as User;
  } catch (error) {
    console.error("유저 데이터 가져오기 실패:", error);
    throw error;
  }
};

// auth에 회원 정보 저장
export const signUp = async (email: string, password: string, nickname: string) => {
  try {
    const response = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nickname,
        },
      },
    });
    return response;
  } catch (error) {
    console.error("회원가입 실패:", error);
    throw error;
  }
};

// 사용자 프로필 이미지 Url 업데이트
export const updateUserProfile = async (userId: string, profileUrl: string) => {
  try {
    const { error: updateError } = await supabase.from("user").update({ profile: profileUrl }).eq("user_id", userId);

    if (updateError) {
      throw updateError;
    }
  } catch (error) {
    console.error("프로필 이미지 URL 업데이트 실패:", error);
    throw error;
  }
};

// ID 값에 따른 유저 정보 가져오기
export const getUserById = async (userId: string): Promise<User | null> => {
  try {
    const { data: user, error } = await supabase.from("user").select("*").eq("user_id", userId);

    if (error) {
      throw error;
    }
    return user[0];
  } catch (error) {
    console.error("댓글의 유저정보 fetch 실패:", error);
    return null;
  }
};

// 사용자 정보 업데이트
export const updateUserInfo = async (userId: string, nickname: string, profileUrl: string, description: string) => {
  try {
    const { error } = await supabase
      .from("user")
      .update({
        nickname,
        profile: profileUrl,
        description: "소개란을 작성해주세요",
      })
      .eq("user_id", userId);
    if (error) {
      console.error("Error updating user data:", error);
      throw error;
    }
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
};
