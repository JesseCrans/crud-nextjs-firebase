"use client";
import React, { MouseEventHandler, useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { useUser } from '../UserContext';
import Logins from '../components/Logins';
import PageLayout from '../Layouts/PageLayout';

interface User {
  email: string
}

const page = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const { user, emailPasswordRegister, loading } = useUser();

  const register = async (e: any) => {
    e.preventDefault();
    emailPasswordRegister(registerEmail, registerPassword)
  }

  return (
    <PageLayout>

      <div className='flex justify-center'>
        {
          !user.email ? (
            <form className='flex flex-col gap-3 border-2 p-4 rounded-md'>
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
            <h1>You are already logged in.</h1>
          )
        }
      </div>
    </PageLayout>
  )
}

export default page