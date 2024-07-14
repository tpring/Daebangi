"use client";
import { useUserStore } from "@/store/userStore";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { uploadImage } from "@/supabase/utils/makeimageUrl";
import LogoBread from "../../../../../public/image/breads/LogoBread.png";
import CloseButton from "../../../../../public/image/icons/clear.png";
import { updateUserInfo } from "@/lib/api/auth/route";

// modifyprofile의 페이지를 인터셉트 하는 페이지 입니다.
// 모달창
const Page = () => {
  const router = useRouter();
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

  const handleImageClick = () => {
    if (inputref.current) {
      inputref.current.click();
    }
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    if (newProfile) {
      const imageFile = newProfile;
      const uploadPath = `profileImage/${newUuid}.png`;
      const oldPath = profile ? profile.split("/").slice(-2).join("/") : undefined;
      const publicUrl = await uploadImage(imageFile as File, uploadPath, oldPath);
      if (publicUrl) {
        await updateUserInfo(userId, newNickname, publicUrl, description);
        setUser(userId, email, newNickname, publicUrl, description);
      }
    } else {
      if (profile) {
        await updateUserInfo(userId, newNickname, profile, description);
        setUser(userId, email, newNickname, profile, description);
      }
    }
    router.back();
  };

  const onClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.back();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-12 w-70 max-w relative">
        <h2 className="mb-4 text-center text-title font-title">프로필 수정</h2>
        <button onClick={onClose} className="absolute top-4 right-4 text-xl font-bold">
          <Image src={CloseButton} alt="close" width={20} height={20} />
        </button>
        <div className="flex justify-center">
          <div
            className="relative w-32 h-32 border border-[#ccc] rounded-full overflow-hidden bg-[#fdfbfb] flex items-center justify-center cursor-pointer"
            onClick={handleImageClick}
          >
            {newProfile ? (
              <Image
                src={profileUrl || ""}
                alt="Profile"
                width={110}
                height={110}
                layout="intrinsic"
                objectFit="cover"
                className="rounded-full"
              />
            ) : (
              <Image
                src={profile || LogoBread.src}
                alt="Default Profile"
                width={110}
                height={110}
                layout="intrinsic"
                objectFit="cover"
                className="rounded-full"
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-30 rounded-full">
              <span className="text-white text-title">+</span>
            </div>
          </div>
          <input type="file" onChange={handleProfileChange} ref={inputref} className="hidden" />
        </div>
        <div className="mt-4 flex flex-col">
          <div className="flex justify-between items-center shared-text">
            <p className="px-2">닉네임</p>
            <input
              className="shared-input focus:outline-[#C9AB9C]"
              type="text"
              value={newNickname || ""}
              onChange={(e) => setNewNickname(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center mt-4 shared-text">
            <p className="px-2">소개</p>
            <input
              className="shared-input focus:outline-[#C9AB9C]"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-end mt-4">
            <button className="shared-butten" onClick={handleSubmit}>
              프로필 수정 완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
