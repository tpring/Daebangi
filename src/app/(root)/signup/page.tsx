"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { uploadImage } from "../../../supabase/utils/makeimageUrl";
import { signUp, updateUserProfile } from "../../api/supabase/auth/route";
import nookies from "nookies";
import LogoBread from "../../../../public/image/breads/LogoBread.png";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [profile, setProfile] = useState<File | null>(null);
  const [profileUrl, setProfileUrl] = useState<string | null>(null);
  const router = useRouter();
  const newUuid = uuidv4();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 회원가입 처리 함수
  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 유효성 검사
    if (password.length < 6) {
      alert("비밀번호는 6자리 이상이어야 합니다.");
      return;
    }
    if (password !== confirmPassword) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    try {
      // signUp API 호출하여 사용자 등록
      const { data, error } = await signUp(email, password, nickname);

      if (error) {
        // Supabase의 오류 메시지에 따라 유효성 검사 처리
        if (error.message.includes("User already registered")) {
          alert("이미 가입된 이메일입니다.");
        } else {
          alert("가입 실패: " + error.message);
        }
        console.error("error:", error);
      } else {
        // 회원가입 성공 후 이미지 업로드
        if (data.user) {
          const imagePath = `profileImage/${newUuid}.png`;
          // 이미지 업로드
          const profileUrl = await uploadImage(profile as File, imagePath);
          // 사용자 프로필 업데이트
          if (profileUrl) {
            await updateUserProfile(data.user.id, profileUrl);
          }
          alert("회원가입 성공!");

          // 쿠키에 저장된 토큰 제거
          nookies.destroy(null, "sb-txvvzlryxqhzxjcsncqo-auth-token");
          nookies.destroy(null, "sb-txvvzlryxqhzxjcsncqo-auth-token-code-verifier");

          router.push("/login");
        }
      }
    } catch (error) {
      console.error(error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // 프로필 이미지 파일 변경 핸들러
  const handleProfileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setProfile(event.target.files[0]);

      // 선택한 파일의 미리보기 URL 생성
      const file = event.target.files[0];
      const url = URL.createObjectURL(file);
      setProfileUrl(url);
    }
  };

  // 프로필 이미지 클릭 핸들러
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSignup}>
        <div className="mb-4 flex flex-col items-center justify-center">
          <Image
            src={profileUrl || LogoBread.src}
            alt="Profile"
            width={200}
            height={200}
            priority
            className="w-40 h-40 rounded-full border-2 border-point object-contain"
            onClick={handleImageClick}
          />
          <input type="file" accept="image/*" onChange={handleProfileChange} className="hidden" ref={fileInputRef} />
          <p className="shared-text">프로필 업로드</p>
        </div>
        <p className="shared-text">이메일</p>
        <input
          className="shared-input mb-4 focus:outline-[#C9AB9C]"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <p className="shared-text">닉네임</p>
        <input
          className="shared-input mb-4 focus:outline-[#C9AB9C]"
          type="text"
          placeholder="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />
        <p className="shared-text">비밀번호</p>
        <input
          className="shared-input mb-4 focus:outline-[#C9AB9C]"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p className="shared-text">비밀번호 확인</p>
        <input
          className="shared-input mb-4 focus:outline-[#C9AB9C]"
          type="password"
          placeholder="Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <div>
          <button type="submit" className="shared-butten my-6 hover:bg-[#C9AB9C]">
            Sign Up
          </button>
        </div>
      </form>
      <Link
        href={"/login"}
        className="text-basics hover:text-teal-600 hover:bg-gray-200 hover:underline transition-colors duration-300 p-2 rounded-md"
      >
        로그인 하러 가기
      </Link>
    </div>
  );
};

export default SignupPage;
