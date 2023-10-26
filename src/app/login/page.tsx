"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { useUser } from '../UserContext';
import Logins from '../components/Logins';

interface User {
  email: string
}

const page = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const { user, emailPasswordLogin, loading } = useUser();

  const login = async (e: any) => {
    e.preventDefault();
    emailPasswordLogin(loginEmail, loginPassword);
  }

  return (
    <main className='p-4 flex justify-center'>
      {
        loading ? (
          <p>Loading...</p>
        ) : !user.email ? (
          <form className='flex flex-col gap-3 border-2 p-4 rounded-md'>
            <label className='flex justify-between gap-2'>
              Email
              <input
                className='border-2 rounded-sm'
                type="email"
                onChange={(e) => setLoginEmail(e.target.value)}
                value={loginEmail}
              />
            </label>
            <label className='flex justify-between gap-2'>
              Password
              <input
                className='border-2 rounded-sm'
                type="password"
                onChange={(e) => setLoginPassword(e.target.value)}
                value={loginPassword}
              />
            </label>
            <button
              className='hover:bg-gray-200 p-2 rounded-md bg-gray-100'
              onClick={login}
            >
              Log in
            </button>
            <Link href='/register'>or <span className='underline text-blue-500'>register</span>, if you don't have an account yet.</Link>
            <hr />
            <Logins />
          </form>
        ) : (
          <h1>You are already logged in.</h1>
        )
      }

    </main>
  )
}

export default page