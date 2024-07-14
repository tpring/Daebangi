"use client";

import Toast from "@/components/commons/toast/Toast";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { uploadImage } from "../../../supabase/utils/makeimageUrl";
import nookies from "nookies";
import userDefaultImage from "../../../../public/image/icons/userDefaultImage.png";
import { signUp, updateUserProfile } from "@/app/api/supabase/auth/route";

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
  const [toastState, setToastState] = useState({ state: "", message: "" });

  // 회원가입 처리 함수
  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 이미지
    if (!profile) {
      setToastState({ state: "error", message: "이미지를 넣어주세요." });
      return;
    }

    // 유효성 검사
    if (password.length < 6) {
      setToastState({ state: "custom", message: "비밀번호는 6자리 이상이어야 합니다." });
      return;
    }
    if (password !== confirmPassword) {
      setToastState({ state: "custom", message: "비밀번호와 비밀번호 확인이 일치하지 않습니다." });
      return;
    }

    try {
      // signUp API 호출하여 사용자 등록
      const { data, error } = await signUp(email, password, nickname);

      if (error) {
        // Supabase의 오류 메시지에 따라 유효성 검사 처리
        if (error.message.includes("User already registered")) {
          setToastState({ state: "custom", message: "이미 가입된 이메일입니다." });
        } else {
          setToastState({ state: "error", message: `가입 실패 : ${error.message}` });
        }
      } else {
        //회원가입 성공 후 profile이 있을때 이미지 업로드
        if (profile) {
          if (data.user) {
            const imagePath = `profileImage/${newUuid}.png`;
            // 이미지 업로드
            const profileUrl = await uploadImage(profile as File, imagePath);
            // 사용자 프로필 업데이트
            if (profileUrl) {
              await updateUserProfile(data.user.id, profileUrl);
            }
          }
        }
        setToastState({ state: "custom", message: `회원가입 성공!` });

        // 쿠키에 저장된 토큰 제거
        nookies.destroy(null, "sb-txvvzlryxqhzxjcsncqo-auth-token");
        nookies.destroy(null, "sb-txvvzlryxqhzxjcsncqo-auth-token-code-verifier");

        router.push("/login?message=회원가입 성공! 로그인 해주세요.");
      }
    } catch (error) {
      console.error(error);
    }
    return;
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
        <div className="mt-6 mb-4 flex flex-col items-center justify-center ">
          <div className="cursor-pointer relative" onClick={handleImageClick}>
            <Image
              src={profileUrl || userDefaultImage.src}
              alt="Profile"
              width={200}
              height={200}
              priority
              className="w-40 h-40 rounded-full border-2 border-point object-contain"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-30 rounded-full">
              <span className="text-white text-title">+</span>
            </div>
            <input type="file" accept="image/*" onChange={handleProfileChange} className="hidden" ref={fileInputRef} />
          </div>
          <p className="shared-text">프로필 업로드</p>
        </div>
        <p className="shared-text">이메일</p>
        <input
          className="shared-input mb-2 focus:outline-[#C9AB9C]"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <p className="shared-text">닉네임</p>
        <input
          className="shared-input mb-2 focus:outline-[#C9AB9C]"
          type="text"
          placeholder="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />
        <p className="shared-text">비밀번호</p>
        <input
          className="shared-input mb-2 focus:outline-[#C9AB9C]"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p className="shared-text">비밀번호 확인</p>
        <input
          className="shared-input mb-2 focus:outline-[#C9AB9C]"
          type="password"
          placeholder="Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <div>
          <button type="submit" className="shared-butten my-6 hover:bg-[#925435]">
            회원가입
          </button>
        </div>
      </form>
      <Link
        href={"/login"}
        className="text-basics hover:text-point hover:bg-gray-200 hover:underline transition-colors duration-300 p-2 rounded-md mb-5"
      >
        로그인 하러 가기
      </Link>
      {toastState.state && <Toast state={toastState.state} message={toastState.message} />}
    </div>
  );
};

export default SignupPage;
