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
        });

        if (error) {
            console.log('error:', error);
        } else {
            await supabase.from('users').insert({ email, nickname });
            window.location.href = '/login';
        }
        return data;
    };
    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSignup}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    required
                />
                <input type="file" placeholder="profile" accept="image/*" />
                <button type="submit">Sign Up</button>
            </form>
            <Link href={'/login'}>로그인 하러 가기</Link>
        </div>
    );
};

export default SignupPage;
