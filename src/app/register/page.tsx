"use client";
import React, { MouseEventHandler, useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { useUser } from '../contexts/UserContext';
import Logins from '../components/login/Logins';
import PageLayout from '../Layouts/PageLayout';

interface User {
  email: string
}

const page = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState("");

  const { user, emailPasswordRegister, loading, userInfo, error } = useUser();

  const register = async (e: any) => {
    e.preventDefault();
    if (registerPassword != registerPasswordConfirm) {
      alert("Passwords do not match.");
      return;
    }
    emailPasswordRegister(registerEmail, registerPassword)
  }

  return (
    <PageLayout>
      <div className='flex justify-center'>
        {
          !userInfo ? (
            <form className='flex flex-col gap-3 border-2 p-4 rounded-md'>
              <p
                className='text-red-500'
              >
                {error}
              </p>
              <label className='flex justify-between gap-2'>
                Email
                <input
                  className='border-2 rounded-sm'
                  type="email"
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  value={registerEmail}
                />
              </label>
              <label className='flex justify-between gap-2'>
                Password
                <input
                  className='border-2 rounded-sm'
                  type="password"
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  value={registerPassword}
                />
              </label>
              <label className='flex justify-between gap-2'>
                Confirm Password
                <input
                  className='border-2 rounded-sm'
                  type="password"
                  onChange={(e) => setRegisterPasswordConfirm(e.target.value)}
                  value={registerPasswordConfirm}
                />
              </label>
              <button
                className='hover:bg-gray-200 p-2 rounded-md bg-gray-100'
                onClick={register}
              >
                Register
              </button>
              <Link href='/login'><span className='underline text-blue-500'>Log in</span>, if you already have an account.</Link>
              <hr />
              <Logins />
            </form>
          ) : (
            <div>
              <h1
                className=''
              >
                You are already logged in.
              </h1>
              <Link
                href='/'
                className='hover:text-gray-500'
              >
                Go to your ToDo lists.
              </Link>
            </div>
          )
        }
      </div>
    </PageLayout>
  )
}

export default page