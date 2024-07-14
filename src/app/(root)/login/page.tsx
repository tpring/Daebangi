"use client";

import { getUserData, login } from "@/app/api/supabase/auth/route";
import Toast from "@/components/commons/toast/Toast";
import { useUserStore } from "@/store/userStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import LogoBread from "../../../../public/image/breads/LogoBread.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [toastState, setToastState] = useState({ state: "", message: "" });

  useEffect(() => {
    const messageParam = searchParams.get("message");
    if (messageParam) {
      setToastState({ state: "custom", message: "로그인 후 이용부탁드립니다" });
    }
  }, [searchParams]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 유효성 검사
    if (!email || !password) {
      setToastState({ state: "custom", message: "이메일과 비밀번호를 모두 입력해주세요." });
      return;
    }

    if (password.length < 6) {
      setToastState({ state: "custom", message: "비밀번호는 6자리 이상이어야 합니다." });
      return;
    }

    try {
      const { data, error } = await login(email, password);

      if (error) {
        // Supabase의 오류 메시지에 따라 유효성 검사 처리
        if (error.message.includes("Invalid login credentials")) {
          setToastState({ state: "custom", message: "이메일이나 비밀번호가 잘못되었습니다." });
        } else {
          setToastState({ state: "error", message: `로그인 실패:${error.message} ` });
        }
      } else {
        if (data.user) {
          // Supabase에서 사용자 정보 가져오기
          try {
            const userData = await getUserData(email);

            // Zustand 상태 업데이트
            setUser(
              userData.user_id,
              userData.email,
              userData.nickname ?? "",
              userData.profile ?? "",
              userData.description ?? "",
            );
            setToastState({ state: "custom", message: "로그인 성공" });
            router.push("/");
          } catch (userError) {
            console.error("userError:", userError);
          }
        }
      }
    } catch (error) {
      console.error(error);
      setToastState({ state: "error", message: "오류가 발생했습니다. 다시 시도해주세요." });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image src={LogoBread} alt="Logo Bread" width={220} height={154} priority className="mb-[-20px]" />
      <label className="font-secondary text-[46px]">대빵이</label>
      <form onSubmit={handleLogin}>
        <p className="shared-text ">이메일</p>
        <input
          className="shared-input mb-2 focus:outline-[#C9AB9C]"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="shared-text">비밀번호</p>
        <input
          className="shared-input mb-2 focus:outline-[#C9AB9C]"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <button type="submit" className="shared-butten my-10 hover:bg-[#C9AB9C]">
            로그인
          </button>
        </div>
      </form>
      <Link
        href={"/signup"}
        className="text-basics hover:text-teal-600 hover:bg-gray-200 hover:underline transition-colors duration-300 p-2 rounded-md"
      >
        회원가입 하러 가기
      </Link>
      {toastState.state && <Toast state={toastState.state} message={toastState.message} />}
    </div>
  );
};

export default LoginPage;
