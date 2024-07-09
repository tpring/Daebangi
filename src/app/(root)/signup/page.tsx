'use client';

import { useState } from 'react';
import { createClient } from '../../api/supabase/client';
import Link from 'next/link';

import React from 'react';

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const supabase = createClient();

    const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    nickname,
                },
            },
        });

        if (error) {
            alert('실패.');
            console.log('error:', error);
        } else {
            alert('성공했습니다.');
            window.location.href = '/login';
        }
        return data;
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <form onSubmit={handleSignup}>
                <input type="file" placeholder="profile" accept="image/*" />
                <p className="text-subtitle my-3">이메일</p>
                <input
                    className="shared-input mb-4 focus:outline-[#C9AB9C]"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <p className="text-subtitle my-3">닉네임</p>
                <input
                    className="shared-input mb-4 focus:outline-[#C9AB9C]"
                    type="text"
                    placeholder="Nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    required
                />
                <p className="text-subtitle my-3">비밀번호</p>
                <input
                    className="shared-input mb-4 focus:outline-[#C9AB9C]"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <p className="text-subtitle my-3">비밀번호 확인</p>
                <input
                    className="shared-input mb-4 focus:outline-[#C9AB9C]"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <div>
                    <button type="submit" className="shared-butten my-6 hover:bg-[#C9AB9C]">
                        Sign Up
                    </button>
                </div>
            </form>
            <Link
                href={'/login'}
                className="text-basics hover:text-teal-600 hover:bg-gray-200 hover:underline transition-colors duration-300 p-2 rounded-md"
            >
                로그인 하러 가기
            </Link>
        </div>
    );
};

export default SignupPage;
