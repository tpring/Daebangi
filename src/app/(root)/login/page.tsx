'use client';

import { useState } from 'react';
import { createClient } from '../../api/supabase/client';
import Link from 'next/link';

import React from 'react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const supabase = createClient();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            alert('실패');
            console.error('error:', error);
        } else {
            alert('성공했습니다.');
            window.location.href = '/';
        }
        return data;
    };
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            <Link href={'/signup'}>회원가입 하러 가기</Link>
        </div>
    );
};

export default LoginPage;
