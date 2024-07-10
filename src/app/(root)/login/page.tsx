'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import LogoBread from '../../../../public/image/breads/LogoBread.png';
import { createClient } from '../../../supabase/client';
import { useUserStore } from '../../../store/userStore';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const supabase = createClient();
    const setUser = useUserStore((state) => state.setUser);
    const router = useRouter();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            alert('로그인 실패');
            console.error('error:', error);
        } else {
            if (data.user) {
                // Supabase에서 사용자 정보 가져오기
                const { data: userData, error: userError } = await supabase
                    .from('user')
                    .select('user_id, email, nickname, profile')
                    .eq('email', email)
                    .single();

                if (userError) {
                    alert('사용자 정보를 가져오는 데 실패했습니다.');
                    console.error('userError:', userError);
                } else {
                    // Zustand 상태 업데이트
                    setUser(userData.user_id, userData.email, userData.nickname, userData.profile);
                    alert('로그인 성공');
                    router.push('/');
                }
            }
        }
        return data;
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Image src={LogoBread} alt="Logo Bread" width={288} height={201} priority className="mb-[-20px]" />
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
                <p className="text-subtitle my-3">비밀번호</p>
                <input
                    className="shared-input mb-4 focus:outline-[#C9AB9C]"
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
                href={'/signup'}
                className="text-basics hover:text-teal-600 hover:bg-gray-200 hover:underline transition-colors duration-300 p-2 rounded-md"
            >
                회원가입 하러 가기
            </Link>
        </div>
    );
};

export default LoginPage;
