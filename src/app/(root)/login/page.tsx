"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import LogoBread from "../../../../public/image/breads/LogoBread.png";
import { createClient } from "../../../../supabase/client";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const supabase = createClient();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert("실패");
      console.error("error:", error);
    } else {
      alert("성공했습니다.");
      window.location.href = "/";
    }
    return data;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image
        src={LogoBread}
        alt="Logo Bread"
        width={288}
        height={201}
        className="mb-[-20px]"
      />
      <label className="font-secondary text-[60px]">대빵이</label>
      <form onSubmit={handleLogin}>
        <p className="text-subtitle my-3">이메일</p>
        <input
          className="shared-input mb-4 focus:outline-[#C9AB9C]"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className=" text-subtitle my-3">비밀번호</p>

        <input
          className="shared-input mb-4 focus:outline-[#C9AB9C]"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <button
            type="submit"
            className="shared-butten my-10 hover:bg-[#C9AB9C]"
          >
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
    </div>
  );
};

export default LoginPage;
