"use client";
import { useUserStore } from "@/store/userStore";
import Image from 'next/image';
import { useState } from 'react';
import { createClient } from '../../../../supabase/client';

//modifyprofile의 페이지를 인터셉트 하는 페이지 입니다.
// 모달창
const Page = () => {
    const supabase = createClient()
    const { userId, email, nickname, profile } = useUserStore((state) => ({
        userId: state.userId as string,
        email: state.email,
        nickname: state.nickname,
        profile: state.profile,
    }));

    const [newNickname, setNewNickname] = useState(nickname);
    const [newProfile, setNewProfile] = useState(profile);
    const [description, setDescription] = useState('')

    const handleProfileChange = (e: any) => {
        setNewProfile(e.target.files[0]);
    };

    const handleNicknameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setNewNickname(e.target.value);
    };

    const handleDescriptionChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setDescription(e.target.value);
    }

    const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        try {
            const { data, error } = await supabase
                .from('user')
                .update({
                    nickname: newNickname,
                    profile: newProfile,
                    description
                })
                .eq('user_id', userId);
            if (error) {
                console.error('Error updating user data:', error);
            } else {
                console.log('User data updated successfully:', data);
            }
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-3 w-70 max-w">
                <h2 className="text-2xl font-bold mb-4 text-center">프로필 수정</h2>
                <div className="flex justify-center">
                    <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer" >
                        {newProfile ? (
                            <Image src={newProfile} alt="Profile" width={100} height={100} className="w-full h-full rounded-full" />
                        ) : (
                            <Image src={profile || ''} alt="Default Profile" className="w-full h-full rounded-full" />
                        )}
                    </div>
                    <input type="file" onChange={handleProfileChange} style={{ display: 'none' }} />
                </div> <div className="mt-4 flex flex-col">
                    <div className="flex justify-between items-center">
                        <p>닉네임</p>
                        <input className="shared-input" type="text" value={newNickname || ''} onChange={handleNicknameChange} />
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <p>소개</p>
                        <input className="shared-input" type="text" onChange={handleDescriptionChange} />
                    </div>
                    <div className="flex justify-end mt-4">
                        <button className="font-secondary" onClick={handleSubmit}>프로필 수정 완료</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
