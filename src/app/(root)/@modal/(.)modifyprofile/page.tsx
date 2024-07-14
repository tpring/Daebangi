"use client";
import { useUserStore } from "@/store/userStore";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createClient } from "../../../../supabase/client";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { uploadImage } from "@/supabase/utils/makeimageUrl";
import LogoBread from "../../../../../public/image/breads/LogoBread.png";

// modifyprofile의 페이지를 인터셉트 하는 페이지 입니다.
// 모달창
const Page = () => {
  const router = useRouter();
  const supabase = createClient();
  const { userId, email, nickname, profile, newDescription, setUser } = useUserStore((state) => ({
    userId: state.userId as string,
    email: state.email as string,
    nickname: state.nickname as string,
    profile: state.profile,
    newDescription: state.description as string,
    setUser: state.setUser,
  }));

  const [newNickname, setNewNickname] = useState(nickname);
  const [newProfile, setNewProfile] = useState<File | null>(null);
  const [description, setDescription] = useState(newDescription);
  const [profileUrl, setProfileUrl] = useState<string | null>(null);
  const inputref = useRef<HTMLInputElement>(null);
  const newUuid = uuidv4();

  useEffect(() => {
    setDescription(newDescription);
  }, [newDescription]);

  const handleProfileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      setNewProfile(e.target.files[0]);

      // 선택한 파일의 미리보기 URL 생성
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setProfileUrl(url);
    }
  };

  const handleNicknameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewNickname(e.target.value);
  };

  const handleDescriptionChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    // profile은 있는데 선택을 안했을 때
    // profile이 있고 선택 했을 때
    if (newProfile) {
      // 선택 했을 때
      const imageFile = newProfile;
      const uploadPath = `profileImage/${newUuid}.png`;
      const oldPath = profile ? profile.split("/").slice(-2).join("/") : undefined; // Extract the old path
      const publicUrl = await uploadImage(imageFile as File, uploadPath, oldPath);
      if (publicUrl) {
        updateUserInfo(publicUrl);
      }
    } else {
      if (profile) {
        updateUserInfo(profile);
      } else {
        alert("선택된 프로필이 없습니다.");
      }
    }
  };
  // 기존에는 => 이전에 설정된 프로필이 있던 없던 무조건 사용자로부터 전달받은(이미지 선택) 이미지를 supabase에 넣는다.
  // ==> 선택 했을 때 안 했을 때를 나눠서
  //

  const updateUserInfo = async (publicUrl: string) => {
    try {
      const { error } = await supabase
        .from("user")
        .update({
          nickname: newNickname,
          profile: publicUrl,
          description,
        })
        .eq("user_id", userId);
      if (error) {
        console.error("Error updating user data:", error);
      } else {
        setUser(userId, email, newNickname, publicUrl, description);
        // 프로필 수정 완료 후 /mypage로 이동
        router.back();
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-3 w-70 max-w">
        <h2 className="mb-4 text-center text-title font-title">프로필 수정</h2>
        <div className="flex justify-center">
          <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer">
            {newProfile ? (
              <Image
                src={profileUrl || ""}
                alt="Profile"
                width={100}
                height={100}
                className="w-full h-full rounded-full"
                onClick={() => {
                  inputref.current?.click();
                }}
              />
            ) : (
              <Image
                src={profile || LogoBread.src}
                alt="Default Profile"
                width={100}
                height={100}
                className="w-full h-full rounded-full"
                onClick={() => {
                  inputref.current?.click();
                }}
              />
            )}
          </div>
          <input type="file" onChange={handleProfileChange} ref={inputref} className="hidden" />
        </div>{" "}
        <div className="mt-4 flex flex-col">
          <div className="flex justify-between items-center shared-text">
            <p className="px-2">닉네임</p>
            <input className="shared-input" type="text" value={newNickname || ""} onChange={handleNicknameChange} />
          </div>
          <div className="flex justify-between items-center mt-4 shared-text">
            <p className="px-2">소개</p>
            <input className="shared-input" type="text" value={description} onChange={handleDescriptionChange} />
          </div>
          <div className="flex justify-end mt-4">
            <button className="font-secondary shared-butten" onClick={handleSubmit}>
              프로필 수정 완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
